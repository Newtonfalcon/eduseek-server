import { createAgent } from "langchain";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import dotenv from "dotenv"
dotenv.config()


const model = new ChatGoogleGenerativeAI({
      model: 'gemini-2.5-flash',
      apiKey:process.env.GOOGLE_GEMINI_API
})

const agent = createAgent({
      model,
      tools:[]
 
});

const res = await agent.invoke({
      messages: [
            {
                  role:"user",
                  content:"hiii"
            }
      ]
})
console.log(res)
