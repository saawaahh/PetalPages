import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";



const Entry = () => {
  
  const { status: sessionStatus } = useSession();
  const { replace, query } = useRouter();


  useEffect(() => {
    if (sessionStatus === "unauthenticated") {
      replace("/");
    }
  }, [sessionStatus]);
  return (
    <>
      <Head>
        <title>Entry</title>
      </Head>

      <section className="mt-32 flex flex-col justify-center gap-10"> </section>
    
    
    
    
    </>





  )
};


export default Entry;
