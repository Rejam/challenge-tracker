import { v4 as uuidv4 } from "uuid";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { firestore } from "lib/firebase";
import { Challenge } from "types";

export default function useChallenges() {
  const challengesRef = firestore.collection("challenges");
  const query = challengesRef.orderBy("createdAt").limit(25);
  const [result] = useCollectionData(query, {
    idField: "id",
  });

  const addChallenge = async (newChallenge: Challenge) => {
    return challengesRef.add({
      ...newChallenge,
      createdAt: new Date().toISOString(),
      id: uuidv4(),
    });
  };

  const challenges = (result || []) as unknown as Challenge[];
  return { challenges, addChallenge };
}
