import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { api } from "@/lib/axios";

type Status = "waiting" | "converting" | "uploading" | "generating" | "sucess"


interface Prompt{
  id:string
  title:string
  template:string
}
interface PromptSelectProps{
  onPromptSelected: (template:string) => void
}
export function PromptSelect(props:PromptSelectProps){
   const [status] = useState<Status>("waiting")

  const [prompts,setPrompts] = useState<Prompt[] | null>(null)
  useEffect(()=>{
   api.get('/prompts').then(response=>{
    
    setPrompts(response.data)
   })
  },[])
  
  function handlePromptSelected(promptId:string){
    const selectedPrompt= prompts?.find(prompt=>prompt.id===promptId)

    if(!selectedPrompt){
      return
    }

    props.onPromptSelected(selectedPrompt.template)
  }

  return (
    <Select onValueChange={handlePromptSelected} disabled={status != "waiting"}>
      <SelectTrigger>
        <SelectValue placeholder="Selecione um prompt"></SelectValue>
      </SelectTrigger>
      <SelectContent>
        {prompts?.map((prompt) => {
          return (
            <SelectItem key={prompt.id} value={prompt.id}>
              {prompt.title}
            </SelectItem>
          )
        })}
        <SelectItem value="description"> </SelectItem>
      </SelectContent>
    </Select>
  )
}