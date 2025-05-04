import {createContext, useEffect, useState} from 'react';
import runChat from '../config/gemini';

export const Context=createContext();
const ContextProvider=(props)=>{
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara=(i,word)=>{
        setTimeout(()=>{
            setResultData(prev=>prev+word);
        },i*10);
    }

    const onSent=async (prompt)=>{
        setResultData("");
        setLoading(true);
        setShowResults(true);
        let response;
        if(prompt!==undefined){
            response = await runChat(prompt);
            setRecentPrompt(prompt)
        }
        else{
            setPrevPrompts(prev=>[...prev,input]);
            setRecentPrompt(input);
            response=await runChat(input);
        }
        try{
            let responseArray = response.split("**");
            let newResponse = "";
            for(let i=0;i<responseArray.length;i++){
                if(i==0||i%2!==1){ //even indexes
                    newResponse += responseArray[i];
                }
                else{
                    newResponse += "<b>" + responseArray[i] + "</b>";
                }
            }
            let newResponse2= newResponse.split('*').join('<br/>');
            let newResponseArray = newResponse2.split("");
            for (let i = 0; i < newResponseArray.length; i++) {
                const nextWord = newResponseArray[i];
                delayPara(i, nextWord + "");
            }
        }
        catch(error){
            console.log(error);
        }
        finally {
            setLoading(false);
            setInput("");
        }
    }

    useEffect(() => {
       // onSent('What is the capital of India?')
    }, []);



    const contextValue={
        prevPrompts,
        setPrevPrompts,
        onSent,
        input,
        setInput,
        recentPrompt,
        setRecentPrompt,
        showResults,
        resultData,
        setShowResults,
        loading,
        setLoading,
    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;