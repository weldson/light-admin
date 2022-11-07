import React, { useState, useContext, useEffect } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';

import { PaymentsContext } from 'services/payments/payments.context';

interface AddModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

export const AddModal = ({ showModal, setShowModal }: AddModalProps) => {
  const [name, setName] = useState<string>('');
  const [tax, setTax] = useState<number>(0);

  const { createPayment } = useContext(PaymentsContext);

  const handleSave = async () => {
    await createPayment({ name, tax });
    setShowModal(false);
  };

  useEffect(() => {
    if (showModal) {
      setName('');
      setTax(0);
    }
  }, [showModal]);

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header>
        <Modal.Title>Adicionar Forma de Pagamento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
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
          <Col className="col-md-2 col-sm-2">
            <Form.Group className="mb-3" controlId="tax">
              <Form.Label>Taxa (%)</Form.Label>
              <Form.Control
                type="number"
                placeholder="1.0"
                value={tax}
                onChange={(e) => setTax(Number(e.target.value))}
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
