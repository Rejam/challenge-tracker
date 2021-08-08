import AddChallenge from "components/AddChallenge";
import ChallengeCard from "components/ChallengeCard";
import useChallenges from "lib/hooks/useChallenges";

export default function Home() {
  const { addChallenge, challenges } = useChallenges();

  return (
    <main>
      <AddChallenge onSubmit={addChallenge} />
      <ul>
        {challenges &&
          challenges.map((challenge) => (
            <li key={challenge.id} style={{ display: "flex" }}>
              <ChallengeCard challenge={challenge} />
            </li>
          ))}
      </ul>
    </main>
  );
}
