import React, { useEffect, useRef, useState } from 'react'
import { BsSend } from "react-icons/bs";
import { Contacts, DefaultSideBar, ReceivedMessage, SendMessages, Settings } from '../../';
import { useCurrentState } from '../../../Context/context';
const Home = () => {
    const [inputMessage, setInputMessage] = useState("");
    const [sidePannelContent, setSidePannelContent] = useState("DefaultSideBar");
    const [{ messages }, dispatch] = useCurrentState();

    const screensArray = [
        ["Settings", Settings],
        ["Contacts", Contacts],
        ["DefaultSideBar", DefaultSideBar]
    ]

    const setupSidePannel = () => {
        return (
            screensArray.map((screenSet, indx) => {
                let screenName = screenSet[0];
                let Screen = screenSet[1];
                if (screenName === sidePannelContent) {
                    return <Screen setSidePannelContent={setSidePannelContent} key={indx} />
                }
            })
        )
    }

    return (
        <div className='w-full h-full p-[3px] flex flex-row'>

            <div className='w-full h-full flex flex-col bg-slate-50 relative xs:w-[200px] sm:w-[300px] '>
                {
                    setupSidePannel()
                }
            </div>

            <div className="hidden flex-1 h-full xs:block">
                <div className='w-[95%] h-full mx-auto relative'>

                    <div className="w-full h-[calc(100%-40px)] flex flex-col items-center">
                        {
                            messages.length > 0 && messages.map((message, indx) => {
                                let mesgArr = Object.entries(message)[0]
                                let sender_name = mesgArr[0]
                                let sender_message = mesgArr[1]
                                if (sender_name === "me") {
                                    return (
                                        <SendMessages my_message={sender_message} key={indx} />
                                    )
                                } else {
                                    return (
                                        <ReceivedMessage sender_name={sender_name} sender_message={sender_message} key={indx} />
                                    )
                                }
                            })
                        }
                    </div>

                    <div className='h-[40px] absolute bottom-0 w-full px-[10px] py-[5px] bg-slate-200 rounded-[5px]'>
                        <form className="h-full w-full flex flex-row justify-center items-center" onSubmit={(e) => {
                            e.preventDefault();
                            console.log(inputMessage);
                            dispatch({
                                type: "update_messages",
                                newMessage: {
                                    "me": inputMessage
                                }
                            })
                            setInputMessage("");
                        }}>
                            <input type="text" placeholder='Message' className='bg-transparent outline-none border-none flex-1' value={inputMessage} onChange={(e) => { setInputMessage(e.target.value) }} />
                            <button type="submit" className="flex items-center justify-center">
                                <BsSend
                                    title='Send'
                                    size={"1.5em"}
                                    className='text-slate-700 cursor-pointer transition-colors duration-75 outline-none border-none hover:text-slate-950 active:text-slate-700'
                                />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { Home }