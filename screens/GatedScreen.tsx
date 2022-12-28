import React from "react";
import { SafeAreaView, StyleSheet, Button, View, Text } from "react-native";

const GatedScreen = ({ navigation }:any) => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <View>
        <Text>Successfully registered!</Text>
      </View>
      <Button
        title="Start over"
        onPress={() => navigation.replace("PhoneNumber")}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GatedScreen;
