import {
  View,
  Text,
  Center,
  Input,
  Button,
  Flex,
  VStack,
  Spinner,
} from "native-base";
import { StyleSheet } from "react-native";
import { useState } from "react";
import Toast from "react-native-toast-message";
import axios from "axios";
import { SUPABASE_EDGE_FUNCTION_URL, SUPABASE_ANON_KEY } from "@env";
import Constants from 'expo-constants';


export default function DiscoverSearch({ navigation }: any) {
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");

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
          <Center>
            <Text fontSize="4xl" bold>
              Plaited
            </Text>
          </Center>

          <Center>
            <Text fontSize="4xl" bold>
              What do you want to cook?
            </Text>
          </Center>

          <VStack space={5}>
            <Input
              onChangeText={handleUserInput}
              variant="rounded"
              size="2xl"
              placeholder="try 'pasta and meatballs'"
              w="100%"
            />
            <Button
              isDisabled={userInput.length === 0}
              onPress={handleSearch}
              style={styles.searchButton}
            >
              <Text fontSize="xl" style={styles.searchButtonText}>
                Search
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
    marginTop: Constants.statusBarHeight,
    paddingLeft: 20,
    paddingRight: 20,
  },
  searchButton: {
    backgroundColor: "black",
  },
  searchButtonText: {
    color: "white",
  },
});
