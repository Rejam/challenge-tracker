import { Record } from "types";

interface RecordItemProps {
  record: Record;
}
export default function RecordItem({ record }: RecordItemProps) {
  return (
    <div>
      <div>{record.value}</div>
      <div>Date: {record.date}</div>
    </div>
  );
}
