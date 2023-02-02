import {useAtom} from "jotai";
import {contactData, twiClient} from "../../utils/provider";
import Link from "next/link";
import {useRouter} from "next/router";
import {addConversation} from "../twi_conv/api";
import ChatButton from "./chat_button";


const ContactDetail=()=>{
    const id=useRouter().query["id"]?.toString();
    const [data,]=useAtom(contactData(id||""));

    if(!id||data.state==="loading") return <text>Please select a contact</text>;
    if(data.state==="hasError")return <text>{data.error?.toString()}</text>;

    return <>
        <div className="flex flex-col items-center mt-2">
            <img className="pb-2" src={data.data.img}></img>
            <text className="pb-4">{data.data.name}</text>
            <text className="pb-2">{"phone"+data.data.phone}</text>
            <text className="pb-2">{"id"+data.data.id}</text>
            {/* <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {Object.entries(data.data).map((v,i,l) => (
                    <div key={v[0]} className="group relative">
                        <text>{`${v[0]}: ${v[1]}`}</text>
                    </div>
                ))}
            </div> */}
            <div className="flex flex-row items-center gap-x-6">
                <Link href={{ pathname: "/call", query: { id: data.data.id, to: data.data.phone} }}>Call</Link>
                <ChatButton phone={data.data.phone} id={data.data.id}/>
            </div>
        </div>
    </>;
}

export default ContactDetail;