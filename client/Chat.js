import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import App from "./App";

export default function Chat({ socket, username, room }) {
    const [click, setClick] = useState(1);
    const [showChat, setShowChat] = useState(false);
    const [joinroom, setJoinRoom] = useState(false);
    const [boxes, setBoxes] = useState(
        [{ "value": "" }, { "value": "" }, { "value": "" },
        { "value": "" }, { "value": "" }, { "value": "" },
        { "value": "" }, { "value": "" }, { "value": "" }
        ]);
    const [values, setValues] = useState(true);
    const [newNames, setnewNames] = useState("");
    const [recentvalue, setRecentvalue] = useState("");
    const handleClick = ((index) => {
        const boxValue = [...boxes]
        if (click % 2 === 0 && boxValue[index].value === "") {
            if (recentvalue === "" || recentvalue === "O") {
                boxValue[index].value = "O";
                setRecentvalue("O");
                setClick(click + 1);
            }
            else {
                alert("Other's Turn")
            }
        }
        else if (click % 2 != 0 && boxValue[index].value === "") {
            if (recentvalue === "" || recentvalue === "X") {
                boxValue[index].value = "X";
                setRecentvalue("X")
                setClick(click + 1);
            }
            else {
                alert("Other's Turn")
            }
        }
        else {
            alert("Please Select A Empty Box!");
        }
    })

    const winCalculation = (() => {
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

            else if (boxes[0].value != "" && boxes[1].value != "" && boxes[2].value != "" &&
                boxes[3].value != "" && boxes[4].value != "" && boxes[5].value != "" &&
                boxes[6].value != "" && boxes[7].value != "" && boxes[8].value != "") {
                alert("Its a draw");
                setShowChat(true);
                break;
            }
        }
    })


    useEffect(() => {

        socket.on("recived_tictoc", (data) => {
            console.log("Data", data);
            const dataValue = data.tic_tac_list
            console.log("setbocx", dataValue);
            setBoxes(dataValue);
            setClick(data.click_Number);
            const names = data.author
            console.log("Name", names);
            setnewNames(names);
        })
        winCalculation();
    }, [socket]);
    console.log("Hii", newNames);
    useEffect(() => {

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
        winCalculation();
    }, [click])

    const joinRoom = () => {
        setJoinRoom(true);
    }
    const exitRoom = () => {
        if (click != 0) {
            alert("You Will Lose the game!!!")
            setBoxes([{ "value": "" }, { "value": "" }, { "value": "" },
            { "value": "" }, { "value": "" }, { "value": "" },
            { "value": "" }, { "value": "" }, { "value": "" }
            ]);
            setShowChat(true);
        }

    }
    const joinRoomAgain = () => {

        if (username !== "" && room !== "") {
            socket.emit("join_room", room);
            setBoxes([{ "value": "" }, { "value": "" }, { "value": "" },
            { "value": "" }, { "value": "" }, { "value": "" },
            { "value": "" }, { "value": "" }, { "value": "" }
            ]);
            setShowChat(false)

        }
    }
    return (
        <View>
            {!showChat ? (
                <View style={styles.mainContainer}>
                    <View style={styles.container}>
                        <View style={styles.headingContainer}>
                            <Text style={click % 2 != 0 ? { color: "red", fontSize: 25, } : { color: "grey", fontSize: 25, }}>
                                Player's Name: {username}
                            </Text>
                            <Text style={click % 2 === 0 ? { color: "red", fontSize: 25, } : { color: "grey", fontSize: 25, }}>
                                Other Player Name: {newNames}
                            </Text>
                        </View>

                        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                            {
                                boxes.map((s1, index) => <View style={{
                                    borderRadius: 3,
                                    backgroundColor: "yellow",
                                    borderWidth: 3,

                                }} key={index} >
                                    <TouchableOpacity style={{
                                        height: 100,
                                        width: 100,
                                        fontSize: 40,

                                    }}
                                        onPress={() => handleClick(index, s1)}
                                    >
                                        <Text style={{
                                            color: "red", marginRight: 8,
                                            fontSize: 70, textAlign: "center"
                                        }}>{s1.value}</Text>
                                    </TouchableOpacity>
                                </View>)
                            }

                        </View>
                        <View style={styles.exitRoommainContainer}>
                            <TouchableOpacity
                                style={styles.exitRoomstyle}
                                onPress={exitRoom}
                            >
                                <Text style={styles.buttonTextforExitroom}>Want to Quit?</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </View>
            )
                :
                (
                    <View>
                        {
                            !joinroom ? (
                                <View >
                                    <View style={styles.gameEndContainer}>
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
                                : (
                                    <View>

                                        <View>

                                            <View style={styles.mainContainerforPlayagain}>
                                                <View style={styles.containerforPlayagain}>
                                                    <Text style={styles.headerText}>Join A Chat</Text>
                                                    <TextInput
                                                        style={styles.textInput}
                                                        value={username}

                                                    />
                                                    <TextInput
                                                        style={styles.textInput}
                                                        value={room}

                                                    />
                                                    <TouchableOpacity
                                                        style={styles.button}
                                                        onPress={joinRoomAgain}
                                                    >
                                                        <Text style={styles.buttonText}>Join A Room</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>



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

    },
    container: {
        marginBottom: 50,
        backgroundColor: '#fff',

    },
    headingContainer: {
        marginBottom: 5,
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
        height: 60,
    },
    useNameText: {
        color: "red",
        fontSize: 25,
        marginTop: 90,

        textAlign: "center"
    },
    button: {
        marginTop: 20,
        width: 175,
        height: 40,
        backgroundColor: "green",
        marginLeft: 120,

    },
    buttonText: {
        justifyContent: "center",
        textAlign: "center",
        marginTop: 10,
        color: "white"
    },
    exitRoommainContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    exitRoomstyle: {
        marginTop: 20,
        width: 190,
        height: 60,
        backgroundColor: "green",
    },
    buttonTextforExitroom: {
        fontSize: 25,
        justifyContent: "center",
        textAlign: "center",
        marginTop: 10,
        color: "white"
    },
    mainContainerforPlayagain: {
        marginTop: 200,
        marginBottom: 10,
        marginRight: 120,
        marginLeft: 120,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerforPlayagain: {
        marginTop: 15,
        marginBottom: 50,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    }
});