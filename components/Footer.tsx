import { Box, Text, Icon, HStack, Center, Pressable } from "native-base";
import { useState } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { View, StyleSheet, Image } from "react-native";
import { PlateFilled, PlateOutline } from "../assets/icons/Plate";
import { OrdersFilled, OrdersOutline } from "../assets/icons/Orders";
import { AccountOutline, AccountFilled } from "../assets/icons/Account";
import * as Haptics from "expo-haptics";

type IconProps = {
  [key: string]: {
    type: any;
    outline: any;
    filled: any;
  };
};

const icons: IconProps = {
  discover: {
    type: Ionicons,
    filled: <PlateFilled />,
    outline: <PlateOutline />,
  },
  orders: {
    type: Ionicons,
    filled: <OrdersFilled />,
    outline: <OrdersOutline />,
  },
  account: {
    type: Ionicons,
    filled: <AccountFilled />,
    outline: <AccountOutline />,
  },
};

export default function Footer({ state, descriptors, navigation }: any) {
  const [selected, setSelected] = useState(0);

  return (
    <View>
      <HStack style={styles.container} bg="white" alignItems="center" safeAreaBottom shadow={6}>
        {state &&
          state.routes.map((route: any, index: number) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                // The `merge: true` option makes sure that the params inside the tab screen are preserved
                navigation.navigate({ name: route.name, merge: true });
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: "tabLongPress",
                target: route.key,
              });
            };

            const iconKey = icons[label.toLowerCase()];

            return (
              <Pressable
                opacity={isFocused ? 1 : 0.5}
                py="3"
                flex={1}
                onPress={onPress}
                onLongPress={onLongPress}
                key={index}
              >
                <Center>
                  {isFocused ? iconKey.filled : iconKey.outline}
                  {/*<Icon*/}
                  {/*  mb="1"*/}
                  {/*  as={iconKey.type}*/}
                  {/*  name={isFocused ? iconKey.filled : iconKey.outline}*/}
                  {/*  color="white"*/}
                  {/*  size="sm"*/}
                  {/*/>*/}
                  <Text color="black" fontSize="12">
                    {label}
                  </Text>
                </Center>
              </Pressable>
            );
          })}
      </HStack>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: 30,
    width: 30,
  },
  container: {

    elevation: 2,
  },
});
