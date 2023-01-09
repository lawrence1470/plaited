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
} from "native-base";
import { useState } from "react";
import Collapsible from "react-native-collapsible";
import { StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function RecipeInstructions({ instructions }) {
  const [collapsed, setCollapsed] = useState(true);

  function handleToggle() {
    setCollapsed(!collapsed);
  }

  return (
    <View>
      <View
        style={styles.instructionsContainer}
        stickyHeaderIndices={[0]}
      >
        <Box style={styles.headerText}>
          <Center>
            <Text bold fontSize="xl">
              Here's how to make it
            </Text>
          </Center>
        </Box>
        <Collapsible
          style={styles.collpaseContainer}
          duration={400}
          collapsedHeight={65}
          collapsed={collapsed}
          renderChildrenCollapsed={true}
        >
          <FlatList
            showsVerticalScrollIndicator ={false}
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
  instructionsContainer: {
    position: "relative",
    marginTop: 20,
    backgroundColor: "white",
    paddingLeft: 20,
    paddingRight: 40,
    borderWidth: "1px solid",
    borderColor: "#C4C4C4",
    borderRadius: 6,
  },
  stepNumber: {},
  headerText: {
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: "white",
  },
  footer: {
    // height: 40,
    alignSelf: "flex-end",
    position: "absolute",
    bottom: 0,
  },
});
