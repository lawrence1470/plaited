import "react-native-url-polyfill/auto";
import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import Auth from "./components/Auth";
import Account from "./components/Account";
import { View } from "react-native";
import { Session } from "@supabase/supabase-js";
import GeoLocation from "./components/GeoLocation";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

type RootStackParamList = {
  auth: undefined;
  account: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Screen name="auth" component={() => <Auth />} />
      {session ? (
        <Stack.Screen
          name="account"
          component={() => <Account session={session} />}
        />
      ) : (
        <Stack.Screen name="auth" component={() => <Auth />} />
      )}
      <GeoLocation />
    </NavigationContainer>
  );

  // return (
  //   <View>
  //     {session && session.user ? <Account key={session.user.id} session={session} /> : <Auth />}
  //   </View>
  // )
}
