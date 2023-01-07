import Footer from "../components/Footer";
import DiscoverSearch from "../screens/DiscoverSearch";
import DiscoverResults from "../screens/DiscoverResults";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const DiscoverStack = createNativeStackNavigator();

export default function DiscoverNavigation() {
  return (
    <DiscoverStack.Navigator screenOptions={{ headerShown: false }}>
      <DiscoverStack.Screen name="Search" component={DiscoverSearch} />
      <DiscoverStack.Screen name="Results" component={DiscoverResults} />
    </DiscoverStack.Navigator>
  );
}
