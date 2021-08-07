import type { Record } from "types";
import RecordItem from "components/RecordItem";

interface RecordsProps {
  records: Record[];
}
export default function Records({ records }: RecordsProps) {
  return (
    <ul>
      {records.map((record) => (
        <li key={record.id} style={{ display: "flex" }}>
          <RecordItem key={record.id} record={record} />
        </li>
      ))}
    </ul>
  );
}
