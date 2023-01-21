import Footer from "../components/Footer";
import HomeScreen from "../screens/HomeScreen";
import CartScreen from "../screens/CartScreen";
import AccountScreen from "../screens/AccountScreen";
import DiscoverNavigation from "./DiscoverNavigation";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "native-base";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName={"Discover"}
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <Footer {...props} />}
    >
      <Tab.Screen name="Orders" component={() => <Text>Orders</Text>} />
      <Tab.Screen name="Discover" component={DiscoverNavigation} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}
