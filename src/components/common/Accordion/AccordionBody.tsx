import { AccordionPanel } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';

const AccordionBody = ({ children }: PropsWithChildren) => {
  return <AccordionPanel>{children}</AccordionPanel>;
};

export default AccordionBody;
