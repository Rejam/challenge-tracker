import { useState } from "react";
import { Record } from "types";

const blankForm = {
  value: 0,
  date: "",
};
interface AddRecordProps {
  onSubmit: (record: Record) => Promise<any>;
}
export default function AddRecord({ onSubmit }: AddRecordProps) {
  const [newRecord, setNewRecord] = useState<Partial<Record>>(blankForm);
  const isValidRecord = newRecord?.value && newRecord.date;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValidRecord) {
      onSubmit(newRecord as Record).then(() => setNewRecord(blankForm));
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        required
        value={newRecord?.value}
        placeholder="Value"
        onChange={(e) =>
          setNewRecord((cur) => {
            const field = { value: parseInt(e.target.value) || 0 };
            return cur ? { ...cur, ...field } : field;
          })
        }
      />
      <input
        required
        type="date"
        value={newRecord?.date}
        placeholder="Date"
        onChange={(e) =>
          setNewRecord((cur) => {
            const field = { date: e.target.value };
            return cur ? { ...cur, ...field } : field;
          })
        }
      />

      <button type="submit" disabled={!isValidRecord}>
        Add Record
      </button>
      {/* <pre>{JSON.stringify(newRecord, null, 2)}</pre> */}
    </form>
  );
}
