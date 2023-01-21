import { HStack, IconButton, Text, View, Flex, Box } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { LayoutChangeEvent, StyleSheet } from "react-native";
import Constants from "expo-constants";

export default function SimpleHeader({
  handleGoBack,
  title
}: {
  handleGoBack: () => void;
  title: string
}) {
  return (
    <Box style={styles.headerContainer}>
      <IconButton
        style={styles.backButton}
        colorScheme="black"
        variant="unstyled"
        onPress={handleGoBack}
        _icon={{
          as: Ionicons,
          name: "chevron-back",
        }}
      />
      <Text style={styles.headerText} bold fontSize="4xl">
        {title}
      </Text>
    </Box>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    position: "relative",
    paddingTop: 8,
    // paddingBottom: 8,
  },
  backButton: {
    position: "absolute",
    height: 10,
    left: 0,
    top: "50%",
    zIndex: 1,
  },
  headerText: {
    textAlign: "center",
    fontFamily: "PlayfairDisplay_600SemiBold",
  },
});
