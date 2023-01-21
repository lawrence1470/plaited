import { Box, Text, Image, IconButton, View, Pressable } from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
import { OrderContext } from "../context/OrderContext";
import { useContext } from "react";
import { AntDesign } from "@expo/vector-icons";
import * as Haptics from 'expo-haptics';



export default function IngredientTile({ ingredient }: { ingredient: any }) {
  const context = useContext(OrderContext) as any;

  const { removeFromCart, isIngredientInCart, addToCart } = context;
  const isInCart = isIngredientInCart(ingredient.id);

  function handlePress() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    if (isInCart) {
      removeFromCart(ingredient.id);
    } else {
      addToCart(ingredient);
    }
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Box style={styles.iconSection}>
        {isInCart ? (
          <IconButton
            style={styles.iconButton}
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
            onPress={() => addToCart(ingredient)}
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
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: 200,
    padding: 8,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  iconSection: {
    flex: 1,
    width: "100%",
  },
  iconButton: {
    height: "100%",
    alignSelf: "flex-end",
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor: "#D9D9D9",
  },
  imageContainer: {
    flex: 3,
    paddingRight: 16,
    paddingLeft: 16,
  },
  imageWrapper: {
    width: "100%",
    height: "100%",
    padding: 8,
    borderRadius: 20,
  },
  infoSection: {
    flex: 2,
    paddingTop: 8,
    paddingBottom: 8,
  },
});
