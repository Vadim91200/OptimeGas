import React, { useState, useEffect, useRef } from 'react';
import {
    Alert,
    Animated,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Form from '../components/Form';
import { width, CARD_WIDTH } from '../confs/const';
import { FormValues, correspondancePrix, correspondanceAge } from '../models/Form';
import { GasStation } from '../models/GasStation';
import axios from 'axios';
import StationCard from '../components/StationCard';

const Home = ({ userCoords, mapViewRef }: any) => {
    const [formValues, setFormValues] = useState<FormValues>({
        fuelType: 'Gazole',
        maxDistance: 10000,
    });
    const [loading, setLoading] = useState(false);
    const [GasStations, setGasStations] = useState<GasStation[]>([]);
    const [showGasStations, setShowGasStations] = useState(false); // Track the visibility of the ScrollView
    const scrollViewRef = useRef<ScrollView>(null);
    const SPACING_FOR_CARD_INSET = width * 0.1 - 25;
    let mapIndex = 0;
    let mapAnimation = new Animated.Value(0);

    useEffect(() => {
        mapAnimation.addListener(({ value }) => {
            let index = Math.floor(value / CARD_WIDTH + 0.3);
            if (index >= GasStations.length) {
                index = GasStations.length - 1;
            }
            if (index <= 0) {
                index = 0;
            }
            clearTimeout(regionTimeout);
            const regionTimeout = setTimeout(() => {
                if (mapIndex !== index) {
                    mapIndex = index;
                    handlestationFocus(GasStations[index]);
                }
            }, 10);
        });
    });
    const findCheapestGasStation = async () => {
        setShowGasStations(false)
        setGasStations([]);
        setLoading(!loading);
    };
    useEffect(() => {
        if (userCoords) {
            (async () => {
                try {
                    const response = await axios.get(` https://data.economie.gouv.fr/api/records/1.0/search/?dataset=prix-des-carburants-en-france-flux-instantane-v2&q=&rows=10000&facet=carburants_disponibles&geofilter.distance=${userCoords.latitude}%2C+${userCoords.longitude}%2C+${formValues.maxDistance}`);
                    response.data.records.forEach((station: any) => {
                        if (station.fields.carburants_disponibles && station.fields.carburants_disponibles.includes(formValues.fuelType)) {
                            GasStations.push({
                                address: { street_line: station.fields.adresse, city_line: station.fields.ville },
                                age: Math.abs(new Date().getTime() - correspondanceAge(formValues.fuelType, station).getTime()) / 86400000,
                                price: correspondancePrix(formValues.fuelType, station),
                                distance: station.fields.dist,
                                fuels: formValues.fuelType,
                                location: { latitude: station.geometry.coordinates[1], longitude: station.geometry.coordinates[0] }
                            });
                        }
                    });
                    formatGasStationData(GasStations);
                    if (GasStations.length > 0) {
                        setShowGasStations(true);
                        handlestationFocus(GasStations[0]);
                    } else {
                        Alert.alert('Error', 'No gas stations found.');
                    }
                } catch (error) {
                    console.log(error)
                    Alert.alert('Error', 'Failed to fetch gas station data.');
                }
            })();
        }
    }, [loading]);
    const handlestationFocus = (station: GasStation) => {
        if (mapViewRef.current) {
            mapViewRef.current.animateToRegion(
                {
                    latitude: station.location?.latitude!,
                    longitude: station.location?.longitude!,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                },
                350
            );
        }
    };
    const formatGasStationData = async (GasStations: GasStation[]) => {
        GasStations.sort((a, b) => a.price - b.price);
        setGasStations(GasStations.slice(0, 15));
    };
    return (
        <View style={styles.container}>
            {showGasStations && (
                <View style={styles.ScrollView}>
                    <Animated.ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        ref={scrollViewRef}
                        snapToInterval={CARD_WIDTH + 20}
                        snapToAlignment="center"
                        contentInset={{
                            top: 0,
                            left: SPACING_FOR_CARD_INSET,
                            bottom: 0,
                            right: SPACING_FOR_CARD_INSET
                        }}
                        contentContainerStyle={{
                            paddingHorizontal: 10,
                        }}
                        onScroll={Animated.event(
                            [
                                {
                                    nativeEvent: {
                                        contentOffset: {
                                            x: mapAnimation,
                                        },
                                    },
                                },
                            ],
                            { useNativeDriver: true }
                        )}
                        scrollEventThrottle={1}
                        style={styles.containerStationCard}
                    >
                        {GasStations.map((station, index) => {
                            return (
                                <StationCard
                                    key={index}
                                    station={station}
                                    style={styles.stationCard}
                                />
                            )
                        })}
                    </Animated.ScrollView>

                </View>

            )}
            <MapView
                style={styles.map}
                ref={mapViewRef}
                showsUserLocation={true}
                provider={PROVIDER_GOOGLE}
            >
                {GasStations.map((marker, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: marker.location?.latitude!,
                            longitude: marker.location?.longitude!,
                        }}
                    />
                ))}
            </MapView>
           
            <Form
                OnpressFuntion={findCheapestGasStation}
                formValues={formValues}
                setFormValues={setFormValues}
            />
        </View >
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%'
    },
    containerStationCard: {
        position: "absolute",
    },
    ScrollView: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1,
        top: "87%",
    },
    marker: {
        position: 'absolute',
    },
    stationCard: {
    },

});