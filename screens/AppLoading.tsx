import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, ActivityIndicator } from "react-native"

const AppLoading = () => {
    
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#FFC371', '#FF5F6D']}
                start={{ x: 1, y: 0.14 }}
                end={{ x: 0, y: 0.3 }}
                locations={[0, 0.6]}
                style={styles.linearGradient}
            >
                <Text style={styles.font}>Your app is loading o((???))o.</Text>
                <ActivityIndicator size="large" color="#EDCFF3" />
            </LinearGradient>
        </View>
    )

}

export default AppLoading;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F4F2E8',
    },
    font: {
        fontStyle: 'normal',
        fontWeight: '400',
        color: '#666666',
        marginBottom: 50
    },
    linearGradient: {
        bottom: 0,
        position: 'absolute',
        height: "100%",
        left: 0,
        right: 0,
        top: 0,
        paddingBottom: "16%",
    }
});