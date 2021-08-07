import AddChallenge from "components/AddChallenge";
import useChallenges from "lib/hooks/useChallenges";
import Challenges from "components/Challenges";

export default function AuthenticatedAppView() {
  const { addChallenge, challenges } = useChallenges();

  return (
    <div>
      <AddChallenge onSubmit={addChallenge} />
      <Challenges challenges={challenges} />
    </div>
  );
}
