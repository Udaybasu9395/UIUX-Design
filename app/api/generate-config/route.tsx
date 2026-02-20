import {
  NextRequest,
  NextResponse,
} from 'next/server';

import { db } from '@/config/db';
import { openrouter } from '@/config/openrouter';
import {
  ProjectTable,
  ScreenConfigTable,
} from '@/config/schema';
import { APP_LAYOUT_CONFIG_PROMPT } from '@/data/Prompt';

export async function POST(req:NextRequest){
const {userInput,deviceType,projectId}= await req.json();

const aiResult = await openrouter.chat.send({
  model: "openai/gpt-5.1-codex-mini",
  messages: [
    {
            role='system',
            content:[
                {
                    type:'text',
                    text:APP_LAYOUT_CONFIG_PROMPT.replace('{device}', deviceType)
                }
            ]
    },
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": userInput
        },
      ]
    }
  ],
  stream: false
});


const JSONAiResult= JSON.parse(aiResult?.choices[0]?.message?.content as string);

if(JSONAiResult){
//Update Project Table with Project Name
await db.update(ProjectTable).set({
    projectVisualDiscription:
    JSONAiResult?.projectVisualDescription,
    projectName: JSONAiResult?.projectName,
    theme: JSONAiResult?.theme
    //@ts-ignore
}).where(eq(ProjectTable.projectId,projectId as string))

//Insert Screen Config



JSONAiResult.screen?.forEach(async(screen:any)=>{
    const result = db.insert(ScreenConfigTable).values({
        projectId:projectId,
        purpose: screen?.purpose,
        screenDescription: screen?.layoutDescription,
        screenId:screen?.id,
        screenName: screen?.name

    })
})

return NextResponse.json(JSONAiResult);
}
else{
    NextResponse.json({msg:'Internal server error'})
}



}
    
