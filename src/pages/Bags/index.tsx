import React, { useState, useContext } from 'react';
import { BsSearch } from 'react-icons/bs';
import { IoMdTrash } from 'react-icons/io';
import { HiPencil } from 'react-icons/hi';
import { Button, Card, Form, InputGroup } from 'react-bootstrap';

import { CustomCard } from 'components/CustomCard';
import { CustomTable } from 'components/CustomTable';
import { Header } from '../../components/Header';

import { BagsContext } from '../../services/bags/bags.context';

import {
  ButtonContainer,
  CircleButton,
  SearchContainer,
  SubheaderContainer,
} from './styles';
import { AddModal } from './components/AddModal';

export const Bags = () => {
  const [showModalAdd, setShowModalAdd] = useState(false);

  const { bags } = useContext(BagsContext);

  return (
    <>
      <Header title="Embalagens" />
      <SubheaderContainer>
        <ButtonContainer>
          <Button variant="success" onClick={() => setShowModalAdd(true)}>
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
      </SubheaderContainer>
      <CustomCard>
        <Card.Body>
          <CustomTable borderless>
            <thead>
              <tr>
                <th className="col-md-1 col-sm-1">#</th>
                <th className="col-md-10 col-sm-9">Nome</th>
                <th className="col-md-1 col-sm-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {bags.map((bag) => (
                <tr key={bag.id} className="align-middle">
                  <td>{bag.id}</td>
                  <td>{bag.name}</td>
                  <td>
                    <CircleButton onClick={() => console.log('edit')}>
                      <HiPencil color="#5f5b5b" size={20} />
                    </CircleButton>
                    <CircleButton onClick={() => console.log('remove')}>
                      <IoMdTrash color="#5f5b5b" size={16} />
                    </CircleButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </CustomTable>
        </Card.Body>
      </CustomCard>

      <AddModal showModal={showModalAdd} setShowModal={setShowModalAdd} />
    </>
  );
};
