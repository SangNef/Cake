import "react-native-gesture-handler";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Ionicons } from "react-native-vector-icons"; // Import Ionicons from react-native-vector-icons
import MineScreen from "./screens/MineScreen";
import FriendScreen from "./screens/FriendScreen";
import EarnScreen from "./screens/EarnScreen";
import UpgradeScreen from "./screens/UpgradeScreen";
import AirdropScreen from "./screens/AirdropScreen";
import Menu from "./components/Menu";
import Header from "./components/Header";

const Stack = createStackNavigator();

const HeaderComponent = ({ navigation }) => (
  <View style={styles.headerComponent}>
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.closeApp()}>
        <Ionicons name="close" size={24} color="#727272" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Cake Cake Cake</Text>
      <View></View>
    </View>
  </View>
);

function MainScreens() {
  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <Header />
      <Stack.Navigator
        initialRouteName="Mine"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Mine" component={MineScreen} />
        <Stack.Screen name="Friends" component={FriendScreen} />
        <Stack.Screen name="Earn" component={EarnScreen} />
        <Stack.Screen name="Upgrade" component={UpgradeScreen} />
        <Stack.Screen name="Airdrop" component={AirdropScreen} />
      </Stack.Navigator>
      <Menu />
    </View>
  );
}

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#000" }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <MainScreens />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  headerComponent: {
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#000",
    paddingHorizontal: 16,
    paddingVertical: 22,
    borderBottomWidth: 1,
    marginTop: 44,
  },
  headerTitle: {
    color: "#727272",
    fontSize: 18,
  },
});

export default App;
