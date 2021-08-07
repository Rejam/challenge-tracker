import type { Challenge } from "types";
import ChallengeItem from "./ChallengeItem";

interface ChallengesProps {
  challenges: Challenge[];
}
export default function Challenges({ challenges }: ChallengesProps) {
  return (
    <ul>
      {challenges.map((challenge) => (
        <li key={challenge.id} style={{ display: "flex" }}>
          <ChallengeItem key={challenge.id} challengeId={challenge.id} />
        </li>
      ))}
    </ul>
  );
}
