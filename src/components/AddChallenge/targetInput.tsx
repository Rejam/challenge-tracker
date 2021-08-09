import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  SimpleGrid,
  // Slider,
  // SliderTrack,
  // SliderFilledTrack,
  // SliderThumb,
} from "@chakra-ui/react";

const inputProps = {
  min: 1,
  max: 10000,
  step: 10,
  precision: 0,
};
interface TargetInputProps {
  value: number | undefined;
  onChange: (newTarget: number) => void;
}
export default function TargetInput({ value, onChange }: TargetInputProps) {
  const handleChange = (newTargetString: string | number) => {
    const newTarget = parseInt(newTargetString + "") || 0;
    onChange(newTarget);
  };
  return (
    <SimpleGrid gap={8}>
      <NumberInput
        required
        value={value}
        onChange={handleChange}
        placeholder="Challenge target"
        {...inputProps}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      {/* <Slider
        value={value}
        onChange={handleChange}
        color="black"
        {...inputProps}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb fontSize="xs" boxSize="40px" children={value} />
      </Slider> */}
    </SimpleGrid>
  );
}
