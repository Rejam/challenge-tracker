import { firestore } from "lib/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { Record } from "types";

export default function useChallenge(challengeId: string) {
  const challengeRef = firestore.doc("challenges/" + challengeId);
  const [challenge, loading, error] = useDocumentData(challengeRef);

  const addRecord = async (newRecord: Record) => {
    if (!challenge) return null;
    return challengeRef.update({
      records: [
        {
          ...newRecord,
          createdAt: new Date().toISOString(),
        },
        ...(challenge.records || []),
      ],
    });
  };

  return {
    error,
    loading,
    challenge,
    addRecord,
  };
}
