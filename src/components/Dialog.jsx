import React, { useEffect, useState } from 'react'
import { FiCheck } from "react-icons/fi"
import { HiOutlineX } from "react-icons/hi"
import { useCurrentState } from '../Context/context';

const Dialog = ({ dialogFor, setShowDialog, setSidePannelContent }) => {
    const [contactName, setContactName] = useState("")
    const [{ contacts, masterKey }, dispatch] = useCurrentState()

    useEffect(() => {
        console.log(contacts);
        if (masterKey) {
            let prevUserDetails = JSON.parse(localStorage.getItem(masterKey))
            localStorage.setItem(masterKey, JSON.stringify({
                ...prevUserDetails,
                contacts
            }))
        }
    }, [contacts])


    const manageDialog = () => {
        if (dialogFor === "more") {
            return (
                <ul className='list-none w-fit h-fit px-[10px] py-[5px] backdrop-blur-md  bg-slate-200 bg-opacity-50 flex flex-col gap-[5px]'>
                    <li
                        className='py-[5px] px-[10px] text-slate-700 cursor-pointer transition-colors duration-300 outline-none border-none  active:bg-slate-500  hover:bg-slate-400'
                        onClick={(e) => {
                            e.stopPropagation();
                            setSidePannelContent("Settings")
                        }}>
                        Settings
                    </li>
                    <li className='py-[5px] px-[10px] text-slate-700 cursor-pointer transition-colors duration-300 outline-none border-none  active:bg-slate-500  hover:bg-slate-400'
                        onClick={(e) => {
                            e.stopPropagation();
                            console.log("click on log out, and handel this...");
                        }}>
                        Log out
                    </li>
                </ul>
            )
        } else if ("Contact") {
            return (
                <div className="h-full w-full backdrop-blur-sm" >
                    <form className='bg-slate-200 p-2' onSubmit={(e) => {
                        e.preventDefault();
                        if (!contacts.includes(contactName)) {
                            dispatch({
                                type: "update_contacts",
                                newContact: contactName
                            })
                        }

                        if (contactName.length) {
                            setShowDialog(false);
                        }
                    }} onClick={(e) => {
                        e.stopPropagation();
                    }}>
                        <input type="text" placeholder='Person Username' value={contactName} onChange={(e) => { setContactName(e.target.value) }} className='w-full px-3 py-1 my-2 border border-slate-800 text-slate-600 outline-none bg-transparent' />
                        <div className="w-full max-w-[200px] flex flex-row items-center justify-between gap-2 px-2 mx-auto my-2 sm:w-[200px]">
                            <button className='w-fit h-fit' type="button" onClick={(e) => {
                                e.stopPropagation();
                                setShowDialog(false);
                            }}>
                                <HiOutlineX size={"2rem"} className='bg-[#BF0A3A] mx-auto p-2 rounded-[50%] transition-colors duration-100 hover:bg-red-600 active:bg-[#BF0A3A]' />
                            </button>
                            <button className='w-fit h-fit' type="submit">
                                <FiCheck size={"2rem"} className='bg-green-400 mx-auto p-2 rounded-[50%] transition-colors duration-100 hover:bg-green-500 active:bg-green-400' />
                            </button>
                        </div>
                    </form>
                </div>
            )
        }
    }

    return (
        <div
            className='w-full h-full absolute left-0 top-0 p-2 flex justify-end z-10 bg-transparent'
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowDialog(false);
            }}>
            {
                manageDialog()
            }
        </div>
    )
}

export { Dialog }