import React, { useContext } from "react";
import { SafeAreaView, StyleSheet, Button, View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../App";
import { supabase } from "../lib/supabase";

const GatedScreen = ({ navigation }: any) => {
  const context = useContext(AuthContext) as any;

  const handleFinish = async () => {
    try {
      const address = await AsyncStorage.getItem("@address");
      const phoneNumber = await AsyncStorage.getItem("@phone_number");

      await supabase
        .from("addresses")
        .insert({ full_address: address, id: context.profile.id });

      await supabase
        .from("profiles")
        .update({ is_onboarding_done: true, phone_number: phoneNumber })
        .eq("id", context.profile.id);


      context.setStep("Main");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <SafeAreaView style={styles.wrapper}>
      <View>
        <Text>Successfully registered!</Text>
      </View>
      <Button title="Finish registration" onPress={handleFinish} />
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
