import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Button,
  RadioGroup,
  Radio,
  Stack,
} from "@chakra-ui/react";

import TargetInput from "./targetInput";
import type { Challenge, ChallengeUnits } from "types";

const blankForm = {
  name: "",
  target: 1000,
  units: "reps" as ChallengeUnits,
};
interface AddChallengeProps {
  onSubmit: (challenge: Challenge) => Promise<any>;
}
export default function AddChallenge({ onSubmit }: AddChallengeProps) {
  const [newChallenge, setNewChallenge] =
    useState<Partial<Challenge>>(blankForm);
  const isValidChallenge =
    newChallenge?.name && newChallenge.target && newChallenge.units;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValidChallenge) {
      onSubmit(newChallenge as Challenge).then(() =>
        setNewChallenge(blankForm)
      );
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <SimpleGrid gap={[4]}>
        <FormControl id="name" isRequired>
          <FormLabel>Challenge name</FormLabel>
          <Input
            required
            value={newChallenge?.name}
            onChange={(e) =>
              setNewChallenge((cur) => {
                const field = { name: e.target.value };
                return cur ? { ...cur, ...field } : field;
              })
            }
          />
        </FormControl>
        <FormControl id="target" isRequired>
          <FormLabel>Target amount</FormLabel>
          <TargetInput
            value={newChallenge?.target}
            onChange={(newTarget) =>
              setNewChallenge((cur) => {
                const field = { target: newTarget };
                if (cur) return { ...cur, ...field };
                return field;
              })
            }
          />
        </FormControl>
        <FormControl id="units" isRequired>
          <FormLabel>Target units</FormLabel>
          <RadioGroup
            value={newChallenge?.units}
            onChange={(unit) =>
              setNewChallenge((cur) => {
                const newChallenge = unit as ChallengeUnits;
                const unitsField = { units: newChallenge };
                if (cur) return { ...cur, ...unitsField };
                return unitsField;
              })
            }
          >
            <Stack direction="row">
              <Radio value="reps">Reps</Radio>
              <Radio value="minutes">Minutes</Radio>
              <Radio value="meters">Meters</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
        <Button type="submit" disabled={!isValidChallenge}>
          Add Challenge
        </Button>
        {/* <pre>{JSON.stringify(newChallenge, null, 2)}</pre> */}
      </SimpleGrid>
    </form>
  );
}
