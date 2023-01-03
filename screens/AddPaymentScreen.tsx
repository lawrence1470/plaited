import {
  View,
  Text,
  Center,
  HStack,
  IconButton,
  Box,
  Pressable, Button
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { CardField } from "@stripe/stripe-react-native";
import { useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { AuthContext } from "../App";
import axios from "axios";
import { HEROKU_BASE_URL } from "@env";
import { StyleSheet } from "react-native";

export default function AddPaymentScreen({ navigation }: any) {
  const [cardDetails, setCardDetails] = useState<any>(null);
  const [hasPaymentMethod, setHasPaymentMethod] = useState(false);

  const handleGoBack = () => {
    navigation.navigate("Main", { screen: "Cart" });
  };

  const context = useContext(AuthContext) as any;

  const getStripeId = async () => {
    try {
      const response = (await supabase
        .from("profiles")
        .select("stripe_id")
        .eq("id", context.profile.id)
        .single()) as any;

      if (response) {
        return response.data.stripe_id;
      } else {
        throw Error("No stripe id found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddFirstPaymentMethod = async () => {
    try {
      const response = await axios.post(
        `${HEROKU_BASE_URL}/newStripeCustomer`,
        {
          cardDetails,
        }
      );

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const init = async () => {
      await getStripeId();
    };
    const createNewCustomer = async () => {
      console.log("create new customer");
    };
    const stripeId = init();

    if (!stripeId) {
      setHasPaymentMethod(false);
    } else {
      console.log("Stripe id found");
    }
  }, []);

  return (
    <View>
      <Center>
        <HStack alignItems="center">
          <IconButton
            colorScheme="black"
            variant="unstyled"
            onPress={() => handleGoBack()}
            _icon={{
              as: Ionicons,
              name: "chevron-back",
            }}
          />
          <Text>Payment</Text>
        </HStack>
      </Center>
      {!hasPaymentMethod && (
        <Box>
          <CardField
            postalCodeEnabled={true}
            placeholders={{
              number: "4242 4242 4242 4242",
            }}
            cardStyle={{
              backgroundColor: "#FFFFFF",
              textColor: "#000000",
            }}
            style={{
              width: "100%",
              height: 50,
              marginVertical: 30,
            }}
            onCardChange={(cardDetails) => {
              console.log("cardDetails", cardDetails);
              setCardDetails(cardDetails);
            }}
            onFocus={(focusedField) => {
              console.log("focusField", focusedField);
            }}
          />
          <Center>
            <Button
              isDisabled={!cardDetails?.complete}
              style={styles.button}
              onPress={handleAddFirstPaymentMethod}
            >
              <Text style={{ color: "white" }}>Save</Text>
            </Button>
          </Center>
        </Box>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "black",
    color: "white",
  },
});
