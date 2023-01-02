import { Box, Text, Image, AspectRatio, IconButton } from "native-base";
import { StyleSheet } from "react-native";
import { OrderContext } from "../context/OrderContext";
import { useContext, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";

export default function IngredientTile({ ingredient }: { ingredient: any }) {
  const context = useContext(OrderContext) as any;

  const isInCart = context.isIngredientInCart(ingredient.id);

  return (
    <>
      <Box
        style={styles.container}
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
      >
        <Box style={styles.iconButtonContainer}>
          {isInCart ? (
            <IconButton
              style={styles.iconButton}
              onPress={() => context.removeFromCart(ingredient.id)}
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
              onPress={() => context.addToCart(ingredient)}
              colorScheme="black"
              variant="unstyled"
              _icon={{
                as: AntDesign,
                name: "checkcircleo",
              }}
            />
          )}
        </Box>
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image
              source={{
                uri:
                  "https://spoonacular.com/cdn/ingredients_100x100/" +
                  ingredient.image,
              }}
              alt="image"
            />
          </AspectRatio>
        </Box>
        <Text>{ingredient.original}</Text>
      </Box>
    </>
  );
}

const styles = StyleSheet.create({
  iconButtonContainer: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  iconButton: {
    backgroundColor: "white",
  },
  container: {
    borderRadius: 6,
    boxShadow: "0.5px 4px 12px rgba(0, 0, 0, 0.15)",
    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderStyle: "solid",
    justifyContent: "flex-end",
    padding: 5,
    flex: 1,
    height: 200,
  },
});
