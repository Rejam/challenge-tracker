import AddRecord from "components/AddRecord";
import Records from "components/Records";
import useChallenge from "lib/hooks/useChallenge";
import type { Record } from "types";

export default function Challenge({ id }: { id: string }) {
  const { challenge, loading, error, addRecord } = useChallenge(id);

  if (error) return <div>Error</div>;
  if (loading) return <div>Loading...</div>;
  if (!challenge) return <div>Unable to retrieve challenge</div>;
  const records = challenge.records || [];
  const currentTotal = records.reduce(
    (total: number, record: Record) => (total += record.value),
    0
  );
  return (
    <main>
      <h2>{challenge.name}</h2>
      <div>
        Target: {currentTotal} / {challenge.target} {challenge.units}
      </div>
      <AddRecord onSubmit={addRecord} />
      <Records records={challenge.records || []} />
    </main>
  );
}
