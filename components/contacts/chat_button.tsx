import {useAtom} from "jotai";
import {contactData, twiClient} from "../../utils/provider";
import Link from "next/link";
import {useRouter} from "next/router";
import {addConversation} from "../twi_conv/api";
import {useEffect, useState} from "react";
import {Conversation} from "@twilio/conversations";

type CBProps={
    phone:string,
    id:string,
};

const ChatButton=({phone,id}:CBProps)=>{
    const router=useRouter();
    const [client,]=useAtom(twiClient);
    const [contact,setHC]=useState<Conversation|undefined|null>(undefined);
    useEffect(()=>{
        if(client.state==="hasData"&&id)
            client.data.getConversationByUniqueName(id).then((v)=>{
                console.log(v);
                setHC(v);
            }).catch((r)=>{
                setHC(null);});
    },[id,client.state]);

    let onClick=async()=>{
        if(client.state!=="hasData"||contact==undefined)return;
        if(!contact){
            let nwConvo=await client.data.createConversation({friendlyName:id,uniqueName:id});
            await nwConvo?.join();
            await nwConvo?.addNonChatParticipant("8058862860",phone);
            setHC(nwConvo);
        }
        await router.push({pathname: "/sms", query: {id: id, to: phone}});
    };

    return <>
        <div className="flex flex-col">
            <text>{client.state}</text>
            <text>{contact?.friendlyName}</text>
            <text>{client.state === "hasError" ? client?.error?.toString() :""}</text>
            <button onClick={onClick}>Sms Chat</button>
        </div>
    </>;
}

export default ChatButton;