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
import PopUpBar from './PopUpBar';


type ItemType = {
    title: string,
    message: string,
    type: 'error' | 'success' | 'neutral',
}

type PopUpProps = {
    records : ItemType[]
}

export default function PopUp({records} : PopUpProps) {

    
    return (
        <View style={styles.container}>

            {/* <View style={[styles.card, styles.error]}>
                <Text style={styles.title}>Something Wrong!</Text>
                <Text style={styles.subtitle}>Before you submit coach activity, Please provide a remarks about the activity.</Text>
            </View>
            <View style={[styles.card, styles.success]}>
                <Text style={styles.title}>Submitted Successfully</Text>
                <Text style={styles.subtitle}>The coach activity was submitted successfully! Admin will verify the activity</Text>
            </View>
            <View style={[styles.card, styles.neutral]}>
                <Text style={styles.title}>Page is reloaded</Text>
                <Text style={styles.subtitle}>The page has been reloaded.</Text>
            </View> */}

            {/* {records.map((item, index)=>{
                return <Animated.View style={[styles.card, styles[item.type], {opacity}]} key={index}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.subtitle}>{item.message}</Text>
                </Animated.View>
            })} */}
            
            {records.map((item, index)=>{
                return <PopUpBar record={item} key={index}/>
            })}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 8,
        right: 4,
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'center',
        rowGap: metrics.m2,
    },
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