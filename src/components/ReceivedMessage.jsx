import React from 'react'

const ReceivedMessage = ({ sender_name, sender_message }) => {
    return (
        <div className="bg-slate-600 self-start py-[5px] px-[10px] border-[5px] m-[3px] outline-none border-none rounded-[5px]">
            <h2 className="sender_name text-white text-xs mb-[5px]">{sender_name}</h2>
            <p className="sender_message text-slate-300 text-sm mx-[5px]">{sender_message}</p>
        </div>
    )
}

export { ReceivedMessage }