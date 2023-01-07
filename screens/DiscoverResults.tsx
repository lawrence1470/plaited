import { View, Text, Button, ScrollView, Box } from "native-base";
import IngredientsGrid from "../components/IngredientsGrid";
import { StyleSheet } from "react-native";
import RecipeInstructions from "../components/RecipeInstructions";
import OrderSummary from "../components/OrderSummary";

export default function DiscoverResults({ route, navigation }: any) {
  const { recipe } = route.params;

  return (
    <View style={styles.container}>
      <Box style={styles.instructionsContainer}>
        <RecipeInstructions instructions={recipe.instructions} />
      </Box>
      <Box style={styles.ingredientsContainer}>
        {/*<ScrollView>*/}
          <IngredientsGrid ingredients={recipe.ingredients} />
        {/*</ScrollView>*/}
      </Box>

      <OrderSummary />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex  : 1,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "white",
  },
  instructionsContainer: {
  },
  ingredientsContainer: {
    flex: 1,
  },
});
