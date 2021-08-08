import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";

import TargetInput from "./targetInput";
import type { Challenge, ChallengeUnits } from "types";

const blankForm = {
  name: "",
  target: undefined,
  units: undefined,
};
interface AddChallengeProps {
  onSubmit: (challenge: Challenge) => Promise<any>;
}
export default function AddChallenge({ onSubmit }: AddChallengeProps) {
  const [newChallenge, setNewChallenge] =
    useState<Partial<Challenge>>(blankForm);
  const isValidChallenge =
    newChallenge?.name && newChallenge.target && newChallenge.units;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValidChallenge) {
      const challengeWithTime = {
        ...newChallenge,
        createdAt: new Date().toISOString(),
      } as Challenge;
      onSubmit(challengeWithTime).then(() => setNewChallenge(blankForm));
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <SimpleGrid gap={4}>
        <FormControl id="name" isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            required
            value={newChallenge?.name}
            placeholder="Challenge name"
            onChange={(e) =>
              setNewChallenge((cur) => {
                const field = { name: e.target.value };
                return cur ? { ...cur, ...field } : field;
              })
            }
          />
        </FormControl>
        <FormControl id="target" isRequired>
          <FormLabel>Target</FormLabel>
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
          <FormLabel>Units</FormLabel>
          <Select
            required
            value={newChallenge?.units}
            placeholder="Target units"
            onChange={(e) =>
              setNewChallenge((cur) => {
                const newChallenge = e.target.value as ChallengeUnits;
                const unitsField = { units: newChallenge };
                if (cur) return { ...cur, ...unitsField };
                return unitsField;
              })
            }
          >
            <option value="reps">Reps</option>
            <option value="minutes">Minutes</option>
            <option value="meters">Meters</option>
          </Select>
        </FormControl>
        <Button type="submit" disabled={!isValidChallenge}>
          Add Challenge
        </Button>
        {/* <pre>{JSON.stringify(newChallenge, null, 2)}</pre> */}
      </SimpleGrid>
    </form>
  );
}
