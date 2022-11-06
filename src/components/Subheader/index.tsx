import React from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';

import { ButtonContainer, Container, SearchContainer } from './styles';

interface SubheaderProps {
  showModal: (value: boolean) => void;
}

export const Subheader = ({ showModal }: SubheaderProps) => {
  return (
    <Container>
      <ButtonContainer>
        <Button variant="success" onClick={() => showModal(true)}>
          Adicionar
        </Button>
      </ButtonContainer>
      <SearchContainer>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">
            <BsSearch size={14} />
          </InputGroup.Text>
          <Form.Control
            placeholder="Pesquisar"
            aria-label="pesquisar"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
      </SearchContainer>
    </Container>
  );
};
