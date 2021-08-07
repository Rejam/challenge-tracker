export type SignupMethod = {
  name: string;
  method: () => void;
};

export type Record = {
  id: string;
  value: number;
  date: string;
  createdAt: string;
};
export type ChallengeUnits = "meters" | "minutes" | "reps";
export type Challenge = {
  id: string;
  name: string;
  target: number;
  units: ChallengeUnits;
  createdAt: string;
  uid: string;
  records: Record[];
};
