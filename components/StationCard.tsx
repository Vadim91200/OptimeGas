import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Platform } from "react-native";
import { GasStation } from "../models/GasStation";
import { CARD_HEIGHT, CARD_WIDTH } from "../confs/const";
type Props = {
    station: GasStation,
    OnpressFuntion: (isVisible: boolean) => void,
    style: any,
}

const StationCard = (props: Props) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={[props.style, styles.stationCard]}
            onPress={() => { props.OnpressFuntion }}
        >
            <View style={styles.display}>
                <View style={styles.Price}>
                    <Text style={styles.PriceText}>{props.station.price}</Text>
                </View>
                <View style={styles.FuelType}>
                    <Text style={styles.FuelTypeText}>{props.station.fuels}</Text>
                </View>
                <View style={styles.Distance}>
                    <Text style={styles.DistanceText}>{Math.round(props.station.distance/ 1000) + " km"}</Text>
                </View>
            </View>
            <Text style={[styles.title, props.station.name.length >= 30 ? { fontSize: 14 } : { fontSize: 23 }]}>
                {props.station.name}
            </Text>
            <View style={styles.footer}>
                <Text style={[styles.footerText]}>{props.station.address.street_line + " " + props.station.address.city_line}</Text>
            </View>

        </TouchableOpacity>
    );
}

export default StationCard;



const styles = StyleSheet.create({
    stationCard: {
        marginHorizontal: 10,
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 15,

        ...Platform.select({
            ios: {
                height: 200,
                width: 200
            },
        })

    },
    display: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    title: {
        maxWidth: "90%",
        marginLeft: "3%",
    },
    Price: {
        borderRightWidth: 1,
        borderColor: '#CCC',
    },
    PriceText: {
        fontSize: 18,
        paddingLeft: 5,
        maxWidth: "90%"
    },
    FuelType: {
        borderRightWidth: 1,
        borderColor: '#CCC',
    },
    FuelTypeText: {
        fontSize: 18,
        paddingLeft: 5,
        maxWidth: "90%"
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        left: "6%",
    },
    footerText: {
        fontSize: 18,
        paddingLeft: 5,
        maxWidth: "90%"
    },

});