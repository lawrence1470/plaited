import React, { useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import { GOOGLE_PLACES_API_KEY } from "@env";
import { debounce } from "lodash";

export default function AddressAutocomplete() {
  const [searchKeyword, setSearchKeyword] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<any[]>([]);
  const [isShowingResults, setIsShowingResults] = React.useState(false);

  const searchLocation = async () => {
    try {
      const response = await axios.post(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${GOOGLE_PLACES_API_KEY}&input=${searchKeyword}`
      );

      setSearchResults(response.data.predictions);
      setIsShowingResults(true);
    } catch (error) {
      console.log(error);
    }
  };

  const implementSearch = useCallback(debounce(searchLocation, 1500), [
    searchKeyword,
  ]);

  const handleSearch = (text: string) => {
    setSearchKeyword(text);
    implementSearch();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.autocompleteContainer}>
        <TextInput
          placeholder="Search for an address"
          returnKeyType="search"
          style={styles.searchBox}
          placeholderTextColor="#000"
          onChangeText={(text) => handleSearch(text)}
          value={searchKeyword}
        />
        {isShowingResults && (
          <FlatList
            data={searchResults}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={styles.resultItem}
                  onPress={() => {
                    console.log(item, 'itemmmm')
                    setSearchKeyword(item.description);
                    setIsShowingResults(false);
                  }}
                >
                  <Text>{item.description}</Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item.id}
            style={styles.searchResultsContainer}
          />
        )}
      </View>
      <View style={styles.dummmy} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  autocompleteContainer: {
    zIndex: 1,
  },
  searchResultsContainer: {
    width: 340,
    height: 200,
    backgroundColor: "#fff",
    position: "absolute",
    top: 50,
  },
  dummmy: {
    width: 600,
    height: 200,
    backgroundColor: "hotpink",
    marginTop: 20,
  },
  resultItem: {
    width: "100%",
    justifyContent: "center",
    height: 40,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingLeft: 15,
  },
  searchBox: {
    width: 340,
    height: 50,
    fontSize: 18,
    borderRadius: 8,
    borderColor: "#aaa",
    color: "#000",
    backgroundColor: "#fff",
    borderWidth: 1.5,
    paddingLeft: 15,
  },
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    alignItems: "center",
  },
});
