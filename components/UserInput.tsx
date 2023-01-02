import React from "react";
import {
  FormControl,
  Input,
  Stack,
  WarningOutlineIcon,
  Box,
  Center,
  NativeBaseProvider,
  TextArea,
} from "native-base";

export default function UserInput({
  isDisabled,
  onChange,
  textAreaValue,
}: {
  isDisabled: boolean;
  onChange: (x: string) => void;
  textAreaValue: string;
}) {
  return (
    <Box alignItems="center" w="100%">
      <TextArea
        value={textAreaValue}
        onChangeText={onChange}
        h={10}
        placeholder="Text Area Placeholder"
        w="75%"
        maxW="300"
        autoCompleteType={undefined}
      />
    </Box>
  );
}
