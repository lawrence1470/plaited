import {
  View,
  Text,
  Center,
  Input,
  Button,
  Flex,
  VStack,
  FormControl,
  Spinner,
  Box,
} from "native-base";
import { StyleSheet } from "react-native";
import { useState } from "react";
import Toast from "react-native-toast-message";
import axios from "axios";
import { SUPABASE_EDGE_FUNCTION_URL, SUPABASE_ANON_KEY } from "@env";
import Constants from "expo-constants";
import { DietaryPreferences } from "../components/DietaryPreferences";

export default function DiscoverSearch({ navigation }: any) {
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");

  const [dietaryPreferences, setDietaryPreferences] = useState([]);

  async function handleSearch() {
    setLoading(true);

    try {
      const response = await axios({
        method: "post",
        url: `${SUPABASE_EDGE_FUNCTION_URL}/generateRecipe`,
        headers: {
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
        },
        data: { input: userInput },
      });

      if (response.data.success) {
        const { recipe } = response.data;
        navigation.navigate("Discover", {
          screen: "Results",
          params: { recipe },
        });
      } else {
        throw new Error("Could not find any recipes please try again");
      }
    } catch (error) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: "something went wrong",
        text2: "This is some something 👋",
      });
    }
    setLoading(false);
  }

  function handleUserInput(value: string) {
    setUserInput(value);
  }

  return (
    <View style={styles.container}>
      {!loading ? (
        <>
          <Center style={styles.headerContainer}>
            <Text style={styles.headerText} fontSize="3xl" bold>
              What would you
            </Text>

            <Text style={styles.headerText} fontSize="3xl" bold>
              like to
              <Text fontSize="3xl" style={styles.cook}> cook?</Text>
            </Text>
          </Center>

          <VStack space={5}>
            <FormControl w="100%">
              <Text style={styles.textLabel}>Dish Name</Text>
              <Input
                colorScheme="black"
                style={styles.textInput}
                variant="underlined"
                placeholder="Steak tacos"
                borderColor="black"
                onChangeText={handleUserInput}
              />
            </FormControl>

            <DietaryPreferences
              dietaryPreferences={dietaryPreferences}
              setDietaryPreferences={setDietaryPreferences}
            />
            <Button
              isDisabled={userInput.length === 0}
              onPress={handleSearch}
              style={styles.searchButton}
            >
              <Text fontSize="xl" style={styles.searchButtonText}>
                Let's go
              </Text>
            </Button>
          </VStack>
        </>
      ) : (
        <>
          <Spinner />
        </>
      )}
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#ffffff",
    paddingLeft: 20,
    paddingRight: 20,
  },
  headerContainer: {
    marginTop: Constants.statusBarHeight,
    marginBottom: 10,
  },
  searchButton: {
    backgroundColor: "black",
  },
  searchButtonText: {
    color: "white",
  },
  headerText: {
    fontFamily: "PlayfairDisplay_600SemiBold",
  },
  textInput: {},
  textLabel: {
    fontFamily: "Lato_700Bold",
    fontSize: 16,
    color: "black",
    marginBottom: 10,
  },
  cook: {
    fontFamily: "PlayfairDisplay_600SemiBold",
    color: "#2D7BA6"
  }
});
