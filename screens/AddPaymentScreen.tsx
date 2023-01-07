import { useEffect, useState, useContext } from "react";
import { usePaymentSheet, useStripe } from "@stripe/stripe-react-native";
import { HEROKU_BASE_URL } from "@env";
import { Button, View, Text } from "native-base";
import { Alert } from "react-native";
import axios from "axios";
import { supabase } from "../lib/supabase";
import { AuthContext } from "../App";

export default function AddPaymentScreen({ navigation }: any) {
  const [customerId, setCustomerId] = useState<null | string>(null);
  const { initPaymentSheet, presentPaymentSheet, loading } = usePaymentSheet();
  const context = useContext(AuthContext) as any;

  const getStripeId = async () => {
    const customerResponse = await supabase
      .from("profiles")
      .select("stripe_id")
      .eq("id", context.profile.id)
      .single();

    if (customerResponse.data) {
      return customerResponse.data.stripe_id;
    } else {
      return null;
    }
  };

  const fetchPaymentSheetParams = async () => {
    try {
      const response = await axios.post(`${HEROKU_BASE_URL}/payment-sheet`);
      const { setupIntent, ephemeralKey, customer, publishableKey } =
        await response.data;

      return {
        setupIntent,
        ephemeralKey,
        customer,
        publishableKey,
      };
    } catch (e) {
      console.log(e);
    }
  };

  const initializePaymentSheet = async () => {
    const { setupIntent, ephemeralKey, customer, publishableKey } =
      (await fetchPaymentSheetParams()) as any;

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Ducks, Inc.",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      setupIntentClientSecret: setupIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
    });

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
      return;
    }

    // setCustomerId(customer);
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    console.log(customerId, 'customer id')
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert("Success", "Your order is confirmed!");
    }
  };

  useEffect(() => {}, []);

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <View>
      <Button onPress={() => navigation.navigate("Main")}>
        <Text>Go back to main screen</Text>
      </Button>
      <Button disabled={!loading} onPress={openPaymentSheet}>
        <Text>Add payment</Text>
      </Button>
    </View>
  );
}
