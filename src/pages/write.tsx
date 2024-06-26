import Loading from "@/components/Loading";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Write = () => {
  const { status: sessionStatus } = useSession();
  const { replace } = useRouter();

  const [journalEntry, setJournalEntry] = useState("");

  const { mutate: createEntry } = api.journalling.createEntry.useMutation({
    onSuccess(data) {
      replace(`/entries/${data.id}`);
    },
  });

  useEffect(() => {
    if (sessionStatus === "unauthenticated") {
      replace("/");
    }
  }, [sessionStatus]);

  if (sessionStatus === "loading") {
    return <Loading />;
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createEntry({ content: journalEntry });
  };

  return (
    <>
      <Head>
        <title>write</title>
      </Head>
      <section className="mt-32 flex flex-col justify-center gap-10">
        <h1 className="font-poppins text-center text-4xl font-bold text-neutral-50">
          write
        </h1>
        <form
          className="flex w-full flex-col justify-center gap-5"
          onSubmit={(e) => handleFormSubmit(e)}
        >
          <textarea
            cols={30}
            rows={10}
            className="font-montserrat mx-auto rounded-sm border border-slate-800 bg-teal-300 p-5 text-gray-50 tracking-wide md:w-1/2"
            placeholder="what's on your mind?"
            value={journalEntry}
            onChange={(value) => setJournalEntry(value.target.value)}
            required
          ></textarea>
          <button
            type="submit"
            className="font-poppins mx-auto w-2/3 whitespace-pre-line rounded-sm bg-gradient-to-br from-pink-300 to-pink-400 py-3 text-xl font-bold text-gray-50 md:w-1/2"
          >
            submit 
          </button>
        </form>
      </section>
    </>
  );
};

export default Write;
