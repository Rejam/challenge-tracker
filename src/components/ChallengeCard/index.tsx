import AddRecord from "components/AddRecord";
import { A } from "hookrouter";
import useChallenge from "lib/hooks/useChallenge";
import { Challenge, Record } from "types";

interface ChallengeCardProps {
  challenge: Challenge;
}

export default function ChallengeCard({ challenge }: ChallengeCardProps) {
  const { addRecord } = useChallenge(challenge.id);
  const records = challenge.records || [];
  const currentTotal = records.reduce(
    (total: number, record: Record) => (total += record.value),
    0
  );
  return (
    <div>
      <h2>{challenge.name}</h2>
      <div>
        Target: {currentTotal} / {challenge.target} {challenge.units}
      </div>
      <AddRecord onSubmit={addRecord} />
      <A href={`/challenges/${challenge.id}`}>View {challenge.name} details</A>
    </div>
  );
}
