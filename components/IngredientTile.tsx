import {
  Box,
  Text,
  Image,
  AspectRatio,
  IconButton,
  Flex,
  View,
} from "native-base";
import { StyleSheet } from "react-native";
import { OrderContext } from "../context/OrderContext";
import { useContext, useEffect } from "react";
import { AntDesign, Feather } from "@expo/vector-icons";

export default function IngredientTile({ ingredient }: { ingredient: any }) {
  const context = useContext(OrderContext) as any;

  const {removeFromCart,isIngredientInCart, addToCart } = context
  const isInCart = isIngredientInCart(ingredient.id);

  return (
    <Box style={styles.container}>
      <Box style={styles.iconSection}>
        {isInCart ? (
          <IconButton
            style={styles.iconButton}
            onPress={() => removeFromCart(ingredient.id) }
            variant="unstyled"
            _icon={{
              color: "#777777",
              as: AntDesign,
              name: "checkcircle",
            }}
          />
        ) : (
          <IconButton
            style={styles.iconButton}
            onPress={() => addToCart(ingredient) }
            variant="unstyled"
            _icon={{
              color: "#777777",
              as: AntDesign,
              name: "checkcircleo",
            }}
          />
        )}
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
    width: '100%',
  },
  iconButton: {
    height: '100%',
    alignSelf: "flex-end",
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
});
