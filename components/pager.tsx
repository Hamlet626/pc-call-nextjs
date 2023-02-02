// import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

import _ from "lodash";
import { max, min } from "lodash";
import Link from "next/link";

export default function Pager({current,total}:any) {
    const mn=max([current-1,0])!;
    const mx=min([current+1,total]);
    const pages=_.range(mn,mx,1);
    console.log([mn,mx]);
    console.log(current);
    return (
        <div className="flex justify-center">
            <nav aria-label="Page navigation example">
                <ul className="flex list-style-none">
                    {pages.map((v,i,l)=>{
                        const cur=v==current;
                        const text=<a
                        className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none">
                            {v+1}</a>;
                        return cur?text:<Link className="page-item" href={{ pathname: "/contact", //query: { id: data.data.id, to: data.data.phone}
                        }}>text</Link>;
                        })}
                    </ul>
                </nav>
                </div>);
}

const pagebutton=(n:number,onclick:Function)=>{
    return <a
        onClick={(v)=>onclick(n)}
        className="relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 md:inline-flex"
    >
        n
    </a>
}