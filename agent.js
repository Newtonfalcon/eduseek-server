import { createAgent } from "langchain";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {tool} from "@langchain/core/tools"
import {tavily} from "@tavily/core"
import { MemorySaver } from "@langchain/langgraph";
import {z} from "zod"
import { system_prompt } from "./system.js";
import dotenv from "dotenv"
dotenv.config()



//models

const tavilyClient = tavily({
      apiKey:process.env.TAVILY_API
})

const model = new ChatGoogleGenerativeAI({
      model: 'gemini-2.5-flash',
      apiKey:process.env.GOOGLE_GEMINI_API
})

//tool
const websearch = tool(async ({query})=> {
      
      return await tavilyClient.search(query)
}, {
      name:"websearch",
      description:`Search the web in real-time for scholarships and funding opportunities worldwide. "
    "Use this tool to find current, reliable, and relevant scholarship information.
`,
        schema: z.object({
            query:z.string()
        })
}

)

//memory
const checkpointSaver = new MemorySaver()

//agent

export const agent = createAgent({
      model,
      tools:[websearch],
      checkpointer:checkpointSaver,
      systemPrompt:system_prompt
 
});




