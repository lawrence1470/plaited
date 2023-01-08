import { View, Text, Center, HStack, IconButton, Box } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import YourCart from "../components/YourCart";
import { useContext } from "react";
import { OrderContext } from "../context/OrderContext";
import Constants from "expo-constants";
import SimpleHeader from "../components/widgets/SimpleHeader";

export default function CartScreen({ route, navigation }: any) {
  function handleGoBack() {
    navigation.goBack();
  }

  const context = useContext(OrderContext) as any;

  const { cartItems } = route.params;

  return (
    <>
      <View style={styles.container}>
        <SimpleHeader handleGoBack={handleGoBack} />
        <Box style={styles.content}>
          <YourCart
            cartItems={cartItems}
            totalEstimatedPriceInDollars={context.totalEstimatedPriceInDollars}
          />
        </Box>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'white',
  },
  content: {
    flex: 4,
  }
});
