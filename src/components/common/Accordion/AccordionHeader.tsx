import { AccordionButton, AccordionIcon } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';

const AccordionHeader = ({ children }: PropsWithChildren) => {
  return (
    <h2>
      <AccordionButton>
        {children}
        <AccordionIcon />
      </AccordionButton>
    </h2>
  );
};

export default AccordionHeader;
