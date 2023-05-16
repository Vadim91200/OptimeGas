import { Dimensions } from "react-native";

const { width } = Dimensions.get('window');
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.85;
export { width, CARD_HEIGHT, CARD_WIDTH }