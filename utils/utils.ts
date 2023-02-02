import type { NextApiRequest, NextApiResponse } from 'next'
import {acc_auth_token, acc_sid, api_key_sid, api_secret, app_sid} from "./consts";
import {MessageInstance} from "twilio/lib/rest/api/v2010/account/message";
const AccessToken = require('twilio').jwt.AccessToken;
const VoiceGrant = AccessToken.VoiceGrant;

const twiclient = require('twilio')(acc_sid, acc_auth_token,
    // {logLevel: 'debug'}
);

export const getToken=()=>{
    const accessToken = new AccessToken(acc_sid,
        api_key_sid, api_secret);
    // accessToken.identity = clientName;

    const grant = new VoiceGrant({
        outgoingApplicationSid: app_sid,
        incomingAllow: true,
    });
    accessToken.addGrant(grant);

    return accessToken.toJwt();
}

export const getSms=async (number:string|undefined,timeStamp:Date|undefined):Promise<[Date, MessageInstance[]]>=>{
    number=number?.replace(/[- )(]/g, "");
    if(number&&!number?.startsWith("+1"))number=`+1${number}`;
    const nw1=await twiclient.messages.list({
        to:number,from:"+18058862860",
        dateSentBefore:timeStamp,limit:20,pageSize:20
    },undefined);
    const nw2=await twiclient.messages.list({
        from:number,to:"+18058862860",
        dateSentBefore:timeStamp,limit:20,pageSize:20
    },undefined);
    console.log(nw1);
    console.log(nw2);
    const latest=nw1.length+nw2.length===0?undefined:
        nw1.length===0?nw2[0].dateSent:nw2.length===0?nw1[0].dateSent:
            nw1[0].dateSent>nw2[0].dateSent?nw2[0].dateSent:nw1[0].dateSent;
    let r=new Array(0);
    if(latest){
        r.concat(nw1.filter(( v:any)=>v.dateSent>=latest));
        r.concat(nw2.filter(( v:any)=>v.dateSent>=latest));}
    r=r.sort((a,b)=>b.dateSent-a.dateSent);
    return [latest,r];
}