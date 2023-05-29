import { Animated, View } from "react-native";
import { width, CARD_WIDTH, CARD_HEIGHT } from "./confs/const";
import StationCard from "../components/StationCard";


const StationsList = ({ navigation }: any) => {
    const SPACING_FOR_CARD_INSET = width * 0.1 - 25;
    let mapIndex = 0;
    let mapAnimation = new Animated.Value(0);
return (
    <View style={styles.container}>
      {showGasStations && (
        <View style={styles.ScrollView}>
          <Animated.ScrollView
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
                  style={styles.stationCard}
                />
              )
            })}
          </Animated.ScrollView>

        </View>

      )}
      
    </View>
  );
};

export default StationsList;