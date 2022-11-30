import React, { useState, useContext } from 'react';
import { IoMdTrash } from 'react-icons/io';
import { HiPencil } from 'react-icons/hi';

import { Subheader } from 'components/Subheader';
import { CustomCard } from 'components/CustomCard';
import { CircleButton, CustomTable } from 'components/CustomTable';

import { Header } from 'components/Header';
import { ProvidersContext } from 'services/providers/providers.context';
import { ProductsContext } from 'services/products/products.context';
import { Product } from 'interfaces/Product';

import { AddModal } from './components/AddModal';
// import { EditModal } from './components/EditModal';

export const Products = () => {
  const [product, setProduct] = useState<Product>();

  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  const { products, removeProduct } = useContext(ProductsContext);

  const handleEdit = async (selectedProduct: Product) => {
    setProduct(selectedProduct);
    setShowModalEdit(true);
  };

  const handleRemove = async (selectedProduct: Product) => {
    if (selectedProduct.id) {
      await removeProduct(selectedProduct.id);
    }
  };

  return (
    <>
      <Header title="Produtos" />
      <Subheader showModal={setShowModalAdd} />
      <CustomCard>
        <CustomCard.Body>
          <CustomTable borderless>
            <thead>
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Qnt</th>
                <th>Compra (R$)</th>
                <th>Venda (R$)</th>
                <th>Frete (R$)</th>
                <th>Fornecedor</th>
                <th>Categoria</th>
                <th className="col-md-1 col-sm-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="align-middle">
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.quantity}</td>
                  <td>{p.buyPrice}</td>
                  <td>{p.sellPrice}</td>
                  <td>{p.shipping}</td>
                  <td>{p.categoryProviderId}</td>
                  <td>{p.categoryProviderId}</td>
                  <td>
                    <CircleButton onClick={() => handleEdit(p)}>
                      <HiPencil color="#5f5b5b" size={20} />
                    </CircleButton>
                    <CircleButton onClick={() => handleRemove(p)}>
                      <IoMdTrash color="#5f5b5b" size={16} />
                    </CircleButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </CustomTable>
        </CustomCard.Body>
      </CustomCard>

      <AddModal showModal={showModalAdd} setShowModal={setShowModalAdd} />

      {/* <EditModal
        product={product}
        showModal={showModalEdit}
        setShowModal={setShowModalEdit}
      /> */}
    </>
  );
};
