import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { api } from "@/utils/api";
import { useState } from "react";

function AuthShowcase() {
  const { data: sessionData } = useSession();
  const [coinResult, setCoinResult] = useState<string | null>(null);

  const flipCoin = () => {
    const result = Math.random() < 0.5 ? "Heads" : "Tails";
    setCoinResult(result);
  };

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined,
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
       
      </p>
      <p className="text-white mt-4">
        {coinResult !== null
          ? `Coin Result: ${coinResult}`
          : "click to flip the coin"}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={flipCoin}
      >
        flip coin
      </button>
      <button
       // className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
       // onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
       
      </button>
    </div>
  );
}

export default function Home() {
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>petal pages</title>
        <meta name="description" content="a journal app" />
        <link rel="icon" href="/FloralDesign.png" />
      </Head>
      <div
        className={`flex h-screen items-center ${
          sessionData ? "bg-pink-300" : "bg-cover bg-center"
        }`}
        style={sessionData ? {} : { backgroundImage: `url(/FloralDesign.png)` }}
      >
        <div className="m-auto mt-64 flex flex-col justify-center gap-5 text-center align-middle">
          <h1 className="font-poppins bg-gradient-to-br from-orange-950 to-orange-900 box-decoration-slice bg-clip-text p-2 text-7xl font-extrabold text-transparent">
            petal pages
          </h1>
        
          <button
            onClick={sessionData ? () => void signOut() : () => void signIn()}
            className="font-poppins mx-auto rounded-sm bg-gradient-to-br from-purple-400 to-purple-500 px-20 py-2 text-2xl font-bold text-neutral-50 shadow-sm"
          >
            {sessionData ? "sign out" : "sign in"}
          </button>
          {sessionData && <AuthShowcase />}
        </div>
      </div>
    </>
  );
}
