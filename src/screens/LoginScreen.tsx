import React, { useState } from 'react';
import { 
    View, Text, StyleSheet, Image, 
    TouchableOpacity, TextInput, KeyboardAvoidingView , 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { images } from '../themes/images';
import { BlurView } from 'expo-blur';
import { metrics } from '../themes/metrics';
import GlassCard from '../components/GlassCard';
import { fonts } from '../themes/fonts';
import { colors } from '../themes/colors';
import PopUp from '../components/PopUp';
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalState } from '../store/GlobalState';

type LoginScreenProps = {
    navigation: any
}

export default function LoginScreen({navigation} : LoginScreenProps) {

    const { state, dispatch } = useGlobalState();

    return (
        <SafeAreaView style={{flex: 1}}>
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <Image style={styles.background_image} source={images.background} />


                <GlassCard prop_style={styles.prop_style}>
                    <View style={styles.form_container}>
                        <Text style={styles.title}>ANSON'S PLAYGROUND & CAFE</Text>
                        <Text style={styles.subtitle}>Fitness & Gym Zone</Text>

                        <Text style={styles.form_label}>{state.theme}</Text>
                        <TextInput style={styles.form_input} placeholder="Enter your Coach Account Key" />

                        <Text style={styles.form_label}>Coach Account Password</Text>
                        <TextInput style={styles.form_input} placeholder="Enter your Password" />

                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.button_text}>OPEN NOTEBOOK</Text>
                        </TouchableOpacity>

                    </View>
                </GlassCard>

                
                {/* <PopUp /> */}

            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    background_image : {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '120%',
        width: '100%',
        resizeMode: 'cover',
    },
    prop_style : {
        width: "80%",
        borderWidth: 1, 
        height: 350,
        borderRadius: metrics.r4,
        overflow: 'hidden',
        borderColor: colors.overlay,
    },
    form_container: { 
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'relative',
        padding: metrics.m4,
    },
    title : {
        marginTop: metrics.m5,
        fontSize: metrics.h6,
        fontFamily: fonts.bold,
        color: colors.text,
        lineHeight: metrics.h5,
    },
    subtitle : {
        fontSize: metrics.body1,
        fontFamily: fonts.light,
        color: colors.text,
        paddingBottom: metrics.m2,
    },
    form_label : {
        fontSize: metrics.body1,
        fontFamily: fonts.semibold,
        color: colors.overlay,
        marginTop: metrics.m4,
    },
    form_input : {
        width: '80%', 
        backgroundColor: colors.background,
        fontFamily: fonts.regular,
        textAlign: 'center',
        color: colors.text,
        borderRadius: metrics.r4,
        borderWidth: 1,
        borderColor: colors.overlay,
    },
    button : {
        width: 200,
        height: 40,
        backgroundColor: colors.secondary,
        borderRadius: metrics.r4,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: metrics.m5,
    },
    button_text : {
        fontSize: metrics.body1,
        fontFamily: fonts.bold,
        color: colors.background,
        textAlign: 'center',
    },

    
    

});