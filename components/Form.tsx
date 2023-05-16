import { StyleSheet, Text, TouchableOpacity, View, TextInput } from "react-native";
import React, { useState } from 'react';
import { FormValues, FuelType} from "../models/Form";
type Props = {
    OnpressFuntion: () => void,
    formValues: FormValues,
    setFormValues: (formValues: FormValues) => void,
}
const Form = (props: Props) => {
    const handleFuelTypeChange = (value: FuelType) => {
        props.setFormValues({ ...props.formValues, fuelType: value });
    };
    const handleMaxDistanceChange = (value: string) => {
        props.setFormValues({ ...props.formValues, maxDistance: parseInt(value, 10) });
    };
    
    return (
        <View style={styles.form}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Fuel Type:</Text>
                <View style={styles.input}>
                    <TouchableOpacity
                        onPress={() => handleFuelTypeChange('Gazole')}
                        style={[styles.fuelTypeButton, props.formValues.fuelType === 'Gazole' ? styles.selectedFuelTypeButton : null]}
                    >
                        <Text style={styles.fuelTypeButtonText}>Gazole</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleFuelTypeChange('SP95')}
                        style={[styles.fuelTypeButton, props.formValues.fuelType === 'SP95' ? styles.selectedFuelTypeButton : null]}
                    >
                        <Text style={styles.fuelTypeButtonText}>SP95</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleFuelTypeChange('SP98')}
                        style={[styles.fuelTypeButton, props.formValues.fuelType === 'SP98' ? styles.selectedFuelTypeButton : null]}
                    >
                        <Text style={styles.fuelTypeButtonText}>SP98</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleFuelTypeChange('E85')}
                        style={[styles.fuelTypeButton, props.formValues.fuelType === 'E85' ? styles.selectedFuelTypeButton : null]}
                    >
                        <Text style={styles.fuelTypeButtonText}>E85</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleFuelTypeChange('GPLc')}
                        style={[styles.fuelTypeButton, props.formValues.fuelType === 'GPLc' ? styles.selectedFuelTypeButton : null]}
                    >
                        <Text style={styles.fuelTypeButtonText}>GPLc</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Max Distance (m):</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={props.formValues.maxDistance.toString()}
                    onChangeText={handleMaxDistanceChange}
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => { props.OnpressFuntion() }} style={styles.button}>
                    <Text style={styles.buttonText}>Find Gas Stations</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default Form;
const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 10,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 8,
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 4,
    },
    fuelTypeButton: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#CCC',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 4,
    },
    selectedFuelTypeButton: {
        backgroundColor: '#007AFF',
        borderColor: '#007AFF',
    },
    fuelTypeButtonText: {
        color: '#333',
        fontWeight: 'bold',
    },
    form: {
        position: 'absolute',
        top: '5%',
        left: '5%',
        right: '5%',
        backgroundColor: '#FFF',
        borderRadius: 8,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
    },
    buttonContainer: {
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
});
