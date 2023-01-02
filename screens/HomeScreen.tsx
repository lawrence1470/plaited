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
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [instructions, setInstructions] = useState<string[]>([]);
  const [nothingFound, setNothingFound] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState("");
  const context = useContext(OrderContext) as any;

  const handleClearTextArea = () => {
    setTextAreaValue("");
    context.clearCart();
    setIngredients([]);
  }


  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post(`${HEROKU_BASE_URL}/recipe`, {
        name: textAreaValue,
      });

      if (response.data.success) {
        const recipe = response.data.recipe;
        setInstructions(recipe.instructions);
        setIngredients(recipe.ingredients);
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
        <Box>
          <UserInput
            isDisabled={isLoading || instructions.length > 0}
            onChange={handleChange}
            textAreaValue={textAreaValue}
          />

          {isLoading && <Spinner color="emerald.500" />}
        </Box>

        <Center>
          <Button isDisabled={isLoading} onPress={handleSubmit}>
            Submit
          </Button>
        </Center>

        <Box>
          {nothingFound ? (
            <Center>
              <Text>Nothing was found try again</Text>
            </Center>
          ) : ingredients.length > 0 ? (
            <Center>
              <IngredientsGrid ingredients={ingredients} />
            </Center>
          ) : (
            <Center>
              <Text> Start searching</Text>
            </Center>
          )}
        </Box>
      </Box>
      {ingredients.length > 0 && (
        <Box style={styles.orderSummary}>
          <OrderSummary navigation={navigation} />
        </Box>
      )}

      <Box style={styles.footer}>
        <Footer />
      </Box>
      <Toast />
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
