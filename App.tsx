import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
  Text,
  ScrollView,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Platform,
  Dimensions,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';
import Form from './components/Form';
import StationCard from './components/StationCard';
import { GasStation } from "./models/GasStation";
import { width, CARD_WIDTH, CARD_HEIGHT } from "./confs/const";
import { FormValues, correspondance } from './models/Form';

const SPACING_FOR_CARD_INSET = width * 0.1 - 25;
export default function App() {
  const [userCoords, setUserCoords] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [loading, setLoading] = useState(false);
  const mapViewRef = useRef<MapView>(null);
  const [GasStations, setGasStations] = useState<GasStation[]>([]);
  const [showGasStations, setShowGasStations] = useState(false); // Track the visibility of the ScrollView
  const [formValues, setFormValues] = useState<FormValues>({
    fuelType: 'Gazole',
    maxDistance: 10000,
});
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
  const scrollViewRef = useRef<ScrollView>(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      (async () => {
        try {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            alert('Permission to access location was denied');
            return;
          }
          const GetCoords = await Location.getCurrentPositionAsync({});
          setUserCoords({
            latitude: GetCoords.coords.latitude,
            longitude: GetCoords.coords.longitude,
          });
          if (mapViewRef.current) {
            mapViewRef.current.animateToRegion({
              latitude: GetCoords.coords.latitude,
              longitude: GetCoords.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
          }
          setLoading(false);
        } catch (error) {
          console.log(error.message);
        }
      })();
    })();
  }, []);

  const findCheapestGasStation = async () => {
    setShowGasStations(false)
    try {
      const { latitude, longitude } = userCoords!;
      const maxDistance = formValues.maxDistance;
      const searchFuel = formValues.fuelType;
      const response = await axios.get(` https://data.economie.gouv.fr/api/records/1.0/search/?dataset=prix-des-carburants-en-france-flux-instantane-v2&q=&facet=carburants_disponibles&geofilter.distance=${latitude}%2C+${longitude}%2C+${maxDistance}`);
      response.data.records.forEach((station: any) => {
        if (station.fields.carburants_disponibles.includes(searchFuel)) {
          GasStations.push({
            name: "Station" + 1,
            address: { street_line: station.fields.adresse, city_line: station.fields.ville },
            price: correspondance(searchFuel, station),
            distance: station.fields.dist,
            fuels: searchFuel,
            location: { latitude: station.geometry.coordinates[1], longitude: station.geometry.coordinates[0] }
          });
        }
      });
      formatGasStationData(GasStations);
      if (GasStations.length > 0) {
        setShowGasStations(true);
      } else {
        Alert.alert('Error', 'No gas stations found.');
      }
    } catch (error) {
      console.log(error)
      Alert.alert('Error', 'Failed to fetch gas station data.');
    }

  };
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
    GasStations.sort((a, b) => a.price - b.price)
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
              paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
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
                  OnpressFuntion={() => { }}
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
    </View>
  );
};
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
    flex: 1,
    justifyContent: 'flex-end',
    zIndex: 2,
    top: "75%",
  },
  marker: {
    position: 'absolute',
  },
  stationCard: {
  },
});

