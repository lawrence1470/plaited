import { Button, Text, View } from "native-base";


export default function AccountScreen({ navigation }: any) {

  const handlePayment = () => {
    // navigation.navigate("AddPayment");
    console.log('hello')
  }

  return (
    <View>
      <Text>Account Screen</Text>

      <Button onPress={handlePayment}>
        <Text>Add Payment</Text>
      </Button>
    </View>
  );
}
