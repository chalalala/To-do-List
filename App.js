import React, { useState } from 'react';
import Constants from 'expo-constants';
import { Alert, StyleSheet, Text, TextInput, View, ImageBackground, KeyboardAvoidingView } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { Octicons } from '@expo/vector-icons'; 

import { TODOS } from './data.js';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
// var todoList, setTodoList;

const AllStack = () => {
  return(
    <Stack.Navigator 
      initialRouteName="All"
      screenOptions={{headerTitleContainerStyle: {alignItems:'center'}}}>
      <Stack.Screen name="All Todos" component={All}/>
      <Stack.Screen name="SingleTodoScreen" component={SingleTodoScreen}/>
    </Stack.Navigator>
  )
}
const ActiveStack = () => {
  return(
    <Stack.Navigator 
      initialRouteName="Active"
      screenOptions={{headerTitleContainerStyle: {alignItems:'center'}}}>
      <Stack.Screen name="Active" component={Active}/>
    </Stack.Navigator>
  )
}
const CompleteStack = () => {
  return(
    <Stack.Navigator 
      initialRouteName="Complete"
      screenOptions={{headerTitleContainerStyle: {alignItems:'center'}}}>
      <Stack.Screen name="Complete" component={Complete}/>
    </Stack.Navigator>
  )
}

const Complete = ({navigation}) => {
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
  return(
    <ImageBackground style={styles.container} source={{ uri: 'https://images.pexels.com/photos/3585648/pexels-photo-3585648.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260' }}>
      <KeyboardAvoidingView
        enabled
        behavior="padding"
      >
        <ScrollView>
          <View style={styles.container}>
          {
            todoList.map((todo,idx) => {
              if (todo.status === 'Done'){
                return(
                <TodoItem 
                  key={todo.body}
                  todo={todo}
                  idx={idx}
                  showSingleTodo={()=>{}}
                  onToggleTodo={onToggleTodo}
                  onDeleteTodo={onDeleteTodo}
                />
                )
              }
            })
          }
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  )
}

const All = ({navigation}) => {
  const [todoList, setTodoList] = useState(TODOS);

  const showSingleTodo = todo =>{
    navigation.navigate("SingleTodoScreen",todo);
  }
  
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
    <ImageBackground style={styles.container} source={{ uri: 'https://images.pexels.com/photos/3585648/pexels-photo-3585648.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260' }}>
      <KeyboardAvoidingView
        enabled
        behavior="padding"
      >
        <ScrollView>
          <View style={styles.container}>
            <View style={{alignItems:'center'}}>
              {
              todoList.map((todo,idx) => {
                return (
                    <TodoItem 
                      key={todo.body}
                      todo={todo}
                      idx={idx}
                      showSingleTodo={showSingleTodo}
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
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>

  )
}

const Active = ({navigation}) => {
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
    return(
      <ImageBackground style={styles.container} source={{ uri: 'https://images.pexels.com/photos/3585648/pexels-photo-3585648.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260' }}>
        <KeyboardAvoidingView
          enabled
          behavior="padding"
        >
          <ScrollView>
            <View style={styles.container}>
            {
              todoList.map((todo,idx) => {
                if (todo.status === 'Active'){
                  return(
                  <TodoItem 
                    key={todo.body}
                    todo={todo}
                    idx={idx}
                    showSingleTodo={()=>{}}
                    onToggleTodo={onToggleTodo}
                    onDeleteTodo={onDeleteTodo}
                  />
                  )
                }
              })
            }
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    )
}

const SingleTodoScreen = ({ route }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        {route.params?.id}. {route.params?.status}
      </Text>
      <Text style={styles.bodyText}>{route.params?.body}</Text>
    </View>
  );
}

const TodoItem = props => {
  const statusStyle = {
    backgroundColor: props.todo.status === "Done" ? BLUE_COLOR : GREEN_COLOR,
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
      onPress={() => {
        props.onToggleTodo(props.todo.id);
        props.showSingleTodo(props.todo);
      }}
      onLongPress={() => props.onToggleTodo(props.todo.id)}      onLongPress={() => onLongPress(props.todo)}
      >
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
        <Tab.Screen name="Complete" component={CompleteStack}/>
        <Tab.Screen name="All" component={AllStack}/>
        <Tab.Screen name="Active" component={ActiveStack}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const BLUE_COLOR = "#4066ed";
const GREEN_COLOR = "#2E7D32";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  todoItem: {
    marginHorizontal: 5,
    marginTop:12,
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
    width: 300,
    color: 'black',
    borderRadius:10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    marginTop: 20,
    marginBottom: '5%',
    borderColor: 'grey',
  },
  inputContainer: {
    marginBottom: '5%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    width: 120,
    height: 50,
    borderRadius: 60,
    backgroundColor: 'rgb(71,113,246)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  headerText:{
    fontSize:25,
  },
  bodyText: {
    width:'80%',
    textAlign: 'center',
    fontSize: 30,
  }
});
