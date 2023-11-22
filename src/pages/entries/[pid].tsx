import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import moment from "moment";
import { TrashIcon } from "@heroicons/react/24/solid";

const Entry = () => {
  const { status: sessionStatus } = useSession();
  const { replace, query } = useRouter();
  const entryId = Array.isArray(query.pid) ? query.pid[0] : query.pid;

  const { data: entryData, refetch: refetchEntry } =
    api.journalling.getEntryById.useQuery(
      { id: entryId! },
      {
        enabled: entryId !== undefined,
      },
    );

  const { mutate: deletionMutation } = api.journalling.deleteEntry.useMutation({
    onSuccess() {
      replace("/entries");
    },
  });

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
      <section className="mt-32 flex flex-col justify-center gap-10">
        {entryData !== null && (
          <div className="mx-auto flex w-1/2 flex-col gap-5">
            <div className="flex flex-row items-center justify-between">
              <h1 className="font-poppins text-3xl font-extrabold text-gray-50">
                {moment(entryData?.dateCreated).format("MMMM Do YYYY")}
              </h1>
        
              <button
                className="rounded-sm bg-gradient-to-br from-gray-700 to-gray-800 p-2"
                onClick={() => deletionMutation({ id: entryId! })}
              >
                <TrashIcon width={25} className="text-gray-50" />
              </button>
            </div>

            <p className="font-montserrat whitespace-pre-line bg-gray-900 p-5 text-lg text-gray-50">
              {entryData?.content}
            </p>
          </div>
        )}
      </section>
    </>
  );
};

export default Entry;
