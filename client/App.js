import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import io from 'socket.io-client';
import Chat from './Chat';

const socket = io.connect("https://tic-tac-toe-server-121.herokuapp.com")

export default function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);



  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      
      setShowChat(true);
    }
  }
  return (
    <View>
      {!showChat ? (
        <View style={styles.mainContainer}>
          <View style={styles.container}>
            <Text style={styles.headerText}>Join A Chat</Text>
            <TextInput
              style={styles.textInput}
              placeholder='Write Down Name...'
              onChangeText={setUsername}
              value={username}
            />
            <TextInput
              style={styles.textInput}
              placeholder='Write Down Room Name...'
              onChangeText={setRoom}
              value={room}
            />
           </View>
           <TouchableOpacity
              style={styles.button}
              onPress={joinRoom}
            >
            <Text style={styles.buttonText}>Join A Room</Text>
            </TouchableOpacity> 
        </View>

      )
        : (
          <Chat socket={socket} username={username} room={room} />

        )}

    </View>

  );
}

const styles = StyleSheet.create({
  mainContainer:{
    flex: 1,
    marginTop: 200,
    //borderWidth:3,
    marginBottom:10,
    marginRight:120,
    marginLeft:120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    marginTop: 15,
    marginBottom:50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    backgroundColor: "yellow",
    padding: 4,
    borderColor: "black",
    borderWidth: 4,
    marginBottom: 15,
    width: 300,
    height:60,
  },
  button:{
    marginTop:20,
    width:300,
    height:40,
    backgroundColor:"green",

  },
  headerText:{
    fontSize:20,
    fontWeight:"bold",
    marginBottom:10,
  },
  buttonText:{
    justifyContent:"center",
    textAlign:"center",
    marginTop:10,
    color:"white"
  }

});
