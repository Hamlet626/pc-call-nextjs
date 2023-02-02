import {GetStaticProps, InferGetStaticPropsType} from "next";
import styles from "../styles/Home.module.css";
import {useRouter} from "next/router";
import {TwiConv} from "../components/twi_conv/TwiConv";
import WithNaviTabs from "../components/frames/navi_tab";

export const getStaticProps:GetStaticProps<{ token: string }> = ()=>{
    return {props:{token:"getToken()"}};
}

// function App(): ReactElement {
//
//     return <div />;
// }

const SmsPage=()=>{
    const router=useRouter();
    const to=router.query["to"] as string;

    return <>
        <WithNaviTabs>
            <TwiConv args={""}/>
        </WithNaviTabs>
    </>;
}

export default SmsPage;