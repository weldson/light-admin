import React, { useState, useContext, useEffect } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';

import { StatesContext } from 'services/states/states.context';

interface AddModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

export const AddModal = ({ showModal, setShowModal }: AddModalProps) => {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');

  const { createState } = useContext(StatesContext);

  const handleSave = async () => {
    await createState({ name, slug });
    setShowModal(false);
  };

  useEffect(() => {
    if (showModal) {
      setName('');
      setSlug('');
    }
  }, [showModal]);

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header>
        <Modal.Title>Adicionar Estado</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col className="col-md-2 col-sm-2">
            <Form.Group className="mb-3" controlId="sigla">
              <Form.Label>Sigla</Form.Label>
              <Form.Control
                type="text"
                placeholder="MA"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col className="col-md-10 col-sm-10">
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
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
