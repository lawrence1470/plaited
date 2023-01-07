import { View, Text, Button, ScrollView, Box, Spinner } from "native-base";
import IngredientsGrid from "../components/IngredientsGrid";
import { StyleSheet } from "react-native";
import RecipeInstructions from "../components/RecipeInstructions";
import OrderSummary from "../components/OrderSummary";
import { useEffect, useContext, useState } from "react";
import { OrderContext } from "../context/OrderContext";
import Toast from "react-native-toast-message";
import { SUPABASE_ANON_KEY, SUPABASE_EDGE_FUNCTION_URL } from "@env";
import axios from "axios";

export default function DiscoverResults({ route, navigation }: any) {
  const { recipe } = route.params;
  const [loading, setLoading] = useState(false);
  const context = useContext(OrderContext) as any;

  useEffect(() => {
    context.setRecipeId(recipe.id);
    context.setIngredientsInCart(recipe.ingredients);
  }, []);

  console.log(recipe, "elloo");

  async function fetchSimilarRecipe() {
    setLoading(true);
    try {
      const response = await axios({
        method: "post",
        url: `${SUPABASE_EDGE_FUNCTION_URL}/similarRecipe`,
        headers: {
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
        },
        data: { recipeId: recipe.id },
      });
      if (response.data.success) {
        const { recipe } = response.data;
        navigation.navigate("Discover", {
          screen: "Results",
          params: { recipe },
        });
      } else {
        throw new Error("Could not find any recipes please try again");
      }
    } catch (error) {
      console.error(error, "this is the error");

      Toast.show({
        type: "error",
        text1: "something went wrong",
        text2: "This is some something 👋",
      });
    }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      {!loading ? (
        <>
          <Box style={styles.instructionsContainer}>
            <RecipeInstructions instructions={recipe.instructions} />
          </Box>
          <Box style={styles.ingredientsContainer}>
            {/*<ScrollView>*/}
            <IngredientsGrid ingredients={recipe.ingredients} />
            {/*</ScrollView>*/}
          </Box>

          <OrderSummary fetchSimilarRecipe={fetchSimilarRecipe} />
        </>
      ) : (
        <>
          <Spinner />
        </>
      )}
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "white",
  },
  instructionsContainer: {},
  ingredientsContainer: {
    flex: 1,
  },
});
