import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Text,
  Pressable,
} from "react-native";
import Constants from "expo-constants";
import {
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from "react-native-google-places-autocomplete";
import {
  GOOGLE_PLACES_API_KEY,
  SUPABASE_ANON_KEY,
  SUPABASE_EDGE_FUNCTION_GEO_LOCATION_URL,
} from "@env";
import axios from "axios";
import { useState } from "react";

export default function GeoLocation() {
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);

  const handleAddressPress = (details: GooglePlaceDetail | null) => {
    if (details) {
      const { lat, lng } = details?.geometry?.location;
      setLat(lat);
      setLng(lng);
    }
  };

  const submitForReview = async () => {
    const checkAddress = await axios.post(
      SUPABASE_EDGE_FUNCTION_GEO_LOCATION_URL,
      { lat, lng },
      {
        headers: {
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      }
    );
    console.log(checkAddress.data);
  };

  return (
    <View style={{ paddingTop: Constants.statusBarHeight, flex: 1 }}>
      <GooglePlacesAutocomplete
        fetchDetails={true} // need this to fetch the details object
        placeholder="Search"
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, '---', details);
          handleAddressPress(details);
        }}
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: "en",
        }}
      />

      {/*<Pressable*/}
      {/*  style={styles.button}*/}
      {/*  // disabled={lat === null || lng === null}*/}
      {/*  onPress={submitForReview}*/}
      {/*>*/}
      {/*  <Text>Submit for review</Text>*/}
      {/*</Pressable>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    height: "50%",
    padding: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    marginTop: 60,
    backgroundColor: "blue",
  },
});
