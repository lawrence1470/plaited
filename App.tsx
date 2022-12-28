import "react-native-url-polyfill/auto";
import { useState, useEffect, createContext } from "react";
import { supabase } from "./lib/supabase";
import AuthScreen from "./screens/AuthScreen";
import LocationScreen from "./screens/LocationScreen";
import { Session } from "@supabase/supabase-js";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import { Database } from "./lib/database.types";
import { Text } from "react-native";
import { Profile } from "./lib/types";
import ApprovedAddressScreen from "./screens/ApprovedAddressScreen";
import NotApprovedAddressScreen from "./screens/NotApprovedAddressScreen";
import NewPhoneNumberScreen from "./screens/NewPhoneNumberScreen";
import OtpScreen from "./screens/OtpScreen";
import GatedScreen from "./screens/GatedScreen";

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

  const isServiceable = profile?.is_serviceable;

  return (
    <AuthContext.Provider value={{ session, profile }}>
      <NativeBaseProvider>
        <NavigationContainer>
          {!isServiceable ? (
            <>
              {session?.user.aud !== "authenticated" ? (
                <Stack.Navigator>
                  <Stack.Screen name="Auth" component={AuthScreen} />
                </Stack.Navigator>
              ) : (
                <>
                  <Stack.Navigator>
                    <Stack.Screen
                      name="LocationStep"
                      component={LocationScreen}
                    />
                    <Stack.Screen
                      name="ApprovedAddress"
                      component={ApprovedAddressScreen}
                    />
                    <Stack.Screen
                      name="NotApprovedAddress"
                      component={NotApprovedAddressScreen}
                    />
                  </Stack.Navigator>
                </>
              )}
            </>
          ) : (
            <Stack.Navigator>
              <Stack.Screen
                name="NewPhoneNumber"
                component={NewPhoneNumberScreen}
              />
              <Stack.Screen
                name="Otp"
                component={OtpScreen}
              />
              <Stack.Screen name="Gated" component={GatedScreen} />

            </Stack.Navigator>
          )}
        </NavigationContainer>
      </NativeBaseProvider>
    </AuthContext.Provider>
  );
}
