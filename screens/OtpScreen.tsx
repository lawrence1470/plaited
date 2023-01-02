import React, { useState, useContext } from "react";
import { SafeAreaView, StyleSheet, Button, Text } from "react-native";

import { checkVerification } from "../api/verify";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { supabase } from "../lib/supabase";
import { AuthContext } from "../App";
import AsyncStorage from '@react-native-async-storage/async-storage';

const OtpScreen = ({ route, navigation }: any) => {
  const { phoneNumber } = route.params;
  const [invalidCode, setInvalidCode] = useState(false);

  const context = useContext(AuthContext) as any;

  const handleAddPhoneNumber = async (phoneNumber: string) => {
    try {
      await AsyncStorage.setItem('@phone_number', phoneNumber)
      navigation.navigate("Gated");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <SafeAreaView style={styles.wrapper}>
      <Text style={styles.prompt}>Enter the code we sent you</Text>
      <Text style={styles.message}>
        {`Your phone (${phoneNumber}) will be used to protect your account each time you log in.`}
      </Text>
      <Button
        title="Edit Phone Number"
        onPress={() => navigation.replace("NewPhoneNumber")}
      />
      <OTPInputView
        style={{ width: "80%", height: 200 }}
        pinCount={6}
        autoFocusOnLoad
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled={(code) => {
          checkVerification(phoneNumber, code).then((success) => {
            // TODO put this back
            // if (!success) {
            //   setInvalidCode(true);
            //   return;
            // }
            handleAddPhoneNumber(phoneNumber);
          });
        }}
      />
      {invalidCode && <Text style={styles.error}>Incorrect code.</Text>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: "black",
    fontSize: 20,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  prompt: {
    fontSize: 24,
    paddingHorizontal: 30,
    paddingBottom: 20,
  },

  message: {
    fontSize: 16,
    paddingHorizontal: 30,
  },

  error: {
    color: "red",
  },
});

export default OtpScreen;
