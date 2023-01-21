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
  return (
    <FlatGrid
      data={ingredients}
      itemDimension={100}
      adjustGridToStyles={true}
      itemContainerStyle={styles.itemContainer}
      maxItemsPerRow={2}
      spacing={24}
      renderItem={({ item }) => (
        <IngredientTile ingredient={item} key={item.id} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingLeft: -10,
    // paddingRight: -10,
  },
  itemContainer: {
    // marginRight: 10,
  }
});
