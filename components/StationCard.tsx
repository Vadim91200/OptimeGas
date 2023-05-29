import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Platform, Linking } from "react-native";
import { GasStation } from "../models/GasStation";
import { CARD_HEIGHT, CARD_WIDTH } from "../confs/const";
type Props = {
    station: GasStation,
    style: any,
}
const handleOpenWaze = (latitude: number, longitude: number) => {
    const wazeUrl = `https://www.waze.com/ul?ll=${latitude},${longitude}&navigate=yes`;
    Linking.openURL(wazeUrl);
};

const StationCard = (props: Props) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={[props.style, styles.stationCard]}
            onPress={() => { handleOpenWaze(props.station.location?.latitude, props.station.location?.longitude) }}
        >
            <View style={styles.display}>
                <View style={styles.Price}>
                    <View style={styles.CenterPrice}>
                        <Text style={styles.TitleFuel}>Price</Text>
                        <Text style={styles.FuelTypeText}>{props.station.fuels}</Text>
                    </View>
                    <Text style={styles.PriceText}>{props.station.price}</Text>
                </View>
                <View style={styles.Age}>
                    <Text style={styles.Update}>Last Update</Text>
                    <View style={styles.CenterAge}>
                        <Text style={styles.AgeText}>{Math.round((props.station.age + Number.EPSILON) * 100) / 100 + " d"}</Text>
                        <Text style={styles.Ago}>ago</Text>
                    </View>
                </View>
                <View style={styles.Distance}>
                    <Text style={styles.TitleDistance}>Distance</Text>
                    <Text style={styles.DistanceText}>{Math.round((props.station.distance / 1000 + Number.EPSILON) * 100) / 100 + " km"}</Text>
                </View>
            </View>
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
        backgroundColor: 'red',
        borderRadius: 20,
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
        backgroundColor: '#34c924',
    },
    title: {
        maxWidth: "90%",
        marginLeft: "3%",
    },
    Price: {
        flex: 1,
        alignItems: 'center',
    },
    CenterPrice: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: '8%',
    },
    TitleFuel: {
        fontFamily: "AtkinsonHyperlegible_400Regular",
        fontSize: 10,
        color: 'white',
        right: '80%',
    },
    PriceText: {
        fontFamily: "AtkinsonHyperlegible_700Bold",
        fontSize: 15,
        color: 'white',
        bottom: '20%',
    },
    FuelTypeText: {
        fontFamily: "AtkinsonHyperlegible_400Regular",
        fontSize: 10,
        color: 'white',
        left: '80%',
    },
    Age: {
        flex: 1,
        borderRightWidth: 2,
        borderLeftWidth: 2,
        borderColor: 'white',
    },
    Update: {
        fontFamily: "AtkinsonHyperlegible_400Regular",
        fontSize: 10,
        color: 'white',
        top: '1%',
        left: '2%',
    },
    CenterAge: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    AgeText: {
        fontFamily: "AtkinsonHyperlegible_700Bold",
        fontSize: 15,
        color: 'white',
    },
    Ago: {
        left: '10%',
        fontFamily: "AtkinsonHyperlegible_700Bold",
        fontSize: 13,
        color: 'white',
    },
    Distance: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    TitleDistance: {
        fontFamily: "AtkinsonHyperlegible_400Regular",
        fontSize: 10,
        color: 'white',
        right: '30%',
        bottom: '18%',
    },
    DistanceText: {
        fontFamily: "AtkinsonHyperlegible_700Bold",
        fontSize: 15,
        color: 'white',
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    footerText: {
        fontFamily: "AtkinsonHyperlegible_400Regular",
        fontSize: 15,
        left: '10%',
    },

});