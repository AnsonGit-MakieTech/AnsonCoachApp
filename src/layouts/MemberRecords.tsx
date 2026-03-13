import React, { useState, ReactNode, useEffect, useRef } from 'react';
import { 
    View, StyleSheet, TouchableOpacity, 
    TextInput, KeyboardAvoidingView,
    StyleProp, ViewStyle, Text,
    ScrollView,
    Animated,
 } from 'react-native';
import { metrics } from '../themes/metrics';
import { fonts } from '../themes/fonts';
import { colors } from '../themes/colors';
import GlassCard from '../components/GlassCard';  
import SVGBackIcon from '../svgs/SVGBackIcon';
import { Image } from 'expo-image';
import SVGDumbellIcon from '../svgs/SVGDumbellIcon';
import SVGSessionCount from '../svgs/SVGSessionCount';
import DateTimePicker from "@react-native-community/datetimepicker";
import { useGlobalState } from '../store/GlobalState';
import { getRequestUrl } from '../services/apiUrl';
import { getSessionToken } from '../storage/secureStorage';
import { getSessionsRecords, SessionRecordType } from '../services/getSessions';


type PopUpItemType = {
    title: string,
    message: string,
    type: 'error' | 'success' | 'neutral',
}


type MemberRecordsProps = {
    setPopUps : React.Dispatch<React.SetStateAction<PopUpItemType[]>>,

} 
export default function MemberRecords({
    setPopUps
} : MemberRecordsProps) {

    const [startDate, setStartDate] = useState(new Date());
    const [startDateString, setStartDateString] = useState("MM/DD/YYYY");
    const [endDate, setEndDate] = useState(new Date());
    const [endDateString, setEndDateString] = useState("MM/DD/YYYY");
    const [showPickerStart, setShowPickerStart] = useState(false);
    const [showPickerEnd, setShowPickerEnd] = useState(false); 
    const { state, dispatch } = useGlobalState();
    const [ isloading, setIsLoading ] = useState(false);
    const [ sessionRecords , setSessionRecords ] = useState<SessionRecordType[]>([]);
    const sessionRecordOpacity = useRef(new Animated.Value(0)).current;
    
    useEffect(()=>{
        if (isloading) return;
        startDate && setStartDateString(startDate.toLocaleDateString());
        endDate && setEndDateString(endDate.toLocaleDateString());
        if (!startDate || !endDate) return;
        if (startDate > endDate) return;
        if (state.member == null) return; 

        // setStartDateString(startDate.toLocaleDateString());
        // setEndDateString(endDate.toLocaleDateString());

        viewSubmitRecords();


    },[startDate, endDate , state.member]);

    useEffect(()=>{
        Animated.timing(sessionRecordOpacity , {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start(); 
    },[]);
    
    async function viewSubmitRecords(){
        setIsLoading(true);
         

        const sessionToken = await getSessionToken();
        sessionRecordOpacity.setValue(0);
        const [ result , success ] = await getSessionsRecords({
            sessionKey: sessionToken ?? "",
            memberId: state.member?.id ?? 0,
            startDate: formatDate(startDate),
            endDate: formatDate(endDate),
        });
 
        if (success){  
            // Check the type of result
            if (result instanceof Array) {
                setSessionRecords(result);
            }
        } else {
            setSessionRecords([]);
        } 
        Animated.timing(sessionRecordOpacity , {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start(); 

        setIsLoading(false);
    }

    function formatDate(date: Date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    function onChangeStart(event: any, selectedDate?: Date) {
        setShowPickerStart(false); 
        if (selectedDate) {
            setStartDate(selectedDate);
        }
    }
    function onChangeEnd(event: any, selectedDate?: Date) {
        setShowPickerEnd(false); 
        if (selectedDate) {
            setEndDate(selectedDate);
        }
    }

    function goBack(){
        dispatch({ type: 'SET_MEMBER', payload: null });
        dispatch({ type: 'SET_TAB', payload: 'members' });
    }

    function visitSubmitRecords(){  
        dispatch({ type: 'SET_TAB', payload: 'remark' });
    }



    
    return (
        <View style={styles.container}>
            <View style={styles.action_container}>
                <TouchableOpacity style={[styles.tags_container]} onPress={goBack}>
                    <SVGBackIcon/>
                    <Text style={styles.tag_text}>Go Back</Text>
                </TouchableOpacity> 
            </View>
            <View style={styles.list_container}>

                <View style={styles.member_card}>
                    <Image 
                        source={state.picture ?? ""}
                        style={styles.member_image}
                    />

                    <View style={styles.member_info_container}>
                        <Text style={styles.member_name} numberOfLines={1} ellipsizeMode='tail'>
                            { state.member ? state.member.fullname : "------------------------------"}
                        </Text>
                        <Text style={styles.member_position} numberOfLines={1}>
                            <Text style={{fontFamily: fonts.bold}}> { state.logTime }  </Text>
                            <Text style={{fontFamily: fonts.light}}>( { state.member ? state.member.logs.activity : "" } )</Text>
                        </Text> 
                        <View style={styles.session_count_container}>
                            <ScrollView horizontal contentContainerStyle={styles.scroll_content_style}>
                                {
                                    Array.from({length: state.sessionCount}, (_, i)=>{
                                        return <SVGSessionCount key={i} />
                                    })
                                }
                            </ScrollView>
                        </View>
                    </View>
                    {
                        
                        state && state.member && state.member.session && !state.member.session.session_is_expired && <TouchableOpacity style={styles.member_visit_button} onPress={visitSubmitRecords}>
                            <SVGDumbellIcon />
                        </TouchableOpacity>
                    }

                </View>

                <View style={styles.session_description_container}>
                    <Text style={styles.session_description_container_title}>
                        { state.member ? state.member.session.session_name : "No Session Plan" }
                    </Text>
                    <Text style={styles.session_description_container_description}>
                        { state.member ? state.member.session.session_description : "" }
                    </Text>
                </View>
                
                <View style={styles.dates_container}>
                    <TouchableOpacity style={styles.dates_button} onPress={() => setShowPickerStart(true)}>
                        <Text style={styles.dates_button_text}>{startDateString}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  style={styles.dates_button} onPress={() => setShowPickerEnd(true)}>
                        <Text style={styles.dates_button_text}>{endDateString}</Text>
                    </TouchableOpacity>
                </View>

                <Animated.View style={[styles.session_records_container, {opacity : sessionRecordOpacity}]}>
                    <Text style={styles.session_records_container_title}>Session Records</Text>
                    { sessionRecords && sessionRecords.map((record , index)=>(<View style={styles.session_record} key={index}>
                        <Text style={styles.session_record_title} numberOfLines={1} ellipsizeMode='tail'>
                            <Text> {record.timestamp ? new Date(record.timestamp).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric"
                                    }) : "--/--/--"}  </Text>
                            <Text style={[styles.pending , styles[record.activity_status] , {fontFamily: fonts.bold }]}>
                                ( {record.activity_status.toUpperCase()} )
                            </Text>
                        </Text>
                        <Text style={styles.session_record_title} numberOfLines={1} ellipsizeMode='tail'>
                            {`Name : ${record.session_name}`}
                        </Text>
                        <Text style={styles.session_record_title} numberOfLines={1} ellipsizeMode='tail'>
                            {`Coach : ${record.coach}`}
                        </Text>
                        <View style={styles.session_record_hr}></View>
                            
                    </View>)) }
                    {/* <View style={styles.session_record}>
                        <Text style={styles.session_record_title} numberOfLines={1} ellipsizeMode='tail'>
                            <Text>December 1, 2024  </Text>
                            <Text style={[styles.pending , {fontFamily: fonts.bold }]}>( PENDING )</Text>
                        </Text>
                        <Text style={styles.session_record_title} numberOfLines={1} ellipsizeMode='tail'>
                            Name : Basic Session
                        </Text>
                        <Text style={styles.session_record_title} numberOfLines={1} ellipsizeMode='tail'>
                            Coach : Josh Mon Nava
                        </Text>
                        <View style={styles.session_record_hr}></View>
                            
                    </View>
                    <View style={styles.session_record}>
                        <Text style={styles.session_record_title} numberOfLines={1} ellipsizeMode='tail'>
                            <Text>December 1, 2024  </Text>
                            <Text style={[styles.rejected , {fontFamily: fonts.bold }]}>( REJECTED )</Text>
                        </Text>
                        <Text style={styles.session_record_title} numberOfLines={1} ellipsizeMode='tail'>
                            Name : Basic Session
                        </Text>
                        <Text style={styles.session_record_title} numberOfLines={1} ellipsizeMode='tail'>
                            Coach : Josh Mon Nava
                        </Text>
                        <View style={styles.session_record_hr}></View>
                            
                    </View>
                    <View style={styles.session_record}>
                        <Text style={styles.session_record_title} numberOfLines={1} ellipsizeMode='tail'>
                            <Text>December 1, 2024  </Text>
                            <Text style={[styles.approved , {fontFamily: fonts.bold }]}>( APPROVED )</Text>
                        </Text>
                        <Text style={styles.session_record_title} numberOfLines={1} ellipsizeMode='tail'>
                            Name : Basic Session
                        </Text>
                        <Text style={styles.session_record_title} numberOfLines={1} ellipsizeMode='tail'>
                            Coach : Josh Mon Nava
                        </Text>
                        <View style={styles.session_record_hr}></View>
                            
                    </View> */}
                </Animated.View>

            </View>
            {showPickerStart && (
                <DateTimePicker
                value={startDate}
                mode="date"
                display="spinner"
                onChange={onChangeStart}
                />
            )}
            {showPickerEnd && (
                <DateTimePicker
                value={endDate}
                mode="date"
                display="spinner"
                onChange={onChangeEnd}
                />
            )}
        </View> 
    )

}


const styles = StyleSheet.create({
    container : {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: "90%",
        marginTop: metrics['nav-bar-space'], 
        marginBottom: metrics['nav-bar-space'], 
    },
    action_container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%',
    },
    tags_container: {
        width : "40%",
        maxWidth: 150,
        height: 35,
        backgroundColor: "rgba(49,49,49,0.8)",
        borderTopEndRadius: metrics.r4,
        borderTopStartRadius: metrics.r4,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        columnGap: metrics.m2,
    },
    tag_text : {
        fontSize: metrics.body1,
        fontFamily: fonts.bold,
        color: colors.background,
        lineHeight: metrics.body1,
    }, 
    list_container: {
        width: '100%',
        height: 'auto',
        minHeight: 400,
        backgroundColor: "rgba(217,217,217,0.5)",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: metrics.m3, 
        paddingBottom: metrics.m3,
        borderTopRightRadius: metrics.r3,
        borderBottomLeftRadius: metrics.r3,
        borderBottomRightRadius: metrics.r3,
    },
    member_card : {
        width: "90%",
        height: 75,
        // backgroundColor: "rgba(255,255,255,0.5)",
        borderRadius: metrics.r2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: metrics.m2,
        boxSizing: 'border-box',
        position: 'relative'
    },
    member_image : {
        width: 60,
        height: 60,
        borderRadius: metrics.r2,
        borderWidth: 1,
        borderColor: colors.overlay,
    },
    member_info_container : {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginLeft: metrics.m2,
        flex: 1,
        boxSizing: 'border-box',
        rowGap: metrics.m1,
        height: "100%",
    },
    member_name : {
        fontSize: metrics.body1,
        fontFamily: fonts.regular,
        color: colors.text,
        lineHeight: metrics.h5,
        width: "80%"
    },
    member_position : {
        fontSize: metrics.body2,
        lineHeight: metrics.body2,
        color: colors.text,
    },
    member_visit_button : {
        width: 36,
        height: 36,
        position: 'absolute',
        top: 0,
        right: 0,
        borderWidth: 1,
        borderColor: colors.background,
        backgroundColor: colors.overlay,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: metrics.r2,
    },
    session_count_container : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: metrics.m1,
    },
    session_count_text : {
        fontSize: metrics.body1,
        fontFamily: fonts.medium,
        color: colors.text,
        lineHeight: metrics.body1,
    },
    scroll_content_style : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        columnGap: metrics.m2,
    },
    session_description_container : {
        width: "90%",
        height: "auto",
        minHeight: 100,
        backgroundColor: "rgba(217,217,217,0.5)",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: metrics.m3,
        rowGap: metrics.s2,
        paddingBottom: metrics.m3,
        borderTopRightRadius: metrics.r3,
        borderBottomLeftRadius: metrics.r3,
        borderBottomRightRadius: metrics.r3,
    },
    session_description_container_title : {
        fontSize: metrics.body1,
        fontFamily: fonts.bold,
        color: colors.text,
        lineHeight: metrics.h5,
    },
    session_description_container_description : {
        fontSize: metrics.body1,
        fontFamily: fonts.regular,
        color: colors.text,
        lineHeight: metrics.h6,
        paddingBottom: metrics.m2,
        textAlign: 'left',
        width: "90%",
    },
    dates_container : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: metrics.m3,
        width: "90%",
    },
    dates_button : {
        width: "45%",
        height: 35,
        backgroundColor: "rgba(49,49,49,0.8)",
        borderTopEndRadius: metrics.r4,
        borderTopStartRadius: metrics.r4,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        columnGap: metrics.m2,
    },
    dates_button_text : {
        fontSize: metrics.body1,
        fontFamily: fonts.bold,
        color: colors.background,
        lineHeight: metrics.body1,
    },
    
    session_records_container : {
        width: "90%",
        height: "auto",
        minHeight: 100,
        backgroundColor: "rgba(217,217,217,0.5)",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: metrics.m3, 
        paddingBottom: metrics.m3,
        borderBottomLeftRadius: metrics.r3,
        borderBottomRightRadius: metrics.r3,
    },
    session_records_container_title : {
        fontSize: metrics.body1,
        fontFamily: fonts.black,
        color: colors.text,
        lineHeight: metrics.body1,
    },
    session_record : {
        width: "90%",
        height: "auto", 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        rowGap: metrics.m1, 
        marginTop: metrics.m3,
    },
    session_record_title : {
        fontSize: metrics.body2,
        fontFamily: fonts.light,
        color: colors.text,
        lineHeight: metrics.h6,
    },
    pending : {
        color : colors.overlay,
    },
    rejected : {
        color : colors.error,
    },
    approved : {
        color : colors.success,
    },
    session_record_hr : {
        width: "100%",
        height: 1,
        backgroundColor: colors.overlay,
    },
});