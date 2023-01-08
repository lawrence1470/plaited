import "react-native-url-polyfill/auto";
import { useState, useEffect, createContext } from "react";
import { supabase } from "./lib/supabase";
import AuthScreen from "./screens/AuthScreen";
import LocationScreen from "./screens/LocationScreen";
import { Session } from "@supabase/supabase-js";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import { Profile } from "./lib/types";
import ApprovedAddressScreen from "./screens/ApprovedAddressScreen";
import NotApprovedAddressScreen from "./screens/NotApprovedAddressScreen";
import NewPhoneNumberScreen from "./screens/NewPhoneNumberScreen";
import OtpScreen from "./screens/OtpScreen";
import GatedScreen from "./screens/GatedScreen";
import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import OrderContextProvider from "./context/OrderContext";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Footer from "./components/Footer";
import { StripeProvider } from "@stripe/stripe-react-native";
import { STRIPE_PUBLISHABLE_KEY } from "@env";
import AddPaymentScreen from "./screens/AddPaymentScreen";
import AccountScreen from "./screens/AccountScreen";
import TabNavigation from "./navigation/TabNavigation";
import RegistrationFlow from "./navigation/RegistrationFlow";

const getProfie = async (session: Session) => {
  const userId = session.user.id;
  return await supabase.from("profiles").select().eq("id", userId).single();
};

// TODO get rid of any here
const Stack = createNativeStackNavigator<any>() as any;

export const AuthContext = createContext(null) as any;

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [step, setStep] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    if (session?.user.aud === "authenticated") {
      getProfie(session).then(({ data }) => {
        setProfile(data as Profile);
      });
    }
  }, [session]);

  const isDoneOnboarding = profile?.is_onboarding_done || false;

  return (
    <>
      <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
        <AuthContext.Provider value={{ session, profile, setStep }}>
          <NativeBaseProvider>
            {/*  {session?.user.aud !== "authenticated" ? (*/}
            {/*    <AuthScreen />*/}
            {/*  ) : (*/}
            <NavigationContainer>
              {/*      {!isDoneOnboarding ? (*/}
              {/*        <Stack.Navigator>*/}
              {/*          <Stack.Screen*/}
              {/*            name="Registration"*/}
              {/*            component={RegistrationFlow}*/}
              {/*          />*/}
              {/*        </Stack.Navigator>*/}
              {/*      ) : (*/}
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen
                  name="Main"
                  component={(props: JSX.IntrinsicAttributes) => (
                    <TabNavigation {...props} />
                  )}
                />
              </Stack.Navigator>
              {/*        )}*/}
            </NavigationContainer>
            {/*    )}*/}
          </NativeBaseProvider>
        </AuthContext.Provider>
      </StripeProvider>
    </>
  );
}
