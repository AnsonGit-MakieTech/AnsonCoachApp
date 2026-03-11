import React, { useState, ReactNode } from 'react';
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
import SVGSessionCount from '../svgs/SVGSessionCount';
import { useGlobalState } from '../store/GlobalState';


type MemberRemarksProps = {

}

export default function MemberRemarks({} : MemberRemarksProps) {

    const [ remarks, setRemarks ] = useState('');
    const { dispatch } = useGlobalState();
    
    function goBack(){ 
        dispatch({ type: 'SET_TAB', payload: 'record' });
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
                        source={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQozDm3lXaUSWh_sh2IXSqtTReQWg3Q_9YS8g&s"} 
                        style={styles.member_image}
                    />

                    <View style={styles.member_info_container}>
                        <Text style={styles.member_name} numberOfLines={1} ellipsizeMode='tail'>Josh Mon Nava faf as fasf sdf fafs dsdasfsda sdf fds </Text>
                        <Text style={styles.member_position} numberOfLines={1}>
                            <Text style={{fontFamily: fonts.bold}}>10:00 AM  </Text>
                            <Text style={{fontFamily: fonts.light}}>( Inside )</Text>
                        </Text> 
                        <View style={styles.session_count_container}>
                            <ScrollView horizontal contentContainerStyle={styles.scroll_content_style}>
                                <SVGSessionCount />
                                <SVGSessionCount />
                                <SVGSessionCount />
                                <SVGSessionCount />
                                <SVGSessionCount /> 
                            </ScrollView>
                        </View>
                    </View>
 

                </View>

                <View style={styles.session_description_container}>
                    <Text style={styles.session_description_container_title}>Session Plan</Text>
                    <Text style={styles.session_description_container_description}>
                        {"One more thing: \n if fetchMembers() depends on sessionKey state, then calling it right after setSessionKey(session_key) may still use the old state value. In that case, pass session_key directly into fetchMembers(session_key) instead of waiting for state."}
                    </Text>
                </View>

                <View style={styles.hr}></View>
                
                <Text style={styles.remarks_title}>Submit Your Remarks</Text>
                <TextInput 
                    multiline={true}
                    style={styles.remarks_input}
                    onChangeText={(text) => setRemarks(text)}
                    placeholder='Write your remarks here about the gym member and the coach session'
                />
                
                {remarks !== '' && <Text style={styles.remarks_text}>
                    By clicking the button, You verify that you are done the coach session with this gym member.
                </Text>}
                
                { remarks !== '' && <TouchableOpacity style={styles.button} onPress={() => console.log('Submit Remarks')}>
                    <Text style={styles.button_text}>Submit Remarks</Text>
                </TouchableOpacity>}

            </View> 
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
    hr : {
        width: "95%",
        height: 3,
        marginTop: metrics.m2,
        marginBottom: metrics.m2,
        borderRadius: metrics.r2,
        opacity: 0.7,
        backgroundColor: colors.overlay,
    },
    remarks_title : {
        fontSize: metrics.body1,
        fontFamily: fonts.bold,
        color: colors.overlay,
        lineHeight: metrics.body1,
        width: "90%",
        textAlign: 'left',
    },
    remarks_input : {
        width: '90%',
        height: 100,
        fontFamily: fonts.light,
        color: colors.text,
        fontSize: metrics.body1,
        lineHeight: metrics.h6,
        backgroundColor: colors.background, 
        textAlign: 'left',
        textAlignVertical: 'top',
        padding: metrics.m3,
        borderBottomLeftRadius: metrics.r3,
        borderTopRightRadius: metrics.r3,
        borderWidth: 2,
        borderColor: colors.overlay,
    },
    remarks_text : {
        backgroundColor: colors.overlay,
        padding: metrics.m2,
        borderRadius: metrics.r2,
        width: '90%',
        fontSize: metrics.body2,
        fontFamily: fonts.light,
        color: colors.background,
        lineHeight: metrics.h6,
        textAlign: 'left',
    },
    button : {
        width: 200,
        height: 40,
        backgroundColor: "#860C0C",
        borderRadius: metrics.r4,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: metrics.m2,
        borderWidth: 1,
        borderColor: colors.background,
    },
    button_text : {
        fontSize: metrics.body1,
        fontFamily: fonts.bold,
        color: colors.background,
        textAlign: 'center',
    },

});