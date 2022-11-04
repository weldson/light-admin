import React from 'react';

import { ItemContainer, IconContainer, TextContainer, Text } from './styles';

interface ItemActiveProps {
  text: string;
  children: React.ReactNode;
}

export const ItemActive = ({ text, children }: ItemActiveProps) => {
  return (
    <ItemContainer>
      <IconContainer>{children}</IconContainer>
      <TextContainer>
        <Text>{text}</Text>
      </TextContainer>
    </ItemContainer>
  );
};
