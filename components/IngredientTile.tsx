import { Box, Text, Image, AspectRatio, IconButton, Flex , View} from "native-base";
import { StyleSheet } from "react-native";
import { OrderContext } from "../context/OrderContext";
import { useContext, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";

export default function IngredientTile({ ingredient }: { ingredient: any }) {
  const context = useContext(OrderContext) as any;

  const isInCart = context.isIngredientInCart(ingredient.id);

  return (
    <Box style={styles.container}>
      <Box style={styles.iconSection}>
        <Text>Icon</Text>
      </Box>
      <Box style={styles.imageContainer}>
        <View style={styles.imageWrapper}>
          <Image
            style={styles.image}
            source={{
              uri:
                "https://spoonacular.com/cdn/ingredients_100x100/" +
                ingredient.image,
            }}
            alt="ingredient image"
          />
        </View>
      </Box>
      <Box style={styles.infoSection}>
        <Text bold fontSize="xs">
          $1.99
        </Text>
        <Text fontSize="xs">{ingredient.name}</Text>
        <Text fontSize="xs">{ingredient.amount + " " + ingredient.unit}</Text>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    height: 200,
    padding: 8,
    borderRadius: 6,
  },
  iconSection: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor: "#D9D9D9",
    borderRadius: 20,
  },
  imageContainer: {
    flex: 3,
    paddingRight: 16,
    paddingLeft: 16,
  },
  imageWrapper: {
    width: "100%",
    height: "100%",
    backgroundColor: "#D9D9D9",
    padding: 8,
    borderRadius: 20,
  },
  infoSection: {
    flex: 2,
    paddingTop: 8,
    paddingBottom: 8,
  },

  // iconButtonContainer: {
  //   position: "absolute",
  //   top: 0,
  //   right: 0,
  // },
  // iconButton: {
  //   backgroundColor: "white",
  // },
  // container: {
  //   borderRadius: 6,
  //   boxShadow: "0.5px 4px 12px rgba(0, 0, 0, 0.15)",
  //   backgroundColor: "#F5F5F5",
  //   borderWidth: 1,
  //   borderStyle: "solid",
  //   justifyContent: "flex-end",
  //   padding: 5,
  //   flex: 1,
  //   height: 200,
  // },
});
