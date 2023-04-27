import React, { useState } from 'react'
import { BsPlusCircleFill } from 'react-icons/bs';
import { FaSearch } from 'react-icons/fa';
import { MdMoreVert } from 'react-icons/md';
import { Dialog } from '..';
import { useCurrentState } from '../../Context/context';

const DefaultSideBar = ({ setNewChatWith,chatWith, setChatWith, setSidePannelContent }) => {
    const [showMoreDialog, setShowMoreDialog] = useState(false);
    const [{ messages }, dispatch] = useCurrentState()

    const setupConversations = () => {

        let conversations = Object.entries(messages)
        if (conversations.length) {
            return (
                conversations.map((conversation, indx) => {
                    let personName = conversation[0];
                    let personMessage = Object.entries(conversation[1]) // [ ['0', {"0":"me"}], ['1', {"1":"name"}] ]
                    let lastMsgEntry = Object.entries(personMessage[personMessage.length - 1][1])[0][1]
                    return (
                        <div title={personName} className="w-[90%] px-2 py-1 my-2 mx-auto cursor-pointer bg-slate-200 hover:bg-slate-300" key={`conversations_${indx}`} onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation();
                            setChatWith({
                                ...chatWith,
                                contact: e.target.attributes.title.value,
                            });
                        }}>
                            <p className='text-slate-900 pointer-events-none'>
                                {personName}
                            </p>
                            <p className='w-[90%] text-slate-600 ml-auto pointer-events-none'>
                                {lastMsgEntry}
                            </p>
                        </div>
                    )
                })
            )
        } else {
            return (
                <p className='absolute text-slate-500 w-full text-center top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]' >CONVERSATIONS</p>
            )
        }
    }

    return (
        <div className='h-full w-full relative flex flex-col'>
            <nav className="topNav bg-slate-200 flex flex-row justify-between items-center p-2">
                <img src="./user.png" alt="user" className="w-[1.5rem] h-[1.5rem]" />
                <BsPlusCircleFill
                    title='New Conversation'
                    size={"1.5rem"} focusable="true"
                    className='text-slate-700 cursor-pointer transition-colors duration-75 outline-none border-none hover:text-slate-950 active:text-slate-700 '
                    onClick={(e) => {
                        e.stopPropagation();
                        setSidePannelContent("Contacts");
                    }}
                />
                <MdMoreVert
                    size={"1.5rem"}
                    className='text-slate-500 cursor-pointer transition-colors duration-75 outline-none border-none hover:text-slate-950 active:text-slate-700 '
                    onClick={(e) => {
                        e.preventDefault();
                        setShowMoreDialog(!showMoreDialog)
                    }}
                />
            </nav>

            <div className="w-full flex flex-row justify-center items-center rounded bg-slate-200 my-[5px] px-[5px]">
                <FaSearch size={"15px"} className='text-slate-500' />
                <input type="text" placeholder='Search' className='w-[calc(100%-20px)] p-[5px] flex-1 mx-1 bg-transparent outline-none border-none' />
            </div>

            <div className="w-full relative flex-1 overflow-scroll scroll-smooth">
                {
                    showMoreDialog && <Dialog dialogFor='more' setShowDialog={setShowMoreDialog} setSidePannelContent={setSidePannelContent} />
                }

                {
                    setupConversations()
                }
            </div>
        </div>
    )
}

export { DefaultSideBar }