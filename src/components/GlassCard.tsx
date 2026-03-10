import React, { ReactNode } from 'react';
import { 
    View, StyleSheet, Image, TouchableOpacity, 
    TextInput, KeyboardAvoidingView,
    StyleProp, ViewStyle
 } from 'react-native';
import { BlurView } from 'expo-blur';
import { metrics } from '../themes/metrics';

type GlassCardProps = {
    children: ReactNode,
    prop_style?: StyleProp<ViewStyle>,
}

export default function GlassCard({children, prop_style} : GlassCardProps) {
    return (
        <BlurView intensity={45} tint="light" style={[styles.glass_card , prop_style]}>
            {children}
        </BlurView>
    )
}

const styles = StyleSheet.create({
    glass_card: {
        // glass look
        backgroundColor: "rgba(255,255,255,0.18)",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        // elevation: 8,
    },
});