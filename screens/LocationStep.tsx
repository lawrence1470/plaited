import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { StyleSheet, View, Alert } from "react-native";
import { Session } from "@supabase/supabase-js";
import GeoLocation from "../components/GeoLocation";

export default function LocationStep({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  // useEffect(() => {
  //   if (session) getProfile();
  // }, [session]);
  //
  // async function getProfile() {
  //   try {
  //     setLoading(true);
  //     if (!session?.user) throw new Error("No user on the session!");
  //
  //     let { data, error, status } = await supabase
  //       .from("profiles")
  //       .select(`username, avatar_url`)
  //       .eq("id", session?.user.id)
  //       .single();
  //     if (error && status !== 406) {
  //       throw error;
  //     }
  //
  //     if (data) {
  //       setUsername(data.username);
  //       setAvatarUrl(data.avatar_url);
  //     }
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       Alert.alert(error.message);
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  console.log('i am here');

  return (
    <View>
      {/*<View style={[styles.verticallySpaced, styles.mt20]}>*/}
      {/*  <Input label="Email" value={session?.user?.email} disabled />*/}
      {/*</View>*/}

      <View style={styles.container}>
        <GeoLocation />
      </View>

      {/*<View style={styles.verticallySpaced}>*/}
      {/*  <Input*/}
      {/*    label="Username"*/}
      {/*    value={username || ""}*/}
      {/*    onChangeText={(text) => setUsername(text)}*/}
      {/*  />*/}
      {/*</View>*/}

      {/*<View style={[styles.verticallySpaced, styles.mt20]}>*/}
      {/*  <Button*/}
      {/*    title={loading ? "Loading ..." : "Update"}*/}
      {/*    onPress={() => updateProfile({ username, avatar_url: avatarUrl })}*/}
      {/*    disabled={loading}*/}
      {/*  />*/}
      {/*</View>*/}

      {/*<View style={styles.verticallySpaced}>*/}
      {/*  <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />*/}
      {/*</View>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
    flex: 1,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});
