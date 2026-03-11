import React, { ReactNode, useEffect, useState } from 'react';
import { 
    View, StyleSheet, TouchableOpacity, 
    TextInput, KeyboardAvoidingView,
    StyleProp, ViewStyle, Text,
    ScrollView,
 } from 'react-native';
import { metrics } from '../themes/metrics';
import { fonts } from '../themes/fonts';
import { colors } from '../themes/colors';
import GlassCard from './GlassCard';
import SVGMemberTag from '../svgs/SVGMemberTag';
import { Image } from 'expo-image';
import SVGSessionCount from '../svgs/SVGSessionCount';
import SVGVisitMember from '../svgs/SVGVisitMember';
import type { MemberType } from '../types/MemberType';
import { getRequestUrl } from '../services/apiUrl';
import { useGlobalState } from '../store/GlobalState';

type MemberListCardProps = {
    member : MemberType,
}

export default function MemberListCard({
    member,
} : MemberListCardProps) {
    
    const [picture , setPicture] = useState<string | null>(null);
    const [sessionCount , setSessionCount] = useState(0);
    const [logTime , setLogTime] = useState<string>("--:-- --");
    const { dispatch } = useGlobalState();

    useEffect(()=>{
        async function initilize(){
            let url = await getRequestUrl();
            // remove slash at the end
            url = url.slice(0, -1);
            const picture_url = `${url}${member.picture}`;
            setPicture(picture_url);

            if (member.session.session_is_expired){
                setSessionCount(0);
            } else if (member.session.session_count > 0){
                setSessionCount(member.session.session_count);
            }

            // Convert the timestamp to a readable format "10:00 AM"
            if (member.logs.timestamp){ 
                setLogTime(formatTime(member.logs.timestamp));
            }

        }

        initilize();

    },[member]);

    function formatTime(timestamp: string) {
        const date = new Date(timestamp);

        return date.toLocaleTimeString([], {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    }

    async function visitMember(){ 
        const requestUrl = await getRequestUrl(); 

        dispatch({ type: 'SET_REQUEST_URL', payload: requestUrl });
        dispatch({ type: 'SET_PICTURE', payload: picture });
        dispatch({ type: 'SET_SESSION_COUNT', payload: sessionCount });
        dispatch({ type: 'SET_LOG_TIME', payload: logTime });
        dispatch({ type: 'SET_MEMBER', payload: member });
        dispatch({ type: 'SET_TAB', payload: 'record' });
    }

    return (
        <View style={styles.member_card}>
            <TouchableOpacity style={styles.member_visit_button} onPress={visitMember}>
                <SVGVisitMember />
            </TouchableOpacity>
            <Image 
                source={picture ?? ""}
                style={styles.member_image}
            />
            <View style={styles.member_info_container}>
                <Text style={styles.member_name} numberOfLines={1} ellipsizeMode='tail'>{member.fullname}</Text>
                <Text style={styles.member_position} numberOfLines={1}>
                    <Text style={{fontFamily: fonts.bold}}>{logTime}  </Text>
                    <Text style={{fontFamily: fonts.light}}>( {member.logs.activity } )</Text>
                </Text>
                <View style={styles.session_count_container}>
                    <ScrollView horizontal contentContainerStyle={styles.scroll_content_style}>
                        
                        {
                            Array.from({length: sessionCount}, (_, i)=>{
                                return <SVGSessionCount key={i} />
                            })
                        }
                        {/* <SVGSessionCount />
                        <SVGSessionCount />
                        <SVGSessionCount />
                        <SVGSessionCount />
                        <SVGSessionCount />  */}
                    </ScrollView>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    
    member_card : {
        width: "90%",
        height: 75,
        backgroundColor: "rgba(255,255,255,0.5)",
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
    member_visit_button : {
        width: 30,
        height: 30,
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: colors.overlay,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: metrics.r2,
    }

});