import React, { useState, useContext, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

import { CompanySize } from 'interfaces/CompanySize';
import { CompaniesSizeContext } from 'services/companies-size/companies-size..context';

interface EditModalProps {
  companySize: CompanySize | undefined;
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

export const EditModal = ({
  companySize,
  showModal,
  setShowModal,
}: EditModalProps) => {
  const [name, setName] = useState<string>('');

  const { updateCompanySize } = useContext(CompaniesSizeContext);

  const handleSave = async () => {
    if (companySize && companySize.id) {
      await updateCompanySize(companySize.id, { name });
      setShowModal(false);
    }
  };

  useEffect(() => {
    if (showModal && companySize) {
      setName(companySize.name);
    }
  }, [showModal]);

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header>
        <Modal.Title>Editar Porte de Fornecedor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Porte</Form.Label>
          <Form.Control
            type="text"
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
