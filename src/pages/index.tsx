import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

import { api } from "@/utils/api";

export default function Home() {
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>BrainSprout</title>
        <meta name="description" content="A journalling app to promote recovery" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`flex h-screen items-center bg-${sessionData ? 'bg-cyan-900' : 'cover bg-center'}`}
        style={sessionData ? { backgroundColor: 'bg-cyan-900' } : { backgroundImage: `url(/landing.jpeg)` }}
      >
        <div className="m-auto mt-64 flex flex-col justify-center gap-5 text-center align-middle">
          <h1 className="font-poppins bg-gradient-to-br from-gray-900 to-gray-900 box-decoration-slice bg-clip-text p-2 text-7xl font-extrabold text-transparent">
            BrainSprout
          </h1>
          <h2 className="font-montserrat text-xl text-bg-lime-900">
            sprout your recovery
          </h2>
          <button
            onClick={sessionData ? () => void signOut() : () => void signIn()}
            className="font-poppins mx-auto rounded-sm bg-gradient-to-br from-teal-800 to-teal-900 px-20 py-2 text-2xl font-bold text-neutral-50 shadow-sm"
          >
            {sessionData ? "Sign Out" : "Sign In"}
          </button>
        </div>
      </div>
    </>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
