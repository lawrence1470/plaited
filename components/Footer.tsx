import { Box, Text, Icon, HStack, Center, Pressable } from "native-base";
import { useState } from "react";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { View } from "react-native";

type IconProps = {
  [key: string]: {
    type: any;
    outline: string;
    filled: string;
  };
};

const icons: IconProps = {
  "home": {
    type: Ionicons,
    filled: "ios-home",
    outline: "ios-home-outline",
  },
  "cart": {
    type: Ionicons,
    filled: "cart",
    outline: "cart-outline",
  },
  "account": {
    type: Ionicons,
    filled: "person",
    outline: "person-outline",
  }
};

export default function Footer({ state, descriptors, navigation }: any) {
  const [selected, setSelected] = useState(0);

  return (
    <View>
      <HStack bg="indigo.600" alignItems="center" safeAreaBottom shadow={6}>
        {state &&
          state.routes.map((route: any, index: number) => {
            console.log(state, "state");
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
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

            const iconKey = icons[label.toLowerCase()]

            return (
              <Pressable
                opacity={selected === 0 ? 1 : 0.5}
                py="3"
                flex={1}
                onPress={onPress}
                onLongPress={onLongPress}
                key={index}
              >
                <Center>
                  <Icon
                    mb="1"
                    as={iconKey.type}
                    name={isFocused ? iconKey.filled : iconKey.outline}
                    color="white"
                    size="sm"
                  />
                  <Text color="white" fontSize="12">
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
