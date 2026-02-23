"use client"
import {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import { Loader2Icon } from 'lucide-react';
import { useParams } from 'next/navigation';

import {
  ProjectType,
  ScreenConfig,
} from '@/type/types';

import Canvas from './_shared/Canvas';
import ProjectHeader from './_shared/ProjectHeader';
import SettingsSection from './_shared/SettingsSection';

function ProjectCanvasPlayground() {

const {projectId}=useParams();
const [projectDetail,setProjectDetail]= useState<ProjectType>();
const [screenConfigOriginal,setScreenConfigOriginal]=useState<ScreenConfig[]>([]);
const [screenConfig,setScreenConfig]=useState<ScreenConfig[]>([]);
const [loading,setLoading]=useState(true);
const [loadingMsg,setLoadingMsg]=useState('Loading');

useEffect(()=>{
  projectId && GetProjectDetail();
}, [projectId]);

const GetProjectDetail=async ()=>{
  setLoading(true);
  setLoadingMsg('Loading...');
  const result=await axios.get('/api/project?projectId='+projectId);
  console.log(result.data);
  setProjectDetail(result?.data?.projectDetail);
  setScreenConfigOriginal(result?.data?.screenConfig);
  setScreenConfig(result?.data?.screenConfig);
  // if(result.data?.screenConfig.length === 0){
  //   generateScreenConfig();
  // }
  setLoading(false);
}

useEffect(()=>{
  if(projectDetail&&setScreenConfigOriginal&&setScreenConfigOriginal.length === 0){
    generateScreenConfig();
  }
else if(projectDetail&&screenConfigOriginal){
  console.log('EXCU')
  GenerateScreenUIUX();
}

},[projectDetail, screenConfigOriginal])


const generateScreenConfig=async ()=>{
  
   setLoading(true);
   setLoadingMsg('Generating Screen Config...');
   const result=await axios.post('/api/generate-config',{
    projectId: projectId,
    deviceType: projectDetail?.device,
    userInput:projectDetail?.userInput
   })

   console.log(result.data);
   GetProjectDetail();
  
    setLoading(false);
  }

  const GenerateScreenUIUX =async ()=>{
    setLoading(true);

    for(let index=0;index<screenConfig.length;index++){
      const screen=screenConfig[index];
      if(screen?.code) continue;
      setLoadingMsg('Generating Screen '+index+1)

      const result = await axios.post('/api/generate-screen-ui',{
        projectId,
        screenId:screen?.screenId,
        screenName:screen?.screenName,
        purpose:screen?.purpose,
        screenDescription:screen?.ScreenDescription
      });
    
      setScreenConfig(prev => prev.map((item,i)=>(i=== index ? result.data : item)))

    }
setLoading(false);
  }

  return (
    <div>
      <ProjectHeader/>

      <div className='flex '>


       {loading && <div className='p-3 absolute bg-blue-300/20 border-blue-400 border rounded-xl left-1/2 top-20'>
          <h2  className='flex gap-2 items-center'><Loader2Icon className='animate-spin'/>
          {loadingMsg}
          </h2>
        </div>}
        {/*Settings*/}
        <SettingsSection projectDetail={projectDetail}/>


        {/*Canvas*/}
       <Canvas projectDetial={projectDetail} screenConfig={screenConfig} />

      </div>
    </div>
  )
}

export default ProjectCanvasPlayground
