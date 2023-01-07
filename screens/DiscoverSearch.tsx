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
import { SetStateAction, useState } from "react";
import Toast from "react-native-toast-message";
import axios from "axios/index";
import { SUPABASE_EDGE_FUNCTION_URL, SUPABASE_ANON_KEY } from "@env";

export default function DiscoverSearch({ navigation }: any) {
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");

  async function handleSearch() {
    setLoading(true);

    try {
      const response = await axios({
        method: "post",
        url: "https://prgckignrovsokkjhffr.functions.supabase.co/generateRecipe",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByZ2NraWducm92c29ra2poZmZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzE4MjY1NzgsImV4cCI6MTk4NzQwMjU3OH0.mYYretwwAh1cNrjMZwISd1jrSQVqKTicCcASH9hImpI",
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

  async function handlePress() {
    setLoading(true);
    const response = await axios.post(
      `https://prgckignrovsokkjhffr.functions.supabase.co/hello`,
      {
        name: "chicken",
      },
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByZ2NraWducm92c29ra2poZmZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzE4MjY1NzgsImV4cCI6MTk4NzQwMjU3OH0.mYYretwwAh1cNrjMZwISd1jrSQVqKTicCcASH9hImpI`,
        },
      }
    );
    setLoading(false);
    console.log(response.data);
  }

  return (
    <View style={styles.container}>
      <Button onPress={handlePress}>
        <Text>test</Text>
      </Button>
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
