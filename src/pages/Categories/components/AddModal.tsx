import React, { useState, useContext, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

import { CategoriesContext } from '../../../services/categories/categories.context';

interface AddModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

export const AddModal = ({ showModal, setShowModal }: AddModalProps) => {
  const [name, setName] = useState('');

  const { createCategory } = useContext(CategoriesContext);

  const handleSave = async () => {
    await createCategory({ name });
    setShowModal(false);
  };

  useEffect(() => {
    if (showModal) {
      setName('');
    }
  }, [showModal]);

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
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
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancelar
        </Button>
        <Button variant="success" onClick={() => handleSave()}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
