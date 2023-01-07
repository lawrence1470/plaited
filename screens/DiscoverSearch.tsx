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
import { HEROKU_BASE_URL } from "@env";

export default function DiscoverSearch({ navigation }: any) {
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");

  const handleSearch = async () => {
    setLoading(true);

    try {
      const response = await axios.post(`${HEROKU_BASE_URL}/createRecipe`, {
        input: userInput,
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
      Toast.show({
        type: "error",
        text1: "something went wrong",
        text2: "This is some something 👋",
      });
    }
    setLoading(false);
  };

  const handleUserInput = (value: string) => {
    setUserInput(value);
  };

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
