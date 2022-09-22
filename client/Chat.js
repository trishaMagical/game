import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, Button, TextInput, TouchableOpacity, TouchEvent } from 'react-native';
import App from "./App";

export default function Chat({ socket, username, room }) {
    const [click, setClick] = useState(1)
    const [showChat, setShowChat] = useState(false);
    const [joinroom, setJoinRoom] = useState(false);
    const [boxes, setBoxes] = useState(
       [{"value": ""}, {"value": ""}, {"value": ""},
        {"value": ""}, {"value": ""}, {"value": ""},
        {"value": ""},{"value": "" }, {"value": ""}
       ]);
    const handleClick = ((index) => {
        const boxValue = [...boxes]
        if (click % 2 === 0 && boxValue[index].value === "" ) {
            boxValue[index].value = "O";
            setClick(click + 1);
            console.log("Click", click);
        }
        else if(click % 2 != 0 && boxValue[index].value === "") {
            boxValue[index].value = "X";
            setClick(click + 1);
        }
        else {
            alert("Please Select A Empty Box!");
        }
    })
    const winCalculation =(()=>{
        for (let i = 0; i < boxes.length; i++) {
            if (boxes[0].value === "X" && boxes[1].value === "X" && boxes[2].value === "X") {
                alert("X winner & O Loser ")
                setShowChat(true);
                break;
            }
            else if (boxes[0].value === "O" && boxes[1].value === "O" && boxes[2].value === "O") {
                alert("O is a winner & X is a Loser ")
                setShowChat(true);
                break;
            }
            else if (boxes[3].value === "O" && boxes[4].value === "O" && boxes[5].value === "O") {
                alert("O is a winner & X is a Loser ")
                setShowChat(true);
                break;
            }
            else if (boxes[6].value === "O" && boxes[7].value === "O" && boxes[8].value === "O") {
                alert("O is a winner & X is a Loser ")
                setShowChat(true);
                break;

            }
            else if (boxes[0].value === "O" && boxes[3].value === "O" && boxes[6].value === "O") {
                alert("O is a winner & X is a Loser")
                setShowChat(true);
                break;
            }
            else if (boxes[1].value === "O" && boxes[4].value === "O" && boxes[7].value === "O") {
                alert("O is a winner & X is a Loser")
                setShowChat(true);
                break;
            }
            else if (boxes[2].value === "O" && boxes[5].value === "O" && boxes[8].value === "O") {
                alert("O is a winner & X is a Loser")
                setShowChat(true);
                break;
            }
            else if (boxes[0].value === "O" && boxes[4].value === "O" && boxes[8].value === "O") {
                alert("O is a winner & X is a Loser")
                setShowChat(true);
                break;
            }
            else if (boxes[2].value === "O" && boxes[4].value === "O" && boxes[6].value === "O") {
                alert("O is a winner & X is a Loser")
                setShowChat(true);
                break;
            }
            else if (boxes[3].value === "X" && boxes[4].value === "X" && boxes[5].value === "X") {
                alert("X winner & O Loser ")
                setShowChat(true);
                break;
            }
            else if (boxes[6].value === "X" && boxes[7].value === "x" && boxes[8].value === "X") {
                alert("X winner & O Loser ")
                setShowChat(true);
                break;
            }
            else if (boxes[0].value === "X" && boxes[3].value === "X" && boxes[6].value === "X") {
                alert("X winner & O Loser ")
                setShowChat(true);
                break;
            }
            else if (boxes[1].value === "X" && boxes[4].value === "X" && boxes[7].value === "X") {
                alert("X winner & O Loser ")
                setShowChat(true);
                break;
            }
            else if (boxes[2].value === "X" && boxes[5].value === "X" && boxes[8].value === "X") {
                alert("X winner & O Loser ")
                setShowChat(true);
                break;
            }
            else if (boxes[0].value === "X" && boxes[4].value === "X" && boxes[8].value === "X") {
                alert("X winner & O Loser ");
                setShowChat(true);
                break;
            }
            else if (boxes[2].value === "X" && boxes[4].value === "X" && boxes[6].value === "X") {
                alert("X winner & O Loser ")
                setShowChat(true);
                break;
            }
             
            else if(boxes[0].value != "" && boxes[1].value != "" && boxes[2].value != "" && 
                    boxes[3].value != "" && boxes[4].value != "" && boxes[5].value != "" &&
                    boxes[6].value != "" && boxes[7].value != "" && boxes[8].value != "" ){
                alert("Its a draw");
                setShowChat(true);
                break;
            }
        }    
    })
    const  chances =(()=>{
         if((click % 2 != 0)&& (boxes[0].value != "O" && boxes[1].value != "O" && boxes[2].value != "O")){
            alert("X should Move");
        }
        else if((click % 2 != 0)&& (boxes[3].value != "O" && boxes[4].value != "O" && boxes[5].value != "O")){
            alert("X should Move"); 
        }
        else if((click % 2 != 0)&& (boxes[6].value != "O" && boxes[7].value != "O" && boxes[8].value != "O")){
            alert("X should Move"); 
        }
        	
        else if((click % 2 != 0)&& (boxes[0].value != "O" && boxes[3].value != "O" && boxes[6].value != "O")){
            alert("X should Move"); 
        }
        else if((click % 2 != 0)&& (boxes[1].value != "O" && boxes[4].value != "0" && boxes[7].value != "O")){
            alert("X should Move"); 
        }
        else if((click % 2 != 0)&& (boxes[2].value != "O" && boxes[5].value != "O" && boxes[8].value != "O")){
            alert("X should Move"); 
        }
        else if((click % 2 != 0)&& (boxes[0].value != "O" && boxes[4].value != "O" && boxes[8].value != "O")){
            alert("X should Move"); 
        }
        else if((click % 2 != 0) && (boxes[2].value != "O" && boxes[4].value != "O" && boxes[6].value != "O")){
            alert("X should Move"); 
        }
        else if((click % 2 === 0) &&(boxes[0].value != "X" && boxes[1].value != "X" && boxes[2].value != "X")){
            alert("O should Move");
        }
        else if((click % 2 === 0)&& (boxes[3].value != "X" && boxes[4].value != "X" && boxes[5].value != "X")){
            alert("O should Move"); 
        }
          
        else if((click % 2 === 0)&& (boxes[6].value != "X" && boxes[7].value != "X" && boxes[8].value != "X")){
            alert("O should Move"); 
        }
        else if((click % 2 === 0)&& (boxes[0].value != "X" && boxes[3].value != "X" && boxes[6].value != "X")){
            alert("O should Move"); 
        }
        else if((click % 2 === 0)&& (boxes[1].value != "X" && boxes[4].value != "X" && boxes[7].value != "X")){
            alert("O should Move"); 
        }
        else if((click % 2 === 0)&& (boxes[2].value != "X" && boxes[5].value != "X" && boxes[8].value != "X")){
            alert("O should Move"); 
        }
        else if((click % 2 === 0)&& (boxes[0].value != "X" && boxes[4].value != "X" && boxes[8].value != "X")){
            alert("O should Move"); 
        }
        else if((click % 2 === 0)&& (boxes[2].value != "X" && boxes[4].value != "X" && boxes[6].value != "X")){
            alert("O should Move"); 
        }
    
    })  
    useEffect(() => {
        //chances();
        socket.on("recived_tictoc", (data) => {
            console.log("Data", data);
            const dataValue = data.tic_tac_list
            console.log("setbocx", dataValue);
            setBoxes(dataValue);
            setClick(data.click_Number);
            winCalculation()
        })
    },[socket]);
    useEffect(() => {
      chances();
        console.log("Click", click);
        const tictacdata = {
            room: room,
            author: username,
            time: new Date(Date.now()).getHours() +
                ":" +
                new Date(Date.now()).getMinutes(),
            tic_tac_list: boxes,
            click_Number: click,
        };
        socket.emit("send_tictactoe", tictacdata);
        winCalculation()
    }, [click])
    const joinRoom = () => {
       setJoinRoom(true);
      }
    return (
        <View>
         {!showChat ? (
            	
      
      <View style={styles.mainContainer}>
      <View style={styles.container}>
          <Text style={styles.useNameText}>{username}</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {
                  boxes.map((s1, index) => <View style={{ flexBasis: "30%", borderRadius: 3, backgroundColor: "yellow", borderWidth: 3, textAlign: "center" }} key={index}>
                      <TouchableOpacity style={{
                          height: 30,
                          fontSize: 40,
                          textAlign: "center",
                          marginLeft: 20,
                          marginTop: 15,
                      }}
                          onPress={() => handleClick(index, s1)}
                      >
                          <Text>{s1.value}</Text>
                      </TouchableOpacity>
                  </View>)
              }
          </View>
      </View>
  </View>
         ) 
         :
          (
           <View style={styles.mainContainer}>
            {
              !joinroom ?  (
                <View>
                <View style={styles.container}>
                <Text style={styles.useNameText}>Game End !!!</Text>
                <TouchableOpacity
                style={styles.button}
                onPress={joinRoom}
                >
                <Text style={styles.buttonText}>Want to Play Again?</Text>
                </TouchableOpacity>
                </View>
                </View>
              ) 
              :(
                <View style={styles.mainContainer}>
                    <View style={styles.container}>
                         <App/>
                    </View>
                </View>    
              )
            }
           </View> 
         
            )}  
        </View>
          
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 100,
        marginBottom: 10,
        marginRight: 120,
        marginLeft: 120,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        marginBottom: 50,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    useNameText: {
        color: "red",
        fontSize: 25,
    },
    button:{
        marginTop:20,
        width:300,
        height:40,
        backgroundColor:"green",
    
      },
      buttonText:{
        justifyContent:"center",
        textAlign:"center",
        marginTop:10,
        color:"white"
      }

});