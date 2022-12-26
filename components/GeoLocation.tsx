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
  SUPABASE_ANON_KEY,
  SUPABASE_EDGE_FUNCTION_GEO_LOCATION_URL,
} from "@env";
import axios from "axios";
import { useState } from "react";
import AddressAutocomplete from "./widgets/AddressAutocomplete";

export default function GeoLocation() {
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);

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
      <AddressAutocomplete />

      <Pressable
        style={styles.button}
        // disabled={lat === null || lng === null}
        onPress={submitForReview}
      >
        <Text>Submit for review</Text>
      </Pressable>
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
    backgroundColor: "blue",
  },
});
