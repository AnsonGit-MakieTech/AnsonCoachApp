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
import SVGMemberTag from '../svgs/SVGMemberTag';
import { Image } from 'expo-image';
import SVGSessionCount from '../svgs/SVGSessionCount';
import SVGVisitMember from '../svgs/SVGVisitMember';
import MemberListCard from '../components/MemberListCard';

type ListOfMembersProps = {
}


export default function ListOfMembers({} : ListOfMembersProps) {

    return (
        <View style={styles.container}>
            <View style={styles.action_container}>
                <View style={styles.tags_container}>
                    <SVGMemberTag />
                    <Text style={styles.tag_text}>Members</Text>
                </View>
                <View style={styles.search_container}>
                    <TextInput style={styles.search_input} placeholder='Search Members' />
                </View>
            </View>
            <View style={styles.list_container}>

                {/* <View style={styles.member_card}>
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
                </View> */}
                
                <MemberListCard />
                <MemberListCard />
                <MemberListCard /> 

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
    search_container: {
        width : "50%",
        maxWidth: 200,
        height: 35,
        backgroundColor: "rgba(49,49,49,0.8)",
        borderTopEndRadius: metrics.r4,
        borderTopStartRadius: metrics.r4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    search_input : {
        width: '93%',
        height: "80%",
        fontFamily: fonts.light,
        color: colors.text,
        fontSize: metrics.body1,
        lineHeight: metrics.body1,
        backgroundColor: colors.background,
        padding: 0,
        textAlign: 'center',
        borderTopLeftRadius: metrics.r3,
        borderTopRightRadius: metrics.r3,
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
    },
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