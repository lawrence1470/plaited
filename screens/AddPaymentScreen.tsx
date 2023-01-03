import { useEffect, useState } from "react";
import { usePaymentSheet, useStripe } from "@stripe/stripe-react-native";
import { HEROKU_BASE_URL } from "@env";
import { Button, View, Text } from "native-base";
import {Alert} from "react-native";

export default function AddPaymentScreen({ navigation }: any) {
  const { initPaymentSheet, presentPaymentSheet, loading } = usePaymentSheet();

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`${HEROKU_BASE_URL}/payment-sheet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { setupIntent, ephemeralKey, customer, publishableKey} = await response.json();

    return {
      setupIntent,
      ephemeralKey,
      customer,
      publishableKey
    };
  };

  const initializePaymentSheet = async () => {
    const {
      setupIntent,
      ephemeralKey,
      customer,
      publishableKey,
    } = await fetchPaymentSheetParams() as any;

    console.log("setupIntent", setupIntent)

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
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <View>
      <Button onPress={() => navigation.navigate('Main')}>
        <Text>Go back to main screen</Text>
      </Button>
      <Button
        // disabled={!loading}
        onPress={openPaymentSheet}
      >
        <Text>Add payment</Text>
      </Button>
    </View>
  );
}
