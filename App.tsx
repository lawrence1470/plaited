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

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
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

  useEffect(() => {
   setStep(renderStep())
  }, [session, profile]);



  const renderStep = () => {
    const isServiceable = profile?.is_serviceable;
    const hasPhoneNumber = profile?.phone_number;
    if (session?.user.aud !== "authenticated") {
      return "Auth";
    }

    if (!isServiceable ) {
      return "Location";
    }

    if(!hasPhoneNumber) {
      return "NewPhoneNumber";
    }

    return "Home";
  };

  console.log(step, 'step')

  return (
    <AuthContext.Provider value={{ session, profile }}>
      <NativeBaseProvider>
        {/*<NavigationContainer>*/}
        {/*  {!isServiceable ? (*/}
        {/*    <>*/}
        {/*      {session?.user.aud !== "authenticated" ? (*/}
        {/*        <Stack.Navigator>*/}
        {/*          <Stack.Screen name="Auth" component={AuthScreen} />*/}
        {/*        </Stack.Navigator>*/}
        {/*      ) : (*/}
        {/*        <>*/}
        {/*          <Stack.Navigator>*/}
        {/*            <Stack.Screen*/}
        {/*              name="LocationStep"*/}
        {/*              component={LocationScreen}*/}
        {/*            />*/}
        {/*            <Stack.Screen*/}
        {/*              name="ApprovedAddress"*/}
        {/*              component={ApprovedAddressScreen}*/}
        {/*            />*/}
        {/*            <Stack.Screen*/}
        {/*              name="NotApprovedAddress"*/}
        {/*              component={NotApprovedAddressScreen}*/}
        {/*            />*/}
        {/*            <Stack.Screen*/}
        {/*              name="NewPhoneNumber"*/}
        {/*              component={NewPhoneNumberScreen}*/}
        {/*            />*/}
        {/*          </Stack.Navigator>*/}
        {/*        </>*/}
        {/*      )}*/}
        {/*    </>*/}
        {/*  ) : (*/}
        {/*    <>*/}
        {/*      {!hasPhoneNumber ? (*/}
        {/*        <Stack.Navigator>*/}
        {/*          <Stack.Screen*/}
        {/*            name="NewPhoneNumber"*/}
        {/*            component={NewPhoneNumberScreen}*/}
        {/*          />*/}
        {/*          <Stack.Screen name="Otp" component={OtpScreen} />*/}
        {/*          <Stack.Screen name="Gated" component={GatedScreen} />*/}
        {/*        </Stack.Navigator>*/}
        {/*      ) : (*/}
        {/*        <Stack.Navigator>*/}
        {/*          <Stack.Screen name="Home" component={HomeScreen} />*/}
        {/*        </Stack.Navigator>*/}
        {/*      )}*/}
        {/*    </>*/}
        {/*  )}*/}
        {/*</NavigationContainer>*/}
        <NavigationContainer>
          <Stack.Navigator initialRouteName={step}>
            <Stack.Screen
              name="Auth"
              component={AuthScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen name="Location" component={LocationScreen} />
            <Stack.Screen
              name="ApprovedAddress"
              component={ApprovedAddressScreen}
            />
            <Stack.Screen
              name="NotApprovedAddress"
              component={NotApprovedAddressScreen}
            />
            <Stack.Screen
              name="NewPhoneNumber"
              component={NewPhoneNumberScreen}
            />
            <Stack.Screen name="Otp" component={OtpScreen} />
            <Stack.Screen name="Gated" component={GatedScreen} />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </AuthContext.Provider>
  );
}
