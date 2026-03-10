import React, { ReactNode } from 'react';
import { 
    View, StyleSheet, Image, TouchableOpacity, 
    TextInput, KeyboardAvoidingView,
    StyleProp, ViewStyle, Text
 } from 'react-native';
import { metrics } from '../themes/metrics';
import { fonts } from '../themes/fonts';
import { colors } from '../themes/colors';
import GlassCard from './GlassCard';

type NavBarProps = {}

export default function NavBar({} : NavBarProps) {
    return (
        <View style={styles.container}> 
            <GlassCard prop_style={styles.prop_style}> 
                <View style={styles.info_container}>
                    <Text style={styles.title}>ANSON'S PLAYGROUND & CAFE</Text>
                    <Text style={styles.subtitle}>Fitness & Gym Zone</Text>
                </View>
 
            </GlassCard>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        width: '100%',
        height: 50,
        position: 'absolute',
        top: 0,
        left: 0, 
        elevation: 8, 
        shadowColor: "#000",
        
    },
    prop_style: {
        backgroundColor: "rgba(255,255,255,0.50)",
        display: 'flex',
        flexDirection: "row",
        height: "100%",
        width: "100%",
    }, 
    info_container: {
        flex: 1,
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: metrics.m2,
        boxSizing: 'border-box', 

    },
    title : {
        fontSize: metrics.body1,
        fontFamily: fonts.bold,
        color: colors.primary,
        lineHeight: metrics.body1,
    },
    subtitle : {
        fontSize: metrics.body2,
        fontFamily: fonts.light,
        color: colors.text,
        lineHeight: metrics.body2,
    },
    
})