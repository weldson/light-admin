import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';

interface BagModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

export const AddModal = ({ showModal, setShowModal }: BagModalProps) => {
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');

  useEffect(() => {
    if (showModal) {
      setName('');
      setPrice('');
      setQuantity('');
    }
  }, [showModal]);

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header>
        <Modal.Title>Adicionar Embalagem</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            placeholder="nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Preço</Form.Label>
              <Form.Control
                type="number"
                placeholder="R$ X,XX"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Quantidade</Form.Label>
              <Form.Control
                type="number"
                placeholder="Quant."
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancelar
        </Button>
        <Button variant="success" onClick={() => console.log('added')}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
