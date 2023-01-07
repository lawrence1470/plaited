import { View, Text, Button } from "native-base";
import IngredientsGrid from "../components/IngredientsGrid";
import { StyleSheet } from "react-native";
import RecipeInstructions from "../components/RecipeInstructions";

export default function DiscoverResults({ route, navigation }: any) {
  const { recipe } = route.params;

  return (
    <View style={styles.container}>
      <RecipeInstructions instructions={recipe.instructions} />
      <IngredientsGrid ingredients={recipe.ingredients} />
      <Button onPress={() => navigation.goBack()}>Go back</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "white",
  },
});
