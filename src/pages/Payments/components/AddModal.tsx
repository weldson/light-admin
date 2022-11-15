import React, { useState, useContext, useEffect } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import InputMask from 'react-input-mask';

import { PaymentsContext } from 'services/payments/payments.context';

interface AddModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

export const AddModal = ({ showModal, setShowModal }: AddModalProps) => {
  const [name, setName] = useState<string>('');
  const [tax, setTax] = useState<string>('');

  const { createPayment } = useContext(PaymentsContext);

  const handleSave = async () => {
    const taxValue = Number(tax);
    await createPayment({ name, tax: taxValue });
    setShowModal(false);
  };

  const handleTax = (valueStr: string) => {
    console.log(valueStr);
    const value = Number(valueStr.replace(',', '')) * 0.01;
    console.log(value);
    setTax(value.toString());
  };

  useEffect(() => {
    if (showModal) {
      setName('');
      setTax('');
    }
  }, [showModal]);

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header>
        <Modal.Title>Adicionar Forma de Pagamento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col className="col-md-8 col-sm-8">
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
          <Col className="col-md-4 col-sm-4">
            <Form.Group className="mb-3" controlId="tax">
              <Form.Label>Taxa (%)</Form.Label>
              <InputMask
                className="form-control"
                mask="99,99"
                value={tax}
                onChange={(e) => handleTax(e.target.value)}
              />
              {/* <Form.Control
                type="number"
                placeholder="1.0"
                value={tax}
                onChange={(e) => setTax(Number(e.target.value))}
              /> */}
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
