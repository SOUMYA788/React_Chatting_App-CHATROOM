import React from 'react'
import { TbArrowLeft } from 'react-icons/tb'

const PageBanner = ({ bannerName, setSidePannelContent }) => {
    return (
        <div className='h-[100px] w-full bg-[#BF0A3A] flex items-end py-[5px]'>
            <div className='flex flex-row items-center justify-between px-2 h-[50px] w-full text-[25px] text-white font-rubik '>
                <TbArrowLeft size={"25px"} className='text-white cursor-pointer' onClick={(e) => { 
                    e.stopPropagation();
                    setSidePannelContent("DefaultSideBar");
                }} />
                {bannerName}
            </div>
        </div>
    )
}

export { PageBanner }