import React from "react";
import { FormControl, Input, Stack, WarningOutlineIcon, Box, Center, NativeBaseProvider } from "native-base";

export default function UserInput() {
  return (
    <Box alignItems="center">
      <Box w="100%" maxWidth="300px">
        <FormControl isRequired>
          <Stack mx="4">
            <FormControl.Label>Recipe</FormControl.Label>
            <Input defaultValue="pasta alfredo" placeholder="Recipe Name" />
            <FormControl.HelperText>
              Type in a recipe name
            </FormControl.HelperText>
          </Stack>
        </FormControl>
      </Box>
    </Box>
  );
};
