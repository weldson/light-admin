import React, { useState, useContext, useEffect } from 'react';
import { Button, Col, Form, FormControl, Modal, Row } from 'react-bootstrap';

import { ProvidersContext } from 'services/providers/providers.context';

import { CategoriesContext } from 'services/categories/categories.context';
import { ProductsContext } from 'services/products/products.context';
import { CategoriesProviderContext } from 'services/category-provider/category-provider.context';

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

  const { categoriesProvider, getCategoryProviderByProviderId } = useContext(
    CategoriesProviderContext
  );

  const handleSave = async () => {
    const nQuant = Number(quantity);
    const nBuyPrice = Number(buyPrice);
    const nSellPrice = Number(sellPrice);
    const nShipping = Number(shipping);
    await createProduct({
      name,
      quantity: nQuant,
      buyPrice: nBuyPrice,
      sellPrice: nSellPrice,
      shipping: nShipping,
      categoryProviderId,
      image: '',
    });
    setShowModal(false);
  };

  const onChangeProvider = async (providerId: number) => {
    await getCategoryProviderByProviderId(providerId);
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
          <Col className="col-md-3 col-sm-3">
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
          <Col className="col-md-3 col-sm-3">
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
          <Col className="col-md-3 col-sm-3">
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
          <Col className="col-md-3 col-sm-3">
            <Form.Group className="mb-3" controlId="website">
              <Form.Label>Frete (R$)</Form.Label>
              <Form.Control
                type="text"
                placeholder="10"
                value={shipping}
                onChange={(e) => setShipping(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="col-md-6 col-sm-6">
            <Form.Group className="mb-3" controlId="size">
              <Form.Label>Fornecedor</Form.Label>
              <Form.Select
                onChange={(e) => onChangeProvider(Number(e.target.value))}
                // value={companySizeId}
              >
                <option value={0}>-</option>
                {providers.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col className="col-md-6 col-sm-6">
            <Form.Group className="mb-3" controlId="size">
              <Form.Label>Categoria</Form.Label>
              <Form.Select
                onChange={(e) => setCategoryProviderId(Number(e.target.value))}
                value={categoryProviderId}
              >
                <option value={0}>-</option>
                {categoriesProvider.map((cp) => (
                  <option key={cp.id} value={cp.id}>
                    {cp.category?.name}
                  </option>
                ))}
              </Form.Select>
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
