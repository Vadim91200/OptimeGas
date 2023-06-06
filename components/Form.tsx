import { StyleSheet, Text, TouchableOpacity, View, Image, TouchableWithoutFeedback, Modal } from "react-native";
import React, { useState } from 'react';
import { FormValues, FuelType } from "../models/Form";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
type Props = {
    OnpressFuntion: () => void,
    formValues: FormValues,
    setFormValues: (formValues: FormValues) => void,
}
const Form = (props: Props) => {
    const [iconModalVisible, setIconModalVisible] = useState(false);
    const [distanceModalVisible, setDistanceModalVisible] = useState(false);
    const handleFuelTypeChange = (value: FuelType) => {
        props.setFormValues({ ...props.formValues, fuelType: value });
    };
    const handleMaxDistanceChange = (value: string) => {
        props.setFormValues({ ...props.formValues, maxDistance: parseInt(value, 10) });
    };

    return (
        <View style={styles.Container}>
            <View style={styles.IconView}>
                <MaterialCommunityIcons name="fuel" size={40} style={{ paddingBottom: 8 }}
                    onPress={() => setIconModalVisible(true)}
                />
                <MaterialCommunityIcons name="map-marker-distance" size={40} 
                    onPress={() => setDistanceModalVisible(true)}
                />
                <MaterialCommunityIcons name="text-search" size={40} style={{ paddingTop: 5 }}
                    onPress={() => props.OnpressFuntion()}
                />
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={iconModalVisible}
                onRequestClose={() => setIconModalVisible(false)}
            >
                <View style={styles.IconModal}>
                    <TouchableWithoutFeedback onPress={() => { handleFuelTypeChange('Gazole'), setIconModalVisible(false) }}>
                        <View style={styles.Icon}>
                            <Image style={styles.image} source={require('../assets/fuels/B7.png')} />
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => { handleFuelTypeChange('SP95'), setIconModalVisible(false) }}>
                        <View style={styles.Icon}>
                            <Image style={styles.image} source={require('../assets/fuels/sp95.png')} />
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => { handleFuelTypeChange('SP98'), setIconModalVisible(false) }}>
                        <View style={styles.Icon}>
                            <Image style={styles.image} source={require('../assets/fuels/sp98.png')} />
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => { handleFuelTypeChange('E85'), setIconModalVisible(false) }}>
                        <View style={styles.Icon}>
                            <Image style={styles.image} source={require('../assets/fuels/E85.png')} />
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => { handleFuelTypeChange('GPLc'), setIconModalVisible(false) }}>
                        <View style={styles.Icon}>
                            <Image style={styles.image} source={require('../assets/fuels/gpl.png')} />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </Modal>
            <Modal
                animationType='fade'
                transparent={true}
                visible={distanceModalVisible}
                onRequestClose={() => setDistanceModalVisible(false)}
            >
                <View style={styles.DistanceModal}>
                <Text>Radius distance : </Text>
                    <Slider
                        style={{ width: 200, height: 40 }}
                        minimumValue={5000}
                        maximumValue={50000}
                        minimumTrackTintColor="#FFFFFF"
                        maximumTrackTintColor="#000000"
                        onValueChange={(value) => handleMaxDistanceChange(value.toString())}
                        onSlidingComplete={() => setDistanceModalVisible(false)}
                    />
                    <Text>{props.formValues.maxDistance} m</Text>
                </View>
            </Modal>
        </View>
    );
};
export default Form;
const styles = StyleSheet.create({
    Container: {
        position: 'absolute',
    },
    IconView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        alignSelf: "center",
        top: "50%",
        left: "900%",
    },
    Icon: {
        padding: 2,
    },
    image: {
        width: 50,
        height: 50,
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    DistanceModal: {
        marginHorizontal: 100,
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.20)',
        borderRadius: 20,
        top: "2%",
    },
    IconModal: {
        alignItems: "center",
        marginHorizontal: "40%",
        paddingVertical: "2%",
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20,
        left: "42%",
        top: "25%",
    },
});
