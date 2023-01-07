import React from "react";
import { Box, Center, TextArea, Text, VStack, Button } from "native-base";
import { StyleSheet } from "react-native";

export default function UserInput({
  onChange,
  textAreaValue,
  isLoading,
  handleSubmit,
}: {
  isDisabled: boolean;
  onChange: (x: string) => void;
  textAreaValue: string;
  isLoading: boolean;
  handleSubmit: () => void;
}) {
  return (
    <Center style={styles.container}>
      <VStack alignItems="center" w="100%" style={styles.container}>
        <Box style={styles.logoContainer}>
          <Text bold fontSize="4xl">
            Plaited
          </Text>
        </Box>
        <Text bold fontSize="4xl">
          What do you want to cook?
        </Text>
        <TextArea
          value={textAreaValue}
          onChangeText={onChange}
          h={40}
          placeholder="Text Area Placeholder"
          w="100%"
          maxW="300"
          autoCompleteType={undefined}
        />
        <Button
          style={styles.submitButton}
          isDisabled={isLoading}
          onPress={handleSubmit}
        >
          Submit
        </Button>
      </VStack>
    </Center>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  logoContainer: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  submitButton: {
    backgroundColor: "black",
    marginTop: 10,
    width: "100%",
  },
});
