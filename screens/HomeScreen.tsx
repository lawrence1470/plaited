import { View, Text, StyleSheet } from "react-native";
import Footer from "../components/Footer";
import { Box, Button, Center, Spinner } from "native-base";
import UserInput from "../components/UserInput";
import { HEROKU_BASE_URL } from "@env";
import axios from "axios";
import { useContext, useState } from "react";
import Toast from "react-native-toast-message";
import IngredientsGrid from "../components/IngredientsGrid";
import { Col, Row, Grid } from "react-native-easy-grid";
import { OrderContext } from "../context/OrderContext";
import OrderSummary from "../components/OrderSummary";

export default function HomeScreen({ navigation }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [instructions, setInstructions] = useState<string[]>([]);
  const [textAreaValue, setTextAreaValue] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const context = useContext(OrderContext) as any;

  const clearIngredients = () => {
    setIsSuccess(false);
    context.clearCart();
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post(`${HEROKU_BASE_URL}/generateRecipe`, {
        name: textAreaValue,
      });

      if (response.data.success) {
        const recipe = response.data;
        setInstructions(recipe.instructions);
        setIsSuccess(true);
        context.setIngredientsInCart(recipe.ingredients);
      } else {
        Toast.show({
          type: "error",
          text1: "something went wrong",
          text2: "Could not find any recipes please try again",
        });
      }
    } catch (error) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: "something went wrong",
        text2: "This is some something 👋",
      });
    }
    setIsLoading(false);
  };

  const handleChange = (value: any) => {
    setTextAreaValue(value);
  };

  return (
    <View style={styles.container}>
      <Box style={styles.content}>
        {!isSuccess && (
          <Box>
            <UserInput
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              isDisabled={isLoading || instructions.length > 0}
              onChange={handleChange}
              textAreaValue={textAreaValue}
            />
          </Box>
        )}
      </Box>

      {isSuccess && (
        <Box style={styles.orderSummary}>
          <OrderSummary
            navigation={navigation}
            clearIngredients={clearIngredients}
          />
        </Box>
      )}

      <Box style={styles.footer}>
        <Footer />
      </Box>
      <Toast />
      {isLoading && <Spinner color="emerald.500" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    flex: 5,
  },
  orderSummary: {
    flex: 1,
    backgroundColor: "white",
  },
  footer: {
    backgroundColor: "blue",
  },
});
