
import {View, Text} from "react-native";
import { Button, Pressable } from "native-base";

export default function ApprovedAddressScreen({navigation }:any) {


  const handleClick = () => {
    navigation.navigate("NewPhoneNumber")

  }

  return (
    <View>
      <Text>Your address can be serviced</Text>

      <Button  onPress={handleClick}>
        Continue
      </Button>
    </View>
  )
}
