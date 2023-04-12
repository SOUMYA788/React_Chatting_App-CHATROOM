import React, { useState } from 'react'
import { PageBanner } from '../'

const Settings = ({setSidePannelContent}) => {
  const [userNameValue, setUserNameValue] = useState("Soumya")
  return (
    <div className='w-full h-full flex flex-col gap-2'>
      <PageBanner bannerName="Settings" setSidePannelContent = {setSidePannelContent}/>
      <form className='p-1'>
        <div className="flex flex-row items-center gap-[8%]">
          <label htmlFor="userName">User_Name</label>
          <input type="text" value={userNameValue} className='w-full flex-1 px-2 py-1 outline-none border border-slate-200' onChange={(e) => {
            e.preventDefault();
            setUserNameValue(e.target.value);
          }} disabled />
        </div>
      </form>
    </div>
  )
}

export { Settings }