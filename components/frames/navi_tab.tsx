import Link from "next/link";
import {useRouter, withRouter} from "next/router";
import {NextRouter} from "next/dist/client/router";

type childrenArg={
    children?:any
}
export const WithNaviTabs=({children}:childrenArg)=>{
    let router=useRouter();
    // router.route
    return (
        <>
            <div className="border-b border-gray-200 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                    <Tab current={router.route} link="/" text="Welcome"/>
                    <Tab current={router.route} link="/contacts" text="Contacts"/>
                    <Tab current={router.route} link="/sms" text="Chat"/>
                    <Tab current={router.route} link="/call" text="Call"/>
                    <Tab current={router.route} link="/setting" text="Setting"/>
                </ul>
            </div>
            <div>
                {children}
            </div>
        </>
    );
}

type TabArg={
    current?:string,
    text?:string,
    link:string,
}

const Tab=({current,text,link}:TabArg)=>{
    const chosen=current===link;
    console.log(chosen);

    return <Link className="mr-2" href={link}>
        <a className={`inline-flex p-4 border-b-2 rounded-t-lg group
        ${chosen?'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500 active':
        'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`}
         aria-current={chosen?'page':undefined}>
         {text}
            </a>
    </Link>;
}
export default WithNaviTabs;