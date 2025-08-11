
import { useState, useEffect } from "react";
import { getAIReply } from "./ai";
import { nanoid } from "nanoid";

//Components
import History from "./Components/History"
import Response from "./Components/Response"
import PromptForm from "./Components/PromptForm";


export default function App() {

  //States
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState("");
  

  //Populates the state with an empty chat
  useEffect(() => {
    if(chats.length === 0){
      const newChat = {id: nanoid(), messages: []};
      setChats([newChat]);
      setCurrentChatId(newChat.id);
    }
  }, []);

  //Finds the current chat based on the currentChatId
  const currentChat = chats.find(chat => chat.id === currentChatId);

  //Function to add a new message
  async function addMessage(formData) {

    const text = (formData.get("prompt") || "").trim();
    if(!text) return;
    
    setChats(prevChats => prevChats.map( chat => chat.id === currentChatId
      ? {...chat,messages: [...chat.messages, {role: "user", content: text}]} 
      : chat));


    const reply = await getAIReply(text);
    setChats(prevChats => prevChats.map( chat => chat.id === currentChatId
      ? {...chat,messages: [...chat.messages, {role: "ai", content: reply}]} 
      : chat));
  }

  //Function to create a new chat
  function handleNewChat(){
    const newChat = {id: nanoid(), messages: []};
    setChats(prevChats => [...prevChats, newChat]);
    setCurrentChatId(newChat.id);
  }

  //Function to select a chat
  function handleSelectChat(id) {
    setCurrentChatId(id);
  }

  //Function to delete a chatq
  function deleteChat(id) {

    setChats(prevChats =>{
      
      const updatedChats = prevChats.filter(chat => chat.id !== id);

      //If deleting the last chat, creates a new chat
      if(updatedChats.length === 0){
        const newChat = {id: nanoid(), messages: []};
        setCurrentChatId(newChat.id);
        return [newChat];
      }

      if (currentChatId === id) {
        setCurrentChatId(updatedChats[0].id);
      }

      return updatedChats

    }); 

  }


  return (
    <>
    
      <PromptForm action={addMessage}/>

      <History 
        chats={chats}
        currentChatId={currentChatId}
        onSelectChat={handleSelectChat}
        onNewChat={() => handleNewChat()}
        delete={deleteChat}
        />
      
      <Response 
        messages={currentChat?.messages ?? []}
      />

    </>
  )
}
