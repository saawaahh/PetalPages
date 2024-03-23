import { XMarkIcon, Bars2Icon } from "@heroicons/react/20/solid"
import { signOut, useSession } from "next-auth/react";
import Link from "next/link"
import { useState } from "react"


const Navigation = () => {

    const [isOpen, setIsOpen] = useState(false);

    const { data: sessionData} = useSession();
    if (sessionData) {
    return (
    <nav className="absolute flex flex-col left-0 top-0 z-10 w-full items-center justify-between gap-8 bg-slate-50 backdrop-blur-md md:flex-row bg-transparent md:fixed  md:gap-0">
        <div className="flex w-full items-center justify-between text-neutral-100 font-poppins text-xl font-bold tracking-tight md:text-4xl">

            <Link href="/">home</Link>
            <div className="flex md:hidden" onClick={() => setIsOpen(!isOpen)}>
                
                {isOpen ? <XMarkIcon width={30} /> : <Bars2Icon width={30} />} 

            </div>
        </div>
        <ul className={'flex flex-col gap-8 md:flex-row text-neutral-100 md:items-center md:justify-end md:gap-20 md:pr-20 ${!isOpen && "hidden md:flex"'}>
            <Link href="/entries">entries</Link>           
            <Link href="/write">write</Link>
            <button className="w-min" onClick ={() => void signOut()} >logout</button>
        </ul>

    </nav>

);
    }

};

export default Navigation;
