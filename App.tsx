import "react-native-url-polyfill/auto";
import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import AuthScreen from "./screens/AuthScreen";
import LocationStep from "./screens/LocationStep";
import { Session } from "@supabase/supabase-js";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import { Database } from "./lib/database.types";
import { Text } from "react-native";
import { Profile } from "./lib/types";

const getUser = async (session: Session) => {
  const userId = session.user.id;
  return await supabase
    .from("profiles")
    .select(`is_serviceable`)
    .eq("id", userId)
    .single();
};

// TODO get rid of any here
const AuthStack = createNativeStackNavigator<any>() as any;

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<Profile | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    if (session?.user.aud === "authenticated") {
      getUser(session).then(({ data }) => {
        setUser(data as Profile);
      });
    }
  }, []);

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        {session?.user.aud !== "authenticated" ? (
          <AuthStack.Navigator>
            <AuthStack.Screen name="Auth" component={AuthScreen} />
          </AuthStack.Navigator>
        ) : (
          <AuthStack.Navigator>
            <AuthStack.Screen name="LocationStep" component={LocationStep} />
          </AuthStack.Navigator>
        )}
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
