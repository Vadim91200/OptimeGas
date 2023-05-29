import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  StyleSheet,
} from 'react-native';
import { useEffect, useRef, useState } from 'react';
import * as Location from 'expo-location';
import LoadingPage from './screens/AppLoading';
import HomePage from './screens/Home';
import MapView from 'react-native-maps';
import {
  AtkinsonHyperlegible_400Regular,
  AtkinsonHyperlegible_400Regular_Italic,
  AtkinsonHyperlegible_700Bold,
  AtkinsonHyperlegible_700Bold_Italic,
  useFonts,
} from '@expo-google-fonts/atkinson-hyperlegible';

const Stack = createNativeStackNavigator();

export default function App() {
  const [userCoords, setUserCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const mapViewRef = useRef<MapView>(null);
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
        } catch (error) {
          console.log(error.message);
        }
      })();
    })();
  }, []);
  let [fontsLoaded] = useFonts({
    AtkinsonHyperlegible_400Regular,
    AtkinsonHyperlegible_400Regular_Italic,
    AtkinsonHyperlegible_700Bold,
    AtkinsonHyperlegible_700Bold_Italic,
  });
  if (!fontsLoaded) return <LoadingPage />;
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen name="Home Page" options={{ headerShown: false }} children={() => <HomePage userCoords={userCoords} mapViewRef={mapViewRef} />} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
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

