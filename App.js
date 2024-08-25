import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Mainpage from './Components/Mainpage';
import Song from './Components/Song';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Mainpage">
          <Stack.Screen
            name="Mainpage"
            options={{ headerShown: false }}
            component={Mainpage}
          />

           <Stack.Screen
            name="Song"
            // options={{ headerShown: false }}
            component={Song}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#353636',
  },
});
