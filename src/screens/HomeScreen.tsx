import React, { useState, useCallback, useEffect, use } from 'react';
import { 
    View, Text, StyleSheet, Image, 
    TouchableOpacity, TextInput, KeyboardAvoidingView , 
    ScrollView, 
    Dimensions,
    RefreshControl
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
import NavBar from '../components/NavBar';
import ListOfMembers from '../layouts/ListOfMembers'; 
import { getSessionToken } from '../storage/secureStorage';
import { getRequestUrl } from '../services/apiUrl';
import type { MemberType } from '../types/MemberType';

type HomeScreenProps = {
    navigation: any
}

type PopUpItemType = {
    title: string,
    message: string,
    type: 'error' | 'success' | 'neutral',
}


export default function HomeScreen({navigation} : HomeScreenProps) {
    const [refreshing, setRefreshing] = useState(false);
    const [sessionKey , setSessionKey] = useState<string | null>(null);
    const [members, setMembers] = useState<MemberType[]>([]);
    const [popUps, setPopUps] = useState<PopUpItemType[]>([]);
    const [search, setSearch] = useState(''); 

    useEffect(()=>{
        if (popUps.length == 0) return;
        const timer = setTimeout(()=>{
            setPopUps((prev)=>prev.slice(1));
        }, 5000);
        return ()=>{
            clearTimeout(timer);
        }
    },[popUps]);

    useEffect(()=>{  
        const timer = setTimeout(()=>{
            fetchMembers(search);
        }, 500);
        return ()=>{
            clearTimeout(timer);
        }
    },[search]);
 
    async function initialize() {
        const session_key = await getSessionToken();
        console.log("Session:", session_key);

        if (session_key === null) {
            navigation.navigate('Login');
            return;
        }

        setSessionKey(session_key);

        console.log("Fetching members");

        try {
            await fetchMembers(undefined, session_key);
            console.log("Done fetching members");
        } catch (error) {
            console.log("Fetch members error:", error);
        } finally {
            setRefreshing(false);
        }
    }

    useFocusEffect(
        useCallback(() => {
            setRefreshing(true);
            initialize();

            return () => { 
                setSessionKey(null);
            };
        }, [])
    );


    async function fetchMembers( search? : string , alternateKey? : string) {
        // TODO: Fetch the members from the cloud service
        if (sessionKey === null) {
            if (alternateKey === null) return;
        };

        const selectedKey = alternateKey ?? sessionKey;

        const serverUrl = await getRequestUrl();
        let url = `${serverUrl}api/v2/app/coach/gym/members/?session_key=${selectedKey}`;
        if (search !== undefined) url += `&search=${search}`;
        try{
            const response = await fetch( url );
            if (response.ok){    
                const data : MemberType[] = await response.json();
                console.log(data);
                setMembers(data);
            } else {
                const data = await response.json();
                setPopUps((prev)=>[...prev, {
                    title: 'Something went wrong',
                    message: data.message ?? 'Please check your internet connection and try again',
                    type: 'error',
                }]);
            }
        } catch(error){
            setPopUps((prev)=>[...prev, {
                title: 'Something went wrong',
                message: "There was an error fetching the members. Please try again later.",
                type: 'error',
            }]);
        }


    }
 

    const onRefresh = async () => {
        if (refreshing) return; // prevent multiple refreshes
        setRefreshing(true);

        // fetch your data here 
        await fetchMembers();

        setRefreshing(false);
    };
    
    return (
        <SafeAreaView style={{flex: 1, overflow: 'scroll'}}>
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>

                <Image style={styles.background_image} source={images.background} />


                <ScrollView 
                    style={styles.scroll_view} 
                    contentContainerStyle={styles.scroll_view_container} 
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    <ListOfMembers members={members} setSearch={setSearch} />

                </ScrollView>
                {/* <ListOfMembers /> */}

            

                <NavBar />
                <PopUp records={popUps}/>

            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
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
    scroll_view : {
        width: '100%',
        height: '100%', 
    },
    scroll_view_container : {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
});