// import { useEffect, useState } from "react";
// import { useStripe } from "@stripe/stripe-react-native";
// import { HEROKU_BASE_URL } from "@env";
// import { Button, View, Text } from "native-base";
// import {Alert} from "react-native";
//
// export default function CheckoutScreen() {
//   const { initPaymentSheet, presentPaymentSheet } = useStripe();
//   const [loading, setLoading] = useState(false);
//
//   const fetchPaymentSheetParams = async () => {
//     const response = await fetch(`${HEROKU_BASE_URL}/payment-sheet`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     const { paymentIntent, ephemeralKey, customer} = await response.json();
//
//     return {
//       paymentIntent,
//       ephemeralKey,
//       customer,
//     };
//   };
//
//   const initializePaymentSheet = async () => {
//     const {
//       paymentIntent,
//       ephemeralKey,
//       customer,
//       publishableKey,
//     } = await fetchPaymentSheetParams() as any;
//
//     const { error } = await initPaymentSheet({
//       merchantDisplayName: "Example, Inc.",
//       customerId: customer,
//       customerEphemeralKeySecret: ephemeralKey,
//       paymentIntentClientSecret: paymentIntent,
//       // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
//       //methods that complete payment after a delay, like SEPA Debit and Sofort.
//       allowsDelayedPaymentMethods: true,
//       defaultBillingDetails: {
//         name: 'Jane Doe',
//       }
//     });
//     debugger
//     if (!error) {
//       setLoading(true);
//     }
//   };
//
//   const openPaymentSheet = async () => {
//     const { error } = await presentPaymentSheet();
//
//     if (error) {
//       Alert.alert(`Error code: ${error.code}`, error.message);
//     } else {
//       Alert.alert('Success', 'Your order is confirmed!');
//     }
//   };
//
//   useEffect(() => {
//     initializePaymentSheet();
//   }, []);
//
//   return (
//     <View>
//       <Button
//         variant="primary"
//         disabled={!loading}
//
//         onPress={openPaymentSheet}
//       >
//         <Text>Add payment info</Text>
//       </Button>
//     </View>
//   );
// }
