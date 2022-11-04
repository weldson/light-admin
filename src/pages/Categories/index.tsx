import React, { useState, useContext, useEffect } from 'react';
import { BsSearch } from 'react-icons/bs';
import { IoMdTrash } from 'react-icons/io';
import { HiPencil } from 'react-icons/hi';
import { Button, Card, Form, InputGroup, Modal } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';

import { Category } from 'interfaces/Category';
import { Header } from '../../components/Header';

import { CategoriesContext } from '../../services/categories/categories.context';

import {
  addCategory,
  updateCategory,
  removeCategory,
} from '../../services/categories/categories.service';

import {
  ButtonContainer,
  CircleButton,
  CustomCard,
  CustomTable,
  SearchContainer,
  SubheaderContainer,
} from './styles';

export const Categories = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');

  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  const { categories, updateCategories } = useContext(CategoriesContext);

  const clearInputs = () => {
    setId('');
    setName('');
  };

  const handleModalEdit = async (category: Category) => {
    setId(String(category.id));
    setName(category.name);
    setShowModalEdit(true);
  };

  const handleAdd = async () => {
    await addCategory(name);
    await updateCategories();

    setShowModalAdd(false);
    clearInputs();
  };

  const handleEdit = async () => {
    await updateCategory(Number(id), name);
    await updateCategories();
    setShowModalEdit(false);
    clearInputs();
  };

  const handleRemove = async (category: Category) => {
    if (category.id) {
      await removeCategory(category.id);
      await updateCategories();
    }
  };

  return (
    <>
      <ToastContainer />
      <Header title="Categorias" />
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
              {categories.map((category) => (
                <tr key={category.id} className="align-middle">
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>
                    <CircleButton onClick={() => handleModalEdit(category)}>
                      <HiPencil color="#5f5b5b" size={20} />
                    </CircleButton>
                    <CircleButton onClick={() => handleRemove(category)}>
                      <IoMdTrash color="#5f5b5b" size={16} />
                    </CircleButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </CustomTable>
        </Card.Body>
      </CustomCard>

      <Modal show={showModalAdd} onHide={() => setShowModalAdd(false)}>
        <Modal.Header>
          <Modal.Title>Adicionar Categoria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModalAdd(false)}>
            Cancelar
          </Button>
          <Button variant="success" onClick={handleAdd}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showModalEdit}
        onHide={() => {
          setShowModalEdit(false);
          clearInputs();
        }}
      >
        <Modal.Header>
          <Modal.Title>Editar Categoria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowModalEdit(false);
              clearInputs();
            }}
          >
            Cancelar
          </Button>
          <Button variant="success" onClick={handleEdit}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
