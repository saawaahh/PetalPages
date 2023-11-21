import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { api } from "@/utils/api";


const write = () => {
    const { status: sessionStatus } = useSession();
    const { replace } = useRouter();

    const [journalEntry, setJournalEntry] = useState("");

    useEffect(() => {
        if (sessionStatus === "unauthenticated") {
          replace("/");
        }
      }, [sessionStatus]);
    
      if (sessionStatus === "loading") {
        return <Loading />;
      }


    return(
        <>
            <Head>
                <title>Write</title>
            </Head>
            <section className="mt-32 flex-col justify-center gap-10">
            <h1 className="font-poppins text-center text-4xl font-bold text-neutral-50">
            Write
            </h1>
            <form className="flex w-full flex-col justify-center gap-5">
                <textarea
                     cols={30}
                     rows={10}
                     className="font-montserrat mx-auto rounded-sm border border-slate-800 bg-gray-100 p-5 tracking-wide md:w-1/2"
                     placeholder="How are you feeling?"
                     value={journalEntry}
                     onChange={(value) => setJournalEntry(value.target.value)}
                     required
                
                
                ></textarea>
                <button
                    type="submit"
                    className="font-poppins mx-auto w-2/3 whitespace-pre-line rounded-sm bg-gradient-to-br from-gray-700 to-gray-800 py-3 text-xl font-bold text-gray-50 md:w-1/2"
                  >
                     Finish
               </button>
            </form>
            </section>
          </>
        );
    };

    export default write;
