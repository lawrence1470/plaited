import {
  Box,
  Button,
  Center,
  HStack,
  IconButton,
  ScrollView,
  Spinner,
  Text,
  VStack,
} from "native-base";
import IngredientTile from "./IngredientTile";
import { FlatList, StyleSheet, View, Dimensions } from "react-native";
import { FlatGrid } from "react-native-super-grid";
import { useContext } from "react";
import { OrderContext } from "../context/OrderContext";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export default function OrderSummary({ navigation, clearIngredients }: any) {
  const context = useContext(OrderContext) as any;

  const handleCartPress = () => {
    navigation.navigate("Cart");
  };

  return (
    <HStack style={styles.container} space={3} justifyContent="center">
      <Box style={styles.orderTotal}>
        <VStack>
          <Text>Estimated Order Total</Text>
          <Text>{context.totalEstimatedPriceInDollars}</Text>
        </VStack>
      </Box>
      <Box style={styles.buttonContainer}>
        <HStack alignItems="center" justifyContent="center" space={3}>
          <IconButton
            style={styles.iconButton}
            onPress={() => handleCartPress()}
            variant="unstyled"
            _icon={{
              color: "#777777",
              as: Entypo,
              name: "shopping-cart",
            }}
          />
          <IconButton
            style={styles.iconButton}
            // onPress={() => context.removeFromCart(ingredient.id)}
            variant="unstyled"
            _icon={{
              color: "#777777",
              as: Feather,
              name: "refresh-ccw",
            }}
          />
          <IconButton
            style={styles.iconButton}
            onPress={() => clearIngredients()}
            variant="unstyled"
            _icon={{
              color: "#777777",
              as: Feather,
              name: "trash-2",
            }}
          />
        </HStack>
      </Box>
    </HStack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  orderTotal: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  iconButton: {
    backgroundColor: "#303030",
    borderRadius: 50,
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  box: {
    backgroundColor: "green",
    flex: 1,
  },
});
