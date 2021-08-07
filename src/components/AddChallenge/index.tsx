import { useState } from "react";
import { Challenge, ChallengeUnits } from "types";

const blankForm = {
  name: "",
  target: 0,
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
      <input
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
      <input
        required
        value={newChallenge?.target}
        placeholder="Challenge target"
        onChange={(e) =>
          setNewChallenge((cur) => {
            const field = { target: parseInt(e.target.value) || 1000 };
            return cur ? { ...cur, ...field } : field;
          })
        }
      />

      <select
        required
        value={newChallenge?.units}
        placeholder="Target units"
        onChange={(e) =>
          setNewChallenge((cur) => {
            const field = { units: e.target.value as ChallengeUnits };
            return cur ? { ...cur, ...field } : field;
          })
        }
      >
        <option value="">Select units</option>
        <option value="reps">Reps</option>
        <option value="minutes">Minutes</option>
        <option value="meters">Meters</option>
      </select>

      <button type="submit" disabled={!isValidChallenge}>
        Add Challenge
      </button>
      {/* <pre>{JSON.stringify(newChallenge, null, 2)}</pre> */}
    </form>
  );
}
