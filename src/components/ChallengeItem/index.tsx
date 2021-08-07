import AddRecord from "components/AddRecord";
import Records from "components/Records";
import useChallenge from "lib/hooks/useChallenge";
import { Record } from "types";

interface ChallengeItemProps {
  challengeId: string;
}
export default function ChallengeItem({ challengeId }: ChallengeItemProps) {
  const { challenge, loading, error, addRecord } = useChallenge(challengeId);

  if (error) return <div>Error</div>;
  if (loading) return <div>Loading...</div>;
  if (!challenge) return <div>Unable to retrieve challenge</div>;
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
      <Records records={challenge.records || []} />
    </div>
  );
}
