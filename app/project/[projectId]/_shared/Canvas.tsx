"use client";

import React, { useState } from 'react';

import {
  Minus,
  Plus,
  RefreshCw,
} from 'lucide-react';
import {
  TransformComponent,
  TransformWrapper,
  useControls,
} from 'react-zoom-pan-pinch';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  ProjectType,
  ScreenConfig,
} from '@/type/types';

import ScreenFrame from './ScreenFrame';

type Props = {
    projectDetial:ProjectType|undefined,
    screenConfig:ScreenConfig[],
    loading?:boolean
}

function Canvas({projectDetial,screenConfig,loading}:Props) {

const [panningEnabled, setPanningEnabled] = useState(true);

const isMobile=projectDetial?.device=='mobile';

const SCREEN_WIDTH=isMobile?400:1200;
const SCREEN_HEIGHT=isMobile?800:800;
const GAP=isMobile?10:70;

const Controls = () => {
  const { zoomIn, zoomOut, resetTransform } = useControls();

  return (
    <div className="tools absolute p-2 px-3 bg-white shadow flex gap-3 rounded-4xl bottom-10 left-1/2 z-30 text-gray-500">
      <Button variant={'ghost'} size={'sm'} onClick={() => zoomIn()}><Plus/></Button>
      <Button variant={'ghost'} size={'sm'} onClick={() => zoomOut()}><Minus/></Button>
      <Button variant={'ghost'} size={'sm'} onClick={() => resetTransform()}><RefreshCw/></Button>
    </div>
  );
};


  return (
    <div className='w-full h-screen bg-gray-200'
    style={{
        backgroundImage:"radial-gradient(rgba(0,0,0,0.15) 1px, transparent 1px)",
        backgroundSize:"20px 20px"
    }}
    >
      <TransformWrapper 
      initialScale={0.7}
      minScale={0.7}
      maxScale={3}
      initialPositionX={50}
      initialPositionY={50}
      limitToBounds={false}
      doubleClick={{disabled:false}}
      panning={{disabled: !panningEnabled}}
      >
    {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <>
          <Controls />

      <TransformComponent 
    wrapperStyle={{width:"100%",height:"100%"}}>
    {screenConfig?.map((screen,index)=>(
        <div>
{screen?.code? <ScreenFrame key={index} x={index * (SCREEN_WIDTH + GAP)} y={0} 
        width={SCREEN_WIDTH}
        height={SCREEN_HEIGHT}
        setPanningEnabled={setPanningEnabled}
        htmlcode={screen?.code}
        projectDetail={projectDetial}
        
        />:<div className='bg-white rounded-2xl p-5 gap-4 flex flex-col'
        style={{
            width:SCREEN_WIDTH,
            height:SCREEN_HEIGHT
        }}
        >
 <Skeleton className='w-full rounded-lg h-10 bg-gray-200'/>
 <Skeleton className='w-[50%] rounded-lg h-20 bg-gray-200'/>
 <Skeleton className='w-[70%] rounded-lg h-30 bg-gray-200'/>
 <Skeleton className='w-[30%] rounded-lg h-10 bg-gray-200'/>
 <Skeleton className='w-full rounded-lg h-10 bg-gray-200'/>
 <Skeleton className='w-[50%] rounded-lg h-20 bg-gray-200'/>
 <Skeleton className='w-[70%] rounded-lg h-30 bg-gray-200'/>
 <Skeleton className='w-[30%] rounded-lg h-10 bg-gray-200'/>

            </div>}
        </div>
    
))}

      </TransformComponent>
      </>)}
    </TransformWrapper>
    </div>
  )
}

export default Canvas
