import React from 'react';

import { ItemContainer, IconContainer, TextContainer, Text } from './styles';

interface ItemProps {
  text: string;
  children: React.ReactNode;
}

export const Item = ({ text, children }: ItemProps) => {
  return (
    <ItemContainer>
      <IconContainer>{children}</IconContainer>
      <TextContainer>
        <Text>{text}</Text>
      </TextContainer>
    </ItemContainer>
  );
};
