import {
  Box,
  Button,
  ScrollView,
  Text,
  View,
  IconButton,
  FlatList,
  HStack,
  Center,
  Image,
} from "native-base";
import { useState } from "react";
import Collapsible from "react-native-collapsible";
import { StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function RecipeDetails({ recipe }) {
  const [collapsed, setCollapsed] = useState(true);

  function handleToggle() {
    setCollapsed(!collapsed);
  }

  const { instructions, ingredients } = recipe;

  console.log(recipe.image, 'hi')

  return (
    <View>
      <View style={styles.container} stickyHeaderIndices={[0]}>
        <Text style={styles.headerText} bold fontSize="xl">
          {recipe.title}
        </Text>
        <Collapsible
          style={styles.collpaseContainer}
          duration={400}
          collapsedHeight={150}
          collapsed={collapsed}
          renderChildrenCollapsed={true}
        >
          <View style={styles.imageWrapper}>
            <Image
              style={styles.image}
              source={{
                uri: recipe.image,
              }}
              alt="recipe image"
            />
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={instructions}
            renderItem={({ item, index }) => (
              <HStack key={index + item} style={styles.item}>
                <Text bold fontSize="sm">
                  Step {index + 1}
                </Text>
                <Text>{item}</Text>
              </HStack>
            )}
          />
        </Collapsible>
      </View>
      <Box style={styles.footer}>
        {collapsed ? (
          <IconButton
            // style={styles.iconButton}
            onPress={handleToggle}
            colorScheme="black"
            variant="unstyled"
            _icon={{
              as: Feather,
              name: "arrow-down-right",
            }}
          />
        ) : (
          <IconButton
            // style={styles.iconButton}
            onPress={handleToggle}
            colorScheme="black"
            variant="unstyled"
            _icon={{
              as: Feather,
              name: "arrow-up-left",
            }}
          />
        )}
      </Box>
    </View>
  );
}

const styles = StyleSheet.create({
  collpaseContainer: {
    maxHeight: 300,
  },
  container: {
    position: "relative",
    marginTop: 20,
    backgroundColor: "white",
    borderWidth: "1px solid",
    borderColor: "#C4C4C4",
    borderRadius: 6,
  },
  imageWrapper: {
    width: "100%",
    height: 100,
    backgroundColor: "#D9D9D9",
  },
  headerText: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: "white",
    fontFamily: "PlayfairDisplay_400Regular",
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    objectFit: "cover",
    backgroundColor: "#D9D9D9",
    borderRadius: 20,
  },
  footer: {
    // height: 40,
    alignSelf: "flex-end",
    position: "absolute",
    bottom: 0,
  },
});
