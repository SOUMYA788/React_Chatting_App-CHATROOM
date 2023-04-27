import React, { useEffect, useState } from 'react'
import { Dialog, PageBanner } from '..'
import { IoMdPersonAdd } from 'react-icons/io';
import { useCurrentState } from '../../Context/context';

const Contacts = ({ chatWith, setChatWith, setSidePannelContent }) => {
    const [showAddContactDialog, setShowAddContactDialog] = useState(false)
    const [{ contacts, masterKey }, dispatch] = useCurrentState();

    useEffect(() => {
        if (masterKey) {
            let prevUserDetails = JSON.parse(localStorage.getItem(masterKey))
            localStorage.setItem(masterKey, JSON.stringify({
                ...prevUserDetails,
                'contacts': [
                    ...contacts
                ]
            }))
        }
    }, [contacts])

    return (
        <div className='w-full h-full flex flex-col gap-2'>
            <PageBanner bannerName="Contacts" setSidePannelContent={setSidePannelContent} />
            <div className='h-full w-full relative p-2 flex flex-col'>
                {
                    showAddContactDialog && <Dialog dialogFor="Contact" setShowDialog={setShowAddContactDialog} />
                }
                <div
                    className="w-full mx-auto px-3 py-2 flex flex-row items-center gap-5 cursor-pointer transition-colors ease-in-out duration-75 hover:bg-slate-200 active:bg-slate-100"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setShowAddContactDialog(true)
                    }}>
                    <IoMdPersonAdd
                        title='New Conversation'
                        size={"1.5rem"} focusable="true"
                        className='text-white bg-[#BF0A3A] p-1 rounded-[25px] cursor-pointer transition-colors duration-75 outline-none border-none'
                        onClick={(e) => {
                            e.stopPropagation();
                            setSidePannelContent("Contacts")
                        }}
                    />
                    <p>New Contact</p>
                </div>

                <div className='w-100 bg-slate-200 h-[2px] my-2' />

                <p className='text-lg'>Contacts</p>

                <div className='w-100 bg-slate-200 h-[2px] my-2' />

                <div className='w-full flex-1 overflow-scroll scroll-smooth'>
                    {
                        contacts.length > 0 ? contacts.map((contact, indx) => (
                            <div title={contact} className='w-full px-2 py-1 my-2 cursor-pointer hover:bg-slate-200' key={`contact_${indx}`} onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setChatWith({
                                    ...chatWith,
                                    contact: e.target.attributes.title.value,
                                });
                            }}>
                                <p className='pointer-events-none'>{contact}</p>
                            </div>
                        )) : <p className='p-2'>No Contacts Available</p>
                    }
                </div>
            </div>
        </div>
    )
}

export { Contacts } 