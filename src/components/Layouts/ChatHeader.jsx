import React, { useEffect, useState } from 'react'

const ChatHeader = (chatWith) => {

    const [chatInfo, setChatWith] = useState({ ...chatWith })

    useEffect(() => {

        setChatWith(
            ...chatWith
        )

    }, [chatWith.online, chatWith.contact])


    const statusImage = () => {

        if (chatInfo.online === 'online' || chatInfo.online === 'typing...') {
            return (
                <span className='bg-green-500 p-[2px] mr-[12px] rounded-[50%] border border-black'>
                    <img src="./user.png" alt="user" className="w-[30px] h-[30px] border rounded-[50%] border-black" />
                </span>
            )
        } else {
            return (
                <span className='bg-red-500 p-[2px] mr-[12px] rounded-[50%] border border-black'>
                    <img src="./user.png" alt="user" className="w-[30px] h-[30px] border rounded-[50%] border-black" />
                </span>
            )
        }
    }

    return (
        <div className="w-full h-[40px] mx-auto flex flex-row items-center bg-slate-400 px-2 py-1 rounded-[5px]">

            {statusImage()}

            <span>
                <p className='text-slate-900'>{chatInfo.contact || ""}</p>
                <p className='text-slate-900'>{chatInfo.online || ""}</p>
            </span>

        </div>
    )
}

export { ChatHeader }   