import React, { useState } from 'react';
import Constants from 'expo-constants';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { Octicons } from '@expo/vector-icons'; 

import { TODOS } from './data.js';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

// const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TodoItem = props => {
  const statusStyle = {
    backgroundColor: props.todo.status === "Done" ? 'blue' : 'green',
  };

  const onLongPress = todo => {
    const prompt = `"${todo.body}"`;
    Alert.alert(
      'Delete your to-do?',
      prompt,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'OK', onPress: () => props.onDeleteTodo(todo.id)}
      ],
      { cancelable: true }
    );
  };

  return (
    <TouchableOpacity
      key={props.todo.body}
      style={[styles.todoItem, statusStyle]}
      onPress={() => props.onToggleTodo(props.todo.id)}
      onLongPress={() => onLongPress(props.todo)}>
      <Text style={styles.todoText}>
        {props.idx + 1}: {props.todo.body}
      </Text>
    </TouchableOpacity>
  )
}

const Complete = ({navigation}) => {
  return(
    <View style={styles.container}>
      <Text>Complete Screen</Text>
    </View>
  )
}

const All = ({navigation}) => {
  const [todoList, setTodoList] = useState(TODOS);

  const onToggleTodo = id => {
    const todo = todoList.find(todo => todo.id === id);
    todo.status = todo.status === 'Done' ? 'Active' : 'Done';
    const foundIndex = todoList.findIndex(todo => todo.id === id);
    todoList[foundIndex] = todo;
    const newTodoList = [...todoList];
    setTodoList(newTodoList);
  };

  const onDeleteTodo = id => {
    const newTodoList = todoList.filter(todo => todo.id !== id);
    setTodoList(newTodoList);
  };

  const [todoBody, setTodoBody] = useState('');
  
  const onSubmitTodo = () => {
    const newTodo = {
      body: todoBody,
      status: 'Active',
      id: todoList.length + 1
    };
    const newTodoList = [...todoList, newTodo];
    setTodoList(newTodoList);
    setTodoBody('');
  };
  
  return(
    <View style={styles.container}>
      <Text style={styles.header}>Message</Text>
      <ScrollView>
        <View style={styles.todoContainer}>
          {
            TODOS.map((todo,idx) => {
              return (
                  <TodoItem 
                    key={todo.body}
                    todo={todo}
                    idx={idx}
                    onToggleTodo={onToggleTodo}
                    onDeleteTodo={onDeleteTodo}
                  />
              )
            })
          }
          <View style={styles.inputContainer}>
            <TextInput
              value={todoBody}
              style={styles.todoInput}
              onChangeText={text => setTodoBody(text)}
            />
            <TouchableOpacity style={styles.button} onPress={onSubmitTodo}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Constants.statusBarHeight,
  },
  header: {
    textAlign: 'center',
    fontSize:22,
    fontWeight:'700',
    width:'100%',
    paddingVertical:7,
    backgroundColor: 'white'
  },
  todoContainer: {
    alignItems: 'center',
  },
  todoItem: {
    margin: 5,
    padding: 10,
    width: 320,
    minHeight: 20,
    color: 'white',
    borderRadius: 5,
  },
  todoText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  todoInput: {
    width: '100%',
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    marginTop: 20,
    marginBottom: '5%',
    borderColor: 'grey'
  },
  inputContainer: {
    width: '85%',
    marginBottom: '5%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    width: 120,
    height: 50,
    borderRadius: 60,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  }
});
