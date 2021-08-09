import { firestore } from "lib/firebase";
import { v4 as uuidv4 } from "uuid";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";

import type { Record } from "types";

export default function useChallenge(challengeId: string) {
  const navigate = useNavigate();
  const challengeRef = firestore.doc("challenges/" + challengeId);
  const [challenge, loading, error] = useDocumentData(challengeRef);

  const records: Record[] = challenge?.records || [];

  const deleteChallenge = async () => {
    if (!challenge) return Promise.reject();
    await challengeRef.delete();
    navigate("/");
    return Promise.resolve();
  };

  const addRecord = async (newRecord: Record) => {
    if (!challenge) return Promise.reject();
    return challengeRef.update({
      records: [
        {
          ...newRecord,
          createdAt: new Date().toISOString(),
          id: uuidv4(),
        },
        ...records,
      ],
    });
  };

  const deleteRecord = (recordId: string) => async () => {
    if (!recordId || !challenge) return Promise.reject();
    const idx = records.findIndex((record) => record.id === recordId);
    return challengeRef.update({
      records: [...records.slice(0, idx), ...records.slice(idx + 1)],
    });
  };

  return {
    error,
    loading,
    challenge,
    deleteChallenge,
    addRecord,
    deleteRecord,
  };
}
