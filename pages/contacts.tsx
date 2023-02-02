import ContactsList from "../components/contacts/contacts_list";
import ContactDetail from "../components/contacts/contact_detail";
import WithNaviTabs from "../components/frames/navi_tab";


const ContactsPage=()=>{
    return <>
        <WithNaviTabs>
            <div className="flex flex-row relative mt-1 gap-x-4">
                <div className="basis-3/5"><ContactsList/></div>
                <div className="basis-2/5"><ContactDetail/></div>
            </div>
        </WithNaviTabs>
    </>;
}

export default ContactsPage;