import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import {agent} from './agent.js'

dotenv.config()


//app set up
const app = express()
app.use(cors({origin:"*"}))
app.use(express.json())

const port = process.env.PORT || 2200

app.listen(port, ()=> {
      console.log(`listening on port ${port}`)
})


//agent 

app.post("/", async (req, res)=>{
     
      try {

             const {prompt, threadid} = req.body
             if(!prompt) {
                  return res.status(400).json({message:"prompt required"})
             }

              if(!threadid) {
                  return res.status(400).json({message:"no thread id"})
             }

      const response = await agent.invoke({
      messages: [
            {
                  role:"user",
                  content:prompt
            }
      ]
}, {
      configurable:{thread_id: threadid}
})
      console.log(threadid)
      return res.status(200).json(response.messages.at(-1)?.content)



            
      } catch (error) {
            return res.status(500).json({message: error.message})
      }

})
