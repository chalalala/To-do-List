import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, TabBarIOS, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { Octicons } from '@expo/vector-icons'; 

import { TODOS } from './data.js';
import { TouchableOpacity } from 'react-native-gesture-handler';

// const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TodoItem = props => {
  const statusStyle = {
    backgroundColor: props.todo.status === "Done" ? 'blue' : 'green',
  };

  return (
    <TouchableOpacity
      key={props.todo.body}
      style={[styles.todoItem, statusStyle]}>
      <Text style={styles.todoText}>
        {props.idx + 1}: {props.todo.body}
      </Text>
    </TouchableOpacity>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => {
            if (route.name === "Complete"){
              return <MaterialCommunityIcons name="check-all" size={24} color={focused ? "blue" : "grey"} />;
            }
            else if (route.name === "All"){
              return <Ionicons name={focused ? "ios-add-circle-outline" : "ios-add-circle"} size={24} color={focused ? "blue" : "grey"} />;
            }
            else if (route.name === "Active"){
              return <Octicons name="settings" size={24} color={focused ? "blue" : "grey"} />;
            }
          }
        })}
        tabBarOptions={
          {
            activeTintColor: "blue",
            inactiveTintColor: "grey",
          }
        }
      >
        <Tab.Screen name="Complete" component={Complete}/>
        <Tab.Screen name="All" component={All}/>
        <Tab.Screen name="Active" component={Active}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const Complete = ({navigation}) => {
  return(
    <View style={styles.container}>
      <Text>Complete Screen</Text>
    </View>
  )
}

const All = ({navigation}) => {
  return(
    <View style={styles.container}>
      <Text>All Screen</Text>
    </View>
  )
}

const Active = ({navigation}) => {
  return(
    <View style={styles.container}>
      <Text>Active Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  todoItem: {
    margin: 5,
    padding: 10,
    width: '95%',
    minHeight: 20,
    color: 'white',
    borderRadius: 5,
    flexWrap: 'wrap'
  },
  todoText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  }
});
