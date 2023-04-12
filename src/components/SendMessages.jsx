import React from 'react'

const SendMessages = ({ my_message }) => {
    console.log("myMsg", my_message);
    return (
        <div className="bg-slate-600 self-end py-[5px] px-[10px] border-[5px] m-[3px] outline-none border-none rounded-[5px]">
            <p className="sender_message text-slate-300 text-sm mx-[5px]">{my_message}</p>
        </div>
    )
}

export { SendMessages } 