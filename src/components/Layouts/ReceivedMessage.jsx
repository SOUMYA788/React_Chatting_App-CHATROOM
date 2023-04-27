import React from 'react'

const ReceivedMessage = ({ senderName, senderMessage }) => {
    return (
        <div className="bg-slate-500 self-start py-[5px] px-[10px] border-[5px] m-[3px] outline-none border-none rounded-[5px]">
            <h2 className="senderName text-slate-50 text-xs mb-[5px]">{senderName}</h2>
            <p className="senderMessage text-slate-200 text-sm mx-[5px]">{senderMessage}</p>
        </div>
    )
}

export { ReceivedMessage }