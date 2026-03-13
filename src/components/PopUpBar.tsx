import React, { ReactNode, useEffect, useRef } from 'react';
import { 
    View, StyleSheet, Image, TouchableOpacity, 
    TextInput, KeyboardAvoidingView,
    StyleProp, ViewStyle, Text,
    Animated
 } from 'react-native';
import { metrics } from '../themes/metrics';
import { fonts } from '../themes/fonts';
import { colors } from '../themes/colors';


type ItemType = {
    title: string,
    message: string,
    type: 'error' | 'success' | 'neutral',
}

type PopUpBarProps = {
    record : ItemType
}

export default function PopUpBar({record} : PopUpBarProps) {

    const translateX = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(()=>{ 
        Animated.timing(opacity , {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start(); 
        setTimeout(()=>{
            Animated.timing(translateX , {
                toValue: 320,
                duration: 500,
                useNativeDriver: true,
            }).start(); 
        }, 4300);
    },[]);
    return (  
        <Animated.View style={[styles.card, styles[record.type] , {opacity , transform: [{translateX}] }]}>
            <Text style={styles.title}>{record.title}</Text>
            <Text style={styles.subtitle}>{record.message}</Text>
        </Animated.View> 
    )
}


const styles = StyleSheet.create({
    card : {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: metrics.m2,
        borderRadius: metrics.r2,
        borderWidth: 2,
        borderColor: colors.background,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 8,
        maxWidth: 300,
    },
    title: {
        fontSize: metrics.body1,
        fontFamily: fonts.semibold,
        color: colors.background,
    },
    subtitle : {
        fontSize: metrics.body2,
        fontFamily: fonts.light,
        color: colors.background,
    },
    error : {
        backgroundColor: colors.error,
    },
    success : {
        backgroundColor: colors.success,
    },
    neutral : {
        backgroundColor: colors.neutral,
    },
});