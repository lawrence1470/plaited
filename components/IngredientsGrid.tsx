import { AspectRatio, Box, Button, Center, IconButton, Image, ScrollView, Spinner, Text } from "native-base";
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
      style={styles.gridView}
      maxItemsPerRow={2}
      spacing={20}
      renderItem={({ item }) => (
        <IngredientTile ingredient={item} key={item.id} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  gridView: {
    // flex: 1,
  },
  container: {
    paddingLeft: 20,
    paddingRight: 20,
  },
});


// <>
//   <Box
//     style={styles.container}
//     rounded="lg"
//     overflow="hidden"
//     borderColor="coolGray.200"
//     borderWidth="1"
//   >
//     <Box style={styles.iconButtonContainer}>
//       {isInCart ? (
//         <IconButton
//           style={styles.iconButton}
//           onPress={() => context.removeFromCart(ingredient.id)}
//           variant="unstyled"
//           _icon={{
//             color: "#777777",
//             as: AntDesign,
//             name: "checkcircle",
//           }}
//         />
//       ) : (
//         <IconButton
//           style={styles.iconButton}
//           onPress={() => context.addToCart(ingredient)}
//           colorScheme="black"
//           variant="unstyled"
//           _icon={{
//             as: AntDesign,
//             name: "checkcircleo",
//           }}
//         />
//       )}
//     </Box>
//     <Box>
//       <AspectRatio w="100%" ratio={16 / 9}>
//         <Image
//           source={{
//             uri:
//               "https://spoonacular.com/cdn/ingredients_100x100/" +
//               ingredient.image,
//           }}
//           alt="image"
//         />
//       </AspectRatio>
//     </Box>
//     <Text>{ingredient.original}</Text>
//   </Box>
// </>
