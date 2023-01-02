import { View, Text, Center, HStack, IconButton } from "native-base";
import { Ionicons } from "@expo/vector-icons";

export default function AddPaymentScreen({navigation}: any) {
  const handleGoBack = () => {
    navigation.navigate('Main', { screen: 'Cart' });
  };
  return (
    <View>
      <Center>
        <HStack alignItems="center">
          <IconButton
            colorScheme="black"
            variant="unstyled"
            onPress={() => handleGoBack()}
            _icon={{
              as: Ionicons,
              name: "chevron-back",
            }}
          />
          <Text>Payment</Text>
        </HStack>
      </Center>
    </View>
  );
}
