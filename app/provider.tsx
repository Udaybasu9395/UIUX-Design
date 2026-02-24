"use client"
import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';

import { SettingContext } from '@/context/SettingContext';

import { UserDetailContext } from '../context/UserDetailContext';

function Provider({children}:any) {


  const [userDetail,setUserDetail] = useState();
  const [settingDetail, setSettingDetail] = useState();
    useEffect(()=>{
        CreateNewUser();
    }, [])

    const CreateNewUser=async()=>{
    const result = await axios.post('/api/user',{});
    console.log(result.data);
    setUserDetail(result.data);

}

  return (
    
      <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
        <SettingContext.Provider value={{settingDetail,setSettingDetail}}>
     <div>  {children}</div>
     </SettingContext.Provider>
      </UserDetailContext.Provider>
    
  )
}

export default Provider;
