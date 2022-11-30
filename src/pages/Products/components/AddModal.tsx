import React, { useState, useContext, useEffect } from 'react';
import { Button, Col, Form, FormControl, Modal, Row } from 'react-bootstrap';
import InputMask from 'react-input-mask';

import { ProvidersContext } from 'services/providers/providers.context';

import { CategoriesContext } from 'services/categories/categories.context';
import { ProductsContext } from 'services/products/products.context';

interface AddModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

export const AddModal = ({ showModal, setShowModal }: AddModalProps) => {
  const [name, setName] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [buyPrice, setBuyPrice] = useState<string>('');
  const [sellPrice, setSellPrice] = useState<string>('');
  const [shipping, setShipping] = useState<string>('');
  const [categoryProviderId, setCategoryProviderId] = useState<number>(0);

  const { createProduct } = useContext(ProductsContext);
  const { providers } = useContext(ProvidersContext);

  // const { categories } = useContext(CategoriesContext);

  const handleSave = async () => {
    // await createProduct({
    //   name,
    // });
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
        <Modal.Title>Adicionar Produto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col className="col-md-12 col-sm-12">
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Fornecedor ABC"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="col-md-4 col-sm-4">
            <Form.Group className="mb-3" controlId="whatsapp">
              <Form.Label>Qnt</Form.Label>
              <Form.Control
                type="number"
                placeholder="10"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col className="col-md-4 col-sm-4">
            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Compra (R$)</Form.Label>
              <Form.Control
                type="text"
                placeholder="10"
                value={buyPrice}
                onChange={(e) => setBuyPrice(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col className="col-md-4 col-sm-4">
            <Form.Group className="mb-3" controlId="instagram">
              <Form.Label>Venda (R$)</Form.Label>
              <Form.Control
                type="text"
                placeholder="10"
                value={sellPrice}
                onChange={(e) => setSellPrice(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="col-md-6 col-sm-6">
            <Form.Group className="mb-3" controlId="website">
              <Form.Label>Frete</Form.Label>
              <Form.Control
                type="text"
                placeholder="www.pikena.com.br"
                value={shipping}
                onChange={(e) => setShipping(e.target.value)}
              />
            </Form.Group>
          </Col>
          {/* <Col className="col-md-6 col-sm-6">
            <Form.Group className="mb-3" controlId="size">
              <Form.Label>Porte</Form.Label>
              <Form.Select
                onChange={(e) => setCompanySizeId(Number(e.target.value))}
                value={companySizeId}
              >
                <option value={0}>-</option>
                {companiesSize.map((cs) => (
                  <option key={cs.id} value={cs.id}>
                    {cs.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col> */}
        </Row>
        {/* <Row>
          <Col className="col-md-12 col-sm-12">
            <Form.Group className="mb-3" controlId="street">
              <Form.Label>Rua</Form.Label>
              <Form.Control
                type="text"
                placeholder="Rua Fulano de Tal"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="col-md-3 col-sm-4">
            <Form.Group className="mb-3" controlId="number">
              <Form.Label>Número</Form.Label>
              <Form.Control
                type="text"
                placeholder="97A"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col className="col-md-9 col-sm-8">
            <Form.Group className="mb-3" controlId="neighborhood">
              <Form.Label>Bairro</Form.Label>
              <Form.Control
                type="text"
                placeholder="Barreto"
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row> */}
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
