import React, { useEffect, useMemo, useRef, useState } from 'react'
import { BsSend } from "react-icons/bs";
import { ChatHeader, Contacts, DefaultSideBar, ReceivedMessage, SendMessages, Settings } from '..';
import { useCurrentState } from '../../Context/context';

const Home = () => {
    const [inputMessage, setInputMessage] = useState("");
    const [sidePannelContent, setSidePannelContent] = useState("DefaultSideBar");
    const [chatWith, setChatWith] = useState({
        contact: null,
        online: null,
    });

    const [socketOnline, setSocketOnline] = useState(false);
    const [{ userName, messages, masterKey }, dispatch] = useCurrentState();
    const messageDiv = useRef(null);

    WebSocket.prototype.emit = function (title, data) {
        this.send(JSON.stringify({
            title,
            ...data
        }))
    }

    let webSocket = useMemo(() => (new WebSocket('ws://localhost:5000/')), [])


    useEffect(() => {
        document.addEventListener('keydown', (evt) => {
            if (evt.key === 'Escape') {
                setChatWith({
                    contact: null,
                    onlineStatus: null,
                });
            }
        })

    }, [])


    useEffect(() => {
        if (messageDiv.current) {
            messageDiv.current.scrollIntoView({ behaviour: 'smooth' })
        }
    }, [messages])


    useEffect(() => {

        if (chatWith.contact && socketOnline) {

            window.addEventListener('focus', (e) => {
                webSocket.emit("sendOnlineStatus", {
                    sendTo: chatWith.contact,
                    sendBy: userName,
                    online: 'online'
                })
            })

            window.addEventListener('blur', (e) => {
                webSocket.emit("sendOnlineStatus", {
                    sendTo: chatWith.contact,
                    sendBy: userName,
                    online: 'offline',
                    time: new Date().toLocaleTimeString()
                })
            })

        }

    }, [chatWith.contact, socketOnline, userName, webSocket])


    // Update in user's local storage
    const updateMessages = (user, sender, sender_message) => {
        let previousUserData = JSON.parse(localStorage.getItem(masterKey));
        if (previousUserData.messages[user]) {
            localStorage.setItem(masterKey, JSON.stringify({
                ...previousUserData,
                messages: {
                    ...previousUserData.messages,
                    [user]: [
                        ...previousUserData.messages[user],
                        { [sender]: sender_message }
                    ]
                }
            }))
        } else {
            localStorage.setItem(masterKey, JSON.stringify({
                ...previousUserData,
                messages: {
                    ...previousUserData.messages,
                    [user]: [
                        { [sender]: sender_message }
                    ]
                }
            }))
        }
    }

    webSocket.onopen = () => {
        setSocketOnline(true);
        webSocket.emit("userName", { userName })
        console.log('Connected...');
    }

    webSocket.onmessage = ({ data }) => {
        let { title } = JSON.parse(data);

        if (title === "sending_message") {
            let { sendBy, msg } = JSON.parse(data);
            let new_message = {
                userName: sendBy,
                senderName: sendBy,
                senderMessage: msg
            }

            // Update in Browser
            dispatch({
                type: "update_messages",
                newMessage: new_message
            })

            // Update in Local Storage
            updateMessages(sendBy, sendBy, msg)

        } else if (title === "sending_onlineStatus") {
            let { sendBy, online } = JSON.parse(data);
            if (sendBy === chatWith.contact) {
                setChatWith({
                    ...chatWith,
                    online,
                })
            }
        }
    }

    webSocket.onclose = () => {
        webSocket.close();
        console.log('Disconnected...\n');
        console.log("Reconnecting...");
        // reconnecting...
        webSocket = new WebSocket('ws://localhost:5000/');
    }

    const screensArray = [
        ["Settings", Settings],
        ["Contacts", Contacts],
        ["DefaultSideBar", DefaultSideBar]
    ]

    // Side Links
    const setupSidePannel = () => {
        return (
            screensArray.map((screenSet, indx) => {
                let screenName = screenSet[0];
                let Screen = screenSet[1];
                if (screenName === sidePannelContent) {
                    return <Screen
                        chatWith={chatWith}
                        setChatWith={setChatWith}
                        setSidePannelContent={setSidePannelContent}
                        key={indx} />
                }
            })
        )
    }

    // Chat Headder - username, userImage, onlineDetails...
    const setupChatHeader = () => {
        return (
            <div className="w-full h-[50px] mx-auto flex flex-row items-center bg-slate-400 px-2 py-1 rounded-[5px]">

                {
                    (chatWith.online === 'online' || chatWith.online === 'typing...') ? <span className='bg-green-500 p-[2px] mr-[12px] rounded-[50%] border border-black'>
                        <img src="./user.png" alt="user" className="w-[30px] h-[30px] border rounded-[50%] border-black" />
                    </span> : <span className='bg-red-500 p-[2px] mr-[12px] rounded-[50%] border border-black'>
                        <img src="./user.png" alt="user" className="w-[30px] h-[30px] border rounded-[50%] border-black" />
                    </span>
                }

                <span className='h-full'>
                    <p className='text-slate-900 h-[50%]'>{chatWith.contact || ""}</p>
                    <p className='text-slate-900 h-[50%]'>{chatWith.online || ""}</p>
                </span>

            </div>
        )
    }

    // Messages with typing box...
    const setupMessages = () => {
        let allMessages = Object.entries(messages)

        if (!socketOnline) {
            return (
                <div className="w-full h-full flex flex-col justify-center items-center">
                    <p className='text-slate-500 text-[calc((2vw+32px)/3)] tracking-[0.5px] sm:text-xl'>
                        YOUR CHATROOM IS OFFLINE
                    </p>
                </div>
            )
        }

        if (!chatWith.contact) {
            return (
                <div className="w-full h-full flex flex-col justify-center items-center">
                    <p className='text-slate-500 text-[calc((2vw+32px)/3)] tracking-[0.5px] sm:text-xl'>
                        YOUR CHATROOM IS ONLINE
                    </p>
                </div>
            )
        }

        return (
            <>
                {
                    setupChatHeader()
                }

                <div className="w-[95%] mx-auto h-[calc(100%-80px)] flex flex-1 flex-col items-center overflow-y-scroll scroll-smooth">
                    {                                   
                        allMessages.map(conversations => {
                            let person = conversations[0]
                            let message_list = conversations[1]
                            if (chatWith.contact === person) {
                                return (
                                    message_list.map((msgObj, indx) => {
                                        let sender = Object.entries(msgObj)[0][0];
                                        let sender_message = Object.entries(msgObj)[0][1];
                                        if (sender === "me") {
                                            return <SendMessages my_message={sender_message} key={indx} />
                                        } else {
                                            return <ReceivedMessage senderName={sender} senderMessage={sender_message} key={indx} />
                                        }
                                    })
                                )
                            }
                        })
                    }
                    <div ref={messageDiv} />
                </div>

                <div className='h-[40px] absolute bottom-0 w-full px-[10px] py-[5px] bg-slate-200 rounded-[5px]'>
                    <form className="h-full w-full flex flex-row justify-center items-center" onSubmit={(e) => {
                        e.preventDefault();
                        if (inputMessage.length > 0 && chatWith.contact) {
                            let new_message = {
                                userName: chatWith.contact,
                                senderName: 'me',
                                senderMessage: inputMessage
                            } 

                            dispatch({
                                type: "update_messages",
                                newMessage: new_message
                            })

                            updateMessages(chatWith.contact, 'me', inputMessage)

                            if (webSocket.readyState === 1) {
                                webSocket.emit('sendMsg', {
                                    sendBy: userName,
                                    sendTo: chatWith.contact,
                                    msg: inputMessage
                                })
                            }
                            setInputMessage("");
                        }
                    }}>
                        <input
                            type="text"
                            placeholder='Message'
                            className='bg-transparent outline-none border-none flex-1'
                            value={inputMessage}
                            onChange={(e) => { setInputMessage(e.target.value) }}
                            onFocus={(e) => {
                                webSocket.emit("sendOnlineStatus", {
                                    sendTo: chatWith.contact,
                                    sendBy: userName,
                                    online: 'typing...'
                                })
                            }}
                            onBlur={(e) => {
                                webSocket.emit("sendOnlineStatus", {
                                    sendTo: chatWith.contact,
                                    sendBy: userName,
                                    online: 'online'
                                })
                            }} />

                        <button type="submit" className="flex items-center justify-center">
                            <BsSend
                                title='Send'
                                size={"1.5em"}
                                className='text-slate-700 cursor-pointer transition-colors duration-75 outline-none border-none hover:text-slate-950 active:text-slate-700'
                            />
                        </button>

                    </form>
                </div>
            </>
        )
    }


    // return to main index.js
    return (
        <div className='w-full h-full flex flex-row'>
            <div className='w-full h-full flex flex-col bg-slate-50 relative xs:w-[200px] sm:w-[300px]'>
                {
                    setupSidePannel()
                }
            </div>

            <div className="hidden flex-1 h-full p-[5px] bg-slate-900 xs:block">
                <div className='w-full h-full relative'>
                    {
                        setupMessages()
                    }
                </div>
            </div>
        </div>
    )
}

export { Home }