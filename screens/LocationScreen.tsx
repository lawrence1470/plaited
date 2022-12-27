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
import { useState, useContext } from "react";
import AddressAutocomplete from "../components/widgets/AddressAutocomplete";
import { Box, Button, Spinner, VStack } from "native-base";
import { supabase } from "../lib/supabase";
import { AuthContext } from "../App";
import pointInPolygon from "point-in-polygon";
import { NYC_CORDS } from "../constants/locations";

export default function GeoLocation({ navigation }: any) {
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [address, setAddress] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const context = useContext(AuthContext) as any;

  const submitForReview = async () => {
    setLoading(true);

    const isServiceable = pointInPolygon([lat!, lng!], NYC_CORDS);

    if (isServiceable) {
      try {
        await supabase
          .from("addresses")
          .insert({ full_address: address, id: context.profile.id });

        await supabase
          .from("profiles")
          .update({ is_serviceable: true })
          .eq("id", context.profile.id);
        navigation.navigate("ApprovedAddress");
      } catch (error) {
        console.error(error);
      }
    } else {
      navigation.navigate("NotApprovedAddress");
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <AddressAutocomplete
        setLat={setLat}
        setLng={setLng}
        setAddress={setAddress}
      />
      {loading && <Spinner size="lg" />}

      <Box alignItems="center" style={styles.bottomButton}>
        <Button isDisabled={!lat || !lng || loading} onPress={submitForReview}>
          Click Me
        </Button>
      </Box>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
  },
  bottomButton: {
    alignSelf: "flex-end",
    position: "absolute",
    bottom: 35,
  },
});
