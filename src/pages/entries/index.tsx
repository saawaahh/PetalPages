import NoEntries from "@/components/NoEntries";
import Loading from "@/components/Loading";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";
import moment from "moment";

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
            <title>entries</title>

        </Head>
        <section className="mt-32 flex flex-col justify-center gap-10">
            <h1 className="text-center font-poppins text-4xl font-bold text-neutral-50">
                entries
            </h1>
            {entriesData?.length === 0 ? (
                <NoEntries />
            ) : (
            entriesData?.map((entry) => (
                <Link
              href={`/entries/${entry.id}`}
              key={entry.id}
              className="mx-auto flex w-1/2 flex-row rounded-sm bg-orange-300 p-10"
            >
              <div className="truncate">
                <p className="font-poppins text-lg text-gray-50">
                  {entry.content}
                </p>
                <p className="font-montserrat text-teal-500">
                  {moment(entry.dateCreated).format("MMM Do YYYY")}
                </p>
              </div>
            </Link>
            ))
        )} 
        </section>
    </>
 
    );
};


export default Entries;