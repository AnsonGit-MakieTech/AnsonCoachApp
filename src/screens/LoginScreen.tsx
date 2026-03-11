import React, {  useEffect, useState, useCallback } from 'react';
import { 
    View, Text, StyleSheet, Image, 
    TouchableOpacity, TextInput, KeyboardAvoidingView , 
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { images } from '../themes/images';
import { BlurView } from 'expo-blur';
import { metrics } from '../themes/metrics';
import GlassCard from '../components/GlassCard';
import { fonts } from '../themes/fonts';
import { colors } from '../themes/colors';
import PopUp from '../components/PopUp';
import { SafeAreaView } from "react-native-safe-area-context";
import { loginAccount } from '../services/loginAccount';
import { saveSessionToken, clearSessionToken } from '../storage/secureStorage';

type LoginScreenProps = {
    navigation: any
}

type ErrorItemType = {
    title: string,
    message: string,
    type: 'error' | 'success' | 'neutral',
}

export default function LoginScreen({navigation} : LoginScreenProps) {

    const [isLoading, setIsLoading] = useState(false); 
    const [ account_key, setAccountKey ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState<ErrorItemType[]>([]);

    useEffect(()=>{
        if (error.length == 0) return;
        const timer = setTimeout(()=>{
            setError((prev)=>prev.slice(1));
        }, 5000);
        return ()=>{
            clearTimeout(timer);
        }
    },[error]);

    useFocusEffect(
        useCallback(() => {
        // console.log('Screen Entered');

        // your logic here
        // fetch data
        // refresh UI
        // start animations
        
        // Clear the session token
        clearSessionToken();


        return () => {
            // console.log('Screen Left');
        };

        }, [])
    );


    
    async function LoginAccountEvent( account_key : string , password : string){
        if (isLoading) return;
        setIsLoading(true);
        if (account_key === '' || password === ''){
            return;
        }
        
        setError((prev)=>[...prev, {
            title : 'Logging in...',
            message : 'Please wait while we are logging you in...',
            type : 'neutral',
        }]);

        const [data , isSuccess] = await loginAccount(account_key , password);


        if (isSuccess){
            setError( (prev)=>[...prev , {
                title: 'Successfully Login',
                message: data.message,
                type: 'success',
            }]);
            console.log(data.data.session_key);
            await saveSessionToken(data.data.session_key);
            navigation.navigate('Home');
        } else {
            // Add error result to the error array
            setError( (prev)=>[...prev , {
                title: 'Something went wrong',
                message: data.message ?? 'Please check your internet connection and try again',
                type: 'error',
            }]);
        }
        setIsLoading(false);
    }


    return (
        <SafeAreaView style={{flex: 1}}>
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <Image style={styles.background_image} source={images.background} />


                <GlassCard prop_style={styles.prop_style}>
                    <View style={styles.form_container}>
                        <Text style={styles.title}>ANSON'S PLAYGROUND & CAFE</Text>
                        <Text style={styles.subtitle}>Fitness & Gym Zone</Text>

                        <Text style={styles.form_label}>Coach Account Key</Text>
                        <TextInput style={styles.form_input} placeholder="Enter your Coach Account Key" onChangeText={(text) => setAccountKey(text)} />

                        <Text style={styles.form_label}>Coach Account Password</Text>
                        <TextInput style={styles.form_input} placeholder="Enter your Password" onChangeText={(text) => setPassword(text)} />

                        <TouchableOpacity style={styles.button} onPress={() => LoginAccountEvent(account_key , password)}>
                            <Text style={styles.button_text}>OPEN NOTEBOOK</Text>
                        </TouchableOpacity>

                    </View>
                </GlassCard>

                
                <PopUp records={error} />

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