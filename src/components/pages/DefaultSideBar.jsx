import React, { useState } from 'react'
import { BsPlusCircleFill } from 'react-icons/bs';
import { FaSearch } from 'react-icons/fa';
import { MdMoreVert } from 'react-icons/md';
import { Dialog } from '../';

const DefaultSideBar = ({ setSidePannelContent }) => {
    const [showMoreDialog, setShowMoreDialog] = useState(false);

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
                        setSidePannelContent("Contacts")
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

            <div className="relative flex-1">
                {
                    showMoreDialog && <Dialog dialogFor='more' setShowDialog={setShowMoreDialog} setSidePannelContent={setSidePannelContent} />
                }
            </div>

            <p className='absolute text-slate-500 w-full text-center top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]' >CONVERSATIONS</p>

        </div>
    )
}

export { DefaultSideBar }