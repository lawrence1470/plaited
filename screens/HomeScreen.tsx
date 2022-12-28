import { View, Text, StyleSheet } from "react-native";
import Footer from "../components/Footer";
import { Center, Box, VStack } from "native-base";
import UserInput from "../components/UserInput";

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Box style={styles.content}>
        <UserInput />
      </Box>
      <Box style={styles.footer}>
        <Footer />
      </Box>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
  },
  content: {
    flex: 1,
  },
  footer: {
    backgroundColor: "blue",
  },
});
