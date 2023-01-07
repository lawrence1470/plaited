import {
  AspectRatio,
  Box,
  Button,
  Center,
  IconButton,
  Image,
  ScrollView,
  Spinner,
  Text,
} from "native-base";
import IngredientTile from "./IngredientTile";
import { StyleSheet, View } from "react-native";
import { FlatGrid } from "react-native-super-grid";
import { AntDesign } from "@expo/vector-icons";

export default function IngredientsGrid({
  ingredients,
}: {
  ingredients: any[];
}) {
  console.log(ingredients, "these are the ingredients");

  return (
    <FlatGrid
      itemDimension={0}
      data={ingredients}
      maxItemsPerRow={2}
      spacing={20}
      renderItem={({ item }) => (
        <IngredientTile ingredient={item} key={item.id} />
      )}
    />
  );
}

const styles = StyleSheet.create({

  container: {
    paddingLeft: 20,
    paddingRight: 20,
  },
});
