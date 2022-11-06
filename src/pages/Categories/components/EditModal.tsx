import React, { useState, useContext, useEffect } from 'react';
import { Category } from 'interfaces/Category';
import { Button, Form, Modal } from 'react-bootstrap';

import { CategoriesContext } from '../../../services/categories/categories.context';

interface EditModalProps {
  category: Category | undefined;
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

export const EditModal = ({
  category,
  showModal,
  setShowModal,
}: EditModalProps) => {
  const [name, setName] = useState<string>('');

  const { updateCategory } = useContext(CategoriesContext);

  const handleSave = async () => {
    if (category && category.id) {
      await updateCategory(category.id, { name });
      setShowModal(false);
    }
  };

  useEffect(() => {
    if (showModal && category) {
      setName(category.name);
    }
  }, [showModal]);

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
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
