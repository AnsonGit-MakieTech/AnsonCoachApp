import React, { useState } from 'react';
import { 
    View, Text, StyleSheet, Image, 
    TouchableOpacity, TextInput, KeyboardAvoidingView , 
    ScrollView, 
    Dimensions,
    RefreshControl
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
import NavBar from '../components/NavBar';
import ListOfMembers from '../layouts/ListOfMembers'; 

type HomeScreenProps = {
    navigation: any
}

const { width } = Dimensions.get('window');

export default function HomeScreen({navigation} : HomeScreenProps) {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);

        // fetch your data here
        await new Promise(resolve => setTimeout(resolve, 1000));

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
                    <ListOfMembers />

                </ScrollView>
                {/* <ListOfMembers /> */}

            
                {/* <PopUp /> */}

                <NavBar />

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