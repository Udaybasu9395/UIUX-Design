import React from 'react';

import { GripVertical } from 'lucide-react';
import { Rnd } from 'react-rnd';

import { themeToCssVars } from '@/data/Themes';
import { ProjectType } from '@/type/types';

type Props = {
    x:number,
    y:number,
    setPanningEnabled: (enabled: boolean) => void,
    width:number,
    height:number,
    htmlcode:string | undefined,
    projectDetail:ProjectType | undefined
}

function ScreenFrame({x,y, setPanningEnabled, width, height, htmlcode, projectDetail}:Props) {

    const html = `
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">

  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://code.iconify.design/iconify-icon/1.0.0/iconify-icon.min.js"></script>
  <style>
    ${themeToCssVars
        (projectDetail?.theme)}
  </style>
</head>
<body class="bg-[var(--background)] text-[var(--foreground)] w-full">
  ${htmlcode ?? ""}
</body>
</html>
`;

  return (
    <Rnd
    default={{
        x,
        y,
        width:width,
        height:height
    }}
    dragHandleClassName='drag-handle'
    enableResizing={{
        bottomRight:true,
        bottomLeft:true,
    }}
    onDragStart={()=>setPanningEnabled(false)}
    onDragStop={()=>setPanningEnabled(true)}
    onResizeStart={()=>setPanningEnabled(false)}
    onResizeStop={()=>setPanningEnabled(true)}
    >
        <div className='drag-handle flex gap-2 items-center cursor-move bg-white rounded-lg p-4'>
            <GripVertical className='text-gray-500 h-6 w-4'/> Drag Here
        </div>
        <div className='bg-white p-5 h-full'>
     
        </div>
    <iframe className='w-full h-[calc(100%-40px)] bg-white' rounded-2xl mt-3
    sandbox='allow-same-origin allow-scripts'
    srcDoc={htmlcode}
    />

    </Rnd>
  )
}

export default ScreenFrame
