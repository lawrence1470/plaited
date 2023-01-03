import LocationScreen from "../screens/LocationScreen";
import ApprovedAddressScreen from "../screens/ApprovedAddressScreen";
import NotApprovedAddressScreen from "../screens/NotApprovedAddressScreen";
import NewPhoneNumberScreen from "../screens/NewPhoneNumberScreen";
import OtpScreen from "../screens/OtpScreen";
import GatedScreen from "../screens/GatedScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Registration = createNativeStackNavigator<any>() as any;

export default function RegistrationFlow() {
  return (
    <Registration.Navigator>
      <Registration.Screen name="Location" component={LocationScreen} />
      <Registration.Screen
        name="ApprovedAddress"
        component={ApprovedAddressScreen}
      />
      <Registration.Screen
        name="NotApprovedAddress"
        component={NotApprovedAddressScreen}
      />
      <Registration.Screen
        name="NewPhoneNumber"
        component={NewPhoneNumberScreen}
      />
      <Registration.Screen name="Otp" component={OtpScreen} />
      <Registration.Screen name="Gated" component={GatedScreen} />
    </Registration.Navigator>
  );
}
