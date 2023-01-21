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
  VStack,
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

  console.log(recipe.image, "hi");

  return (
    <View>
      <View style={styles.container} stickyHeaderIndices={[0]}>
        <Text style={styles.headerText} bold fontSize="xl">
          {recipe.title}
        </Text>
        <Box style={styles.imageWrapper}>
          <Image
            style={styles.image}
            source={{
              uri: recipe.image,
            }}
            alt="recipe image"
          />
        </Box>

        <Box style={styles.recipeInfo}>
          <HStack space={20}>
            <VStack>
              <Text style={styles.infoText}>RATING</Text>
              <Text style={styles.infoText}>TOTAL TIME</Text>
              <Text style={styles.infoText}>SERVINGS</Text>
            </VStack>
            <VStack>
              <Text style={styles.associatedInfoText}></Text>
              <Text style={styles.associatedInfoText}>30 min</Text>
              <Text style={styles.associatedInfoText}>2 servings</Text>
            </VStack>
          </HStack>
        </Box>

        {/*</Box>*/}
        {/*<FlatList*/}
        {/*  showsVerticalScrollIndicator={false}*/}
        {/*  data={instructions}*/}
        {/*  renderItem={({ item, index }) => (*/}
        {/*    <HStack key={index + item} style={styles.item}>*/}
        {/*      <Text bold fontSize="sm">*/}
        {/*        Step {index + 1}*/}
        {/*      </Text>*/}
        {/*      <Text>{item}</Text>*/}
        {/*    </HStack>*/}
        {/*  )}*/}
        {/*/>*/}
        {/*</Box>*/}
      </View>
      <Box style={styles.footer}>
        {/*{collapsed ? (*/}
        {/*  <IconButton*/}
        {/*    // style={styles.iconButton}*/}
        {/*    onPress={handleToggle}*/}
        {/*    colorScheme="black"*/}
        {/*    variant="unstyled"*/}
        {/*    _icon={{*/}
        {/*      as: Feather,*/}
        {/*      name: "arrow-down-right",*/}
        {/*    }}*/}
        {/*  />*/}
        {/*) : (*/}
        {/*  <IconButton*/}
        {/*    // style={styles.iconButton}*/}
        {/*    onPress={handleToggle}*/}
        {/*    colorScheme="black"*/}
        {/*    variant="unstyled"*/}
        {/*    _icon={{*/}
        {/*      as: Feather,*/}
        {/*      name: "arrow-up-left",*/}
        {/*    }}*/}
        {/*  />*/}
        {/*)}*/}
      </Box>
    </View>
  );
}

const styles = StyleSheet.create({
  recipeInfo: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: "left",
  },
  infoText: {
    textAlign: "left",
    color: "#7399AE",
    fontFamily: "Lato_400Regular",
  },
  associatedInfoText: {
    fontFamily: "Lato_400Regular",
  },
  container: {
    position: "relative",
    marginTop: 20,
    backgroundColor: "white",
    borderWidth: "1px solid",
    borderColor: "#C4C4C4",
    borderRadius: 10,
    height: 230,
  },
  imageWrapper: {
    width: "100%",
    height: 100,
  },
  headerText: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 8,
    paddingBottom: 8,
    fontFamily: "PlayfairDisplay_400Regular",
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    objectFit: "cover",
  },
  footer: {
    // height: 40,
    alignSelf: "flex-end",
    position: "absolute",
    bottom: 0,
  },
});
