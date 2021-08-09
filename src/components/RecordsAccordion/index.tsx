import {
  Text,
  useColorModeValue,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

import RecordItem from "components/RecordItem";
import type { ChallengeUnits, Record } from "types";

export default function RecordsAccordion({
  records,
  unit,
  deleteRecord,
}: {
  records: {
    [x: string]: Record[];
  };
  unit: ChallengeUnits;
  deleteRecord: any;
}) {
  const headerBg = useColorModeValue("gray.50", "gray.900");
  const hoverBg = useColorModeValue("gray.100", "gray.800");

  return (
    <Accordion allowMultiple colorScheme="red">
      {Object.entries(records).map(([key, groupedRecords]) => {
        return (
          <AccordionItem key={key}>
            <AccordionButton
              bg={headerBg}
              _hover={{ bg: hoverBg }}
              _active={{ bg: hoverBg }}
            >
              <Text flex={1} textAlign="start" textTransform="uppercase">
                {key}
              </Text>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              {groupedRecords.map((record: Record) => (
                <RecordItem
                  key={record.id}
                  record={record}
                  unit={unit}
                  deleteRecord={deleteRecord(record.id)}
                />
              ))}
            </AccordionPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
