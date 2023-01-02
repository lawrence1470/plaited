import { View, Text, Box, Image, HStack, ScrollView } from "native-base";
import { StyleSheet } from "react-native";
import { formatCurrency } from "react-native-format-currency";

export default function YourCart({
  cartItems,
  totalEstimatedPriceInDollars,
}: any) {
  const convertToDollars = (price: number) => {
    if (price === 0) {
      return "No price found";
    }
    const priceInDollars = (price / 100).toFixed(2);

    return formatCurrency({
      amount: Number(priceInDollars),
      code: "USD",
    })[0];
  };

  return (
    <Box>
      <ScrollView>
        {cartItems.map((item: any, index: number) => {
          return (
            <Box>
              <HStack alignItems="center" justifyContent="space-between">
                <Image
                  source={{
                    uri:
                      "https://spoonacular.com/cdn/ingredients_100x100/" +
                      item.image,
                  }}
                  alt="ingredient image"
                  size="xs"
                />
                <Text key={index}>{item.name}</Text>
                <Text>{convertToDollars(item?.estimatedCost?.value || 0)}</Text>
              </HStack>
            </Box>
          );
        })}
      </ScrollView>
      <HStack>
        <Text>Total: {totalEstimatedPriceInDollars}</Text>
      </HStack>
    </Box>
  );
}

const styles = StyleSheet.create({});
