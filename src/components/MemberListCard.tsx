import React, { ReactNode } from 'react';
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

type MemberListCardProps = {
}

export default function MemberListCard({} : MemberListCardProps) {
    return (
        <View style={styles.member_card}>
            <TouchableOpacity style={styles.member_visit_button}>
                <SVGVisitMember />
            </TouchableOpacity>
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