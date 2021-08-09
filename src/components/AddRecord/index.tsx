import { useState } from "react";
import { FormControl, FormLabel, Input, Button, Grid } from "@chakra-ui/react";

import type { Record } from "types";

const blankForm = {
  value: 0,
  date: new Date().toISOString().split("T")[0],
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
      onSubmit(newRecord as Record).then(() => {
        console.log("added");
        setNewRecord((cur) => ({ ...cur, value: 0 }));
      });
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Grid
        gap={[4]}
        gridTemplateColumns={["repeat(auto-fit, minmax(120px, 1fr))"]}
      >
        <FormControl id="value" isRequired>
          <FormLabel>Value</FormLabel>
          <Input
            required
            value={newRecord?.value}
            placeholder="Value"
            onChange={(e) =>
              setNewRecord((cur) => {
                const field = { value: parseInt(e.target.value) || 0 };
                if (cur) return { ...cur, ...field };
                return field;
              })
            }
          />
        </FormControl>
        <FormControl id="date" isRequired>
          <FormLabel>Date</FormLabel>
          <Input
            required
            value={newRecord?.date}
            type="date"
            placeholder="Date"
            onChange={(e) =>
              setNewRecord((cur) => {
                const field = { date: e.target.value };
                if (cur) return { ...cur, ...field };
                return field;
              })
            }
          />
        </FormControl>

        <Button
          gridColumn={-2}
          mt="auto"
          type="submit"
          disabled={!isValidRecord}
          colorScheme="accent"
        >
          Add Record
        </Button>
        {/* <pre>{JSON.stringify(newRecord, null, 2)}</pre> */}
      </Grid>
    </form>
  );
}
