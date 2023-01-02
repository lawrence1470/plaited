import { Box, Button, Center, ScrollView, Spinner, Text } from "native-base";
import IngredientTile from "./IngredientTile";
import { FlatList, StyleSheet, View, Dimensions } from "react-native";
import { FlatGrid } from "react-native-super-grid";

export default function IngredientsGrid({
  ingredients,
}: {
  ingredients: any[];
}) {

  return (
    <View>
      <Center style={styles.container}>
        <FlatGrid
          itemDimension={50}
          data={ingredients}
          style={styles.gridView}
          maxItemsPerRow={2}
          spacing={10}
          renderItem={({ item }) => (
            <IngredientTile ingredient={item} key={item.id} />
          )}
        />
      </Center>
    </View>
  );
}

const styles = StyleSheet.create({
  gridView: {
    flex: 1,
  },
  container: {
    paddingLeft: 20,
    paddingRight: 20,
  },
});
