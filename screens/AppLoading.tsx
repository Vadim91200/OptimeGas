import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, ActivityIndicator } from "react-native"

const AppLoading = () => {
    
    return (
        <View style={styles.container}>
                <Text style={styles.font}>Your app is loading o((???))o.</Text>
                <ActivityIndicator size="large" color="white" />
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