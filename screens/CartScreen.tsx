import { View, Text, Center, HStack, IconButton, Box } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import YourCart from "../components/YourCart";
import { useContext } from "react";
import { OrderContext } from "../context/OrderContext";

export default function CartScreen({ navigation }: any) {
  const handleGoBack = () => {
    navigation.goBack();
  };

  const context = useContext(OrderContext) as any;

  return (
    <View style={styles.container}>
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
          <Text>Checkout</Text>
        </HStack>
      </Center>
      <Box>
        <YourCart
          cartItems={context.ingredientsInCart}
          totalEstimatedPriceInDollars={context.totalEstimatedPriceInDollars}
        />
      </Box>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 40,
    paddingRight: 40,
  },
});
