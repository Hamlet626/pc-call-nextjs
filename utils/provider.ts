import {atom} from "jotai";

import {SearchResponse} from "@algolia/client-search";
const algoliasearch = require('algoliasearch');
const client = algoliasearch(algo_app_id, algo_key);
const users = client.initIndex("u");

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {doc, DocumentData, getDoc, getFirestore} from "@firebase/firestore";
import {atomFamily, loadable} from "jotai/utils";
import {acc_auth_token, acc_sid, algo_app_id, algo_key, firebaseConfig} from "./consts";
import {getToken} from "../components/twi_conv/api";
import {Client} from "@twilio/conversations";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// exports.db=db;
// const analytics = getAnalytics(app);


export type qryArg={
    query?:string|undefined,
    page?:number|undefined
}
export const contactList=atom<DocumentData[]>([]);
export const contactPage=atom<SearchResponse|undefined>(undefined);
export const cacheQuery=atom("");
export const contactsSetter=atom((get)=>get(contactList),
    async(get,set,args:qryArg)=>{
        console.log("searched again");
    const qry=args.query||get(cacheQuery)||"";
    const res:SearchResponse=await users.search(qry,{page:args.page});
    set(contactPage,res);
    const data=await Promise.all(res.hits.map((v,i,l)=>
        getDoc(doc(db,`u/${v.objectID}`)).then((v)=>{
            let r=v.data()||{};r["id"]=v.id;
            return r;
        })));
    set(contactList,data);
});

export const contactLoader=atomFamily((id)=>atom(async(get)=>{
    if(!id)return {};
    const all=get(contactList);
    const i=all.findIndex((v,i,l)=>v.id===id);
    if(i!=-1)return all[i];
    return await getDoc(doc(db,`u/${id}`)).then((v)=>{
        let r=v.data()||{};r["id"]=v.id;
        return r;
    });
}))

export const contactData=(id:string)=>loadable(contactLoader(id));



export const twiConvClient=atom(async(get)=>{
    let token=await getToken("","");

    let client=new Client(token,{logLevel:"error"});
    client.on("tokenAboutToExpire", () => {
        getToken("username", "password").then((token) => {
            client.updateToken(token);
        });
    });

    client.on("tokenExpired", () => {
        getToken("username", "password").then((token) => {
            client.updateToken(token);
        });
    });
    return client;
})


export const twiClient=loadable(twiConvClient);


/// ============= Twilio SMS : Deprecated =====================================
// export type smsQryArg={
//     to?:string|undefined,
//     page?:number|undefined
// }
// export const smsList=atomFamily((to)=>atom<MessageInstance[]>([]));
// export const smsTimeStamp=atomFamily((to)=>atom<Date|undefined>(undefined));
// export const smsLoader=atom((get)=>get(smsList("")),
//     async(get,set,args:smsQryArg)=>{
//     const loaded=get(smsList(args.to));
//     const res=await fetch("/api/twiSms",{
//         method: 'POST',
//         body: JSON.stringify({phoneNumber:args.to,latest:get(smsTimeStamp(args.to))?.getTime()}),
//         headers: {'Content-Type': 'application/json'}
//     });//getSms(args.to,get(smsTimeStamp(args.to)));
//         const {timeStamp,msgs}=(await res.json())as Msgs;
//         console.log("after pvd fetch");
//         console.log({timeStamp,msgs});
//     set(smsTimeStamp(args.to),timeStamp);
//     set(smsList(args.to),msgs.concat(loaded));
// });
