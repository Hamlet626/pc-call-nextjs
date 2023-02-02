import {fetch} from "next/dist/compiled/@edge-runtime/primitives/fetch";
import {Call, Device} from "@twilio/voice-sdk";
import Codec = Call.Codec;
import {GetStaticProps, InferGetStaticPropsType} from "next";
import React, {useEffect, useMemo, useRef, useState} from "react";
import {getToken} from "../utils/utils";
import styles from "../styles/Home.module.css";
import {useRouter} from "next/router";
import {useAtom} from "jotai";
import {contactData, contactLoader} from "../utils/provider";
import {Spinner} from "@twilio-paste/core";
import WithNaviTabs from "../components/frames/navi_tab";

export const getStaticProps:GetStaticProps<{ token: string }> = ()=>{
    return {props:{token:getToken()}};
}

const CallPage=({token}:InferGetStaticPropsType<typeof getStaticProps>)=>{
    const device=useRef<Device|null>(null);
    const [text,setText]=useState("call");
    const router=useRouter();
    const id=router.query["id"];
    const [data,]=useAtom(contactData(`${id}`));
    useEffect(()=>{
        device.current=new Device(token,{
            codecPreferences:[Codec.Opus, Codec.PCMU],
        });
        device.current.on("connect",(conn)=>{
            console.log("connected!");
            console.log(conn.message);
        });
        device.current.on("error", function(error) {
            setText(error.message);
            console.log("Twilio.Device Error: " + error.message);
        });
        // device.current.register().then((v)=>{console.log(device.current?.state);});
        return ()=>{if(device.current?.state==Device.State.Registered)
            device.current?.unregister();};
    },[]);

    return <>
        <WithNaviTabs>
            <div className={styles.description}>
                {data.state==="hasData"?<button onClick={async ()=>{
                console.log(device.current);
                await device.current?.connect({params:{"phoneNumber": data.data.phone||"+13235528066"}}).then((v)=>{v.on("error", function(error) {
                    setText(error.message);
                    console.log("Twilio.Device Error: " + error.message);
                });});
                console.log(device.current?.listeners("error"));
                console.log(device.current?.eventNames());
            }}>{"call" + data.data.phone}</button>:
                    <text>...</text>}
            </div>
        </WithNaviTabs>
    </>;
}

export default CallPage;