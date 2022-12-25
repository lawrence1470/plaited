import { View, StyleSheet, ScrollView, SafeAreaView, Text } from "react-native";
import Constants from "expo-constants";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
// import { GOOGLE_PLACES_API_KEY } from "@env";

const GOOGLE_PLACES_API_KEY = "AIzaSyDDuch_D4BHz_2rv9Iz4L4bPJsqHMsMfWI";

export default function GeoLocation() {
  console.log(GOOGLE_PLACES_API_KEY, "api");
  return (
    <View style={{ paddingTop: Constants.statusBarHeight, flex: 1 }}>

    <GooglePlacesAutocomplete
      placeholder="Search"
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: GOOGLE_PLACES_API_KEY,
        language: "en",
      }}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    height: "100%",
    padding: 10,
    zIndex: 2,
  },
});
