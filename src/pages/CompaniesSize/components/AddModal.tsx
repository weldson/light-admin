import React, { useState, useContext, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { CompaniesSizeContext } from 'services/companies-size/companies-size.context';

interface AddModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

export const AddModal = ({ showModal, setShowModal }: AddModalProps) => {
  const [name, setName] = useState('');

  const { createCompanySize } = useContext(CompaniesSizeContext);

  const handleSave = async () => {
    await createCompanySize({ name });
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
        <Modal.Title>Adicionar Porte de Fornecedor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Porte</Form.Label>
          <Form.Control
            type="text"
            placeholder="Grande porte"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
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
