import ContactsList from "../components/contacts/contacts_list";
import ContactDetail from "../components/contacts/contact_detail";
import WithNaviTabs from "../components/frames/navi_tab";
import {GetStaticProps, InferGetStaticPropsType} from "next";
import {getToken} from "../utils/utils";
import {doc, getDoc} from "@firebase/firestore";
import {db} from "../utils/provider";

export const getStaticProps:GetStaticProps<{ data: any }> = async()=>{
    let data=await getDoc(doc(db,`u/x6VqI5gYfWXvfu5siWqq5xVrhmz1`)).then((v)=>{
        let r=v.data()||{};r["id"]=v.id;
        return r;
    });
    return {props:{data:data}};
}

const ContactsPage=({data}:InferGetStaticPropsType<typeof getStaticProps>)=>{
    return <>
        <WithNaviTabs>
            <div className="flex flex-row relative mt-1 gap-x-4">
                <div className="basis-3/5"><ContactsList/></div>
                <div>`${data}`</div>
                {/*<div className="basis-2/5"><ContactDetail/></div>*/}
            </div>
        </WithNaviTabs>
    </>;
}

export default ContactsPage;