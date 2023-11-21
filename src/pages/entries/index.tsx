import NoEntries from "@/components/NoEntries";
import Loading from "@/components/Loading";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";

const Entries = () => {
    const { status: sessionStatus } = useSession(); 
    const {replace} = useRouter();

    const { data: entriesData } = api.journalling.getAllEntries.useQuery(
        undefined,
        {
          enabled: sessionStatus === "authenticated",
        },
      );

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
            <title>Entries</title>

        </Head>
        <section className="mt-32 flex flex-col justify-center gap-10">
            <h1 className="text-center font-poppins text-4xl font-bold text-neutral-50">
                Entries
            </h1>
            <NoEntries/>
           
        </section>
    </>
 
    );
};


export default Entries;