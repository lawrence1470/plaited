import Footer from "../components/Footer";
import DiscoverSearch from "../screens/DiscoverSearch";
import DiscoverResults from "../screens/DiscoverResults";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrderContextProvider from "../context/OrderContext";

const DiscoverStack = createNativeStackNavigator();

export default function DiscoverNavigation() {
  return (
    <OrderContextProvider>
      <DiscoverStack.Navigator screenOptions={{ headerShown: false }}>
        <DiscoverStack.Screen name="Search" component={DiscoverSearch} />
        <DiscoverStack.Screen name="Results" component={DiscoverResults} />
      </DiscoverStack.Navigator>
    </OrderContextProvider>
  );
}
