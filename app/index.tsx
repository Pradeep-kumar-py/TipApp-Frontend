import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View
      
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-red-400 font-bol bg-primary " >Hello Pradeep!</Text>
      <Link href="/(auth)/login">Login</Link>
    </View>
  );
}
