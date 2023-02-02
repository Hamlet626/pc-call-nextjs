import {useEffect, useRef} from "react";
import {useAtom} from "jotai";
import {contactList, contactPage, contactsSetter} from "../../utils/provider";
import {useUpdateAtom} from "jotai/utils";
import Link from "next/link";
import Pager from "../pager";
import { useRouter } from "next/router";


const ContactsList=()=>{
    const [data,]=useAtom(contactList);
    const [page,]=useAtom(contactPage);
    const search=useUpdateAtom(contactsSetter);
    const router=useRouter();
    const query=router.query.query?.toString();
    const text=useRef(query);

    useEffect(()=>{
        search({query:query});
    },[query]);

    return <>
        <div>
            <div className="flex justify-center">
                <div className="mb-3 xl:w-96">
                    <div className="input-group relative flex flex-row items-stretch w-full mb-4">
                        <input type="search" className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                        placeholder="Search" aria-label="Search" aria-describedby="button-addon3"
                        // value={text.current}
                        onChange={(v)=>text.current=v.target.value}/>
                        <button className="btn inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" type="button" id="button-addon3"
                        onClick={()=>{
                            const qr=router.query;
                            qr.query=text.current;
                            router.push({pathname:"/contacts",query:qr});}}>Search</button>
                        </div>
                        </div>
                        </div>
            <div className="mt-4 grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {data.map((v,i,l) => (
                    <Link href={{ pathname: "/contacts", query: { id: v.id, to: v.phone,query:query} }} key={v.id}>
                        <div className="block p-2 h-24 rounded-lg shadow-lg bg-white max-w-sm">
                            <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">{v.name}</h5>
                            <p className="text-gray-700 text-base mb-4">{v.phone}</p>
                            </div>
                        </Link>
                ))}
            </div>
            <Pager current={page?.page} total={page?.nbPages}></Pager>
        </div>
    </>;
}

export default ContactsList;