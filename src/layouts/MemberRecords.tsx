import React, { useState, ReactNode, useEffect } from 'react';
import { 
    View, StyleSheet, TouchableOpacity, 
    TextInput, KeyboardAvoidingView,
    StyleProp, ViewStyle, Text,
    ScrollView,
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


type MemberRecordsProps = {

}

export default function MemberRecords({} : MemberRecordsProps) {

    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const { state, dispatch } = useGlobalState();
 

    function onChange(event: any, selectedDate?: Date) {
        setShowPicker(false); 
        if (selectedDate) {
            setDate(selectedDate);
        }
    }

    function goBack(){
        dispatch({ type: 'SET_MEMBER', payload: null });
        dispatch({ type: 'SET_TAB', payload: 'members' });
    }

    function submitRecords(){ 
        console.log("State:", state);
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
                        
                        state && state.member && state.member.session && !state.member.session.session_is_expired && <TouchableOpacity style={styles.member_visit_button} onPress={submitRecords}>
                            <SVGDumbellIcon />
                        </TouchableOpacity>
                    }

                </View>

                <View style={styles.session_description_container}>
                    <Text style={styles.session_description_container_title}>Session Plan</Text>
                    <Text style={styles.session_description_container_description}>
                        { state.member ? state.member.session.session_description : "" }
                    </Text>
                </View>

                <View style={styles.session_records_container}>
                    <Text style={styles.session_records_container_title}>Session Records</Text>
                    <View style={styles.session_record}>
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
                            
                    </View>
                </View>

            </View>
            {showPicker && (
                <DateTimePicker
                value={date}
                mode="date"
                display="spinner"
                onChange={onChange}
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
        rowGap: metrics.s2,
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
        lineHeight: metrics.body1,
    },
    session_description_container_description : {
        fontSize: metrics.body1,
        fontFamily: fonts.regular,
        color: colors.text,
        lineHeight: metrics.h6,
        paddingBottom: metrics.m2,
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
        borderTopRightRadius: metrics.r3,
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
        lineHeight: metrics.body1,
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