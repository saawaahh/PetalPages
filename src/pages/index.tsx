import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

import { api } from "@/utils/api";

export default function Home() {
  const { data: sessionData } = useSession();

  return (
    <>
      <div className="h-screen md:flex">
        <div className="flex h-2/3 items-center justify-center bg-slate-500 md:h-screen md:w-2/3">
          <div className="text-center">
            <div className="text-5xl md:text-6xl">☘️ BrainSprout</div>
            <div className="p-10">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
              exercitationem dolor consequuntur? Atque corrupti, illo magni
              aliquid maxime animi omnis vero illum soluta dolore officiis
              doloremque excepturi quae culpa velit!
            </div>
          </div>
        </div>
        <div className="flex h-1/3 items-center justify-center bg-red-200 md:h-screen md:w-1/3">
          <div className="text-center">
            <div className="mb-10 text-xl">Sign In</div>
            <button
              onClick={sessionData ? () => void signOut() : () => void signIn()}
              className="rounded-lg border-2 border-slate-100 bg-slate-100 p-6"
            >
              {sessionData ? "Sign Out" : "Sign In"}
            </button>
          </div>
        </div>
      </div>
      <Head>
        <title>BrainSprout</title>
        <meta
          name="description"
          content="A journalling app to promote recovery"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`flex h-screen items-center bg-${
          sessionData ? "bg-cyan-900" : "cover bg-center"
        }`}
        style={
          sessionData
            ? { backgroundColor: "bg-cyan-900" }
            : { backgroundImage: `url(/landing.jpeg)` }
        }
      >
        <div className="m-auto mt-64 flex flex-col justify-center gap-5 text-center align-middle">
          <h1 className="font-poppins bg-gradient-to-br from-gray-900 to-gray-900 box-decoration-slice bg-clip-text p-2 text-7xl font-extrabold text-transparent">
            BrainSprout
          </h1>
          <h2 className="font-montserrat text-bg-lime-900 text-xl">
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
