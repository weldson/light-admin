import React, { useState, useContext } from 'react';
import { IoMdTrash } from 'react-icons/io';
import { HiPencil } from 'react-icons/hi';

import { Subheader } from 'components/Subheader';
import { CustomCard } from 'components/CustomCard';
import { CircleButton, CustomTable } from 'components/CustomTable';

import { Header } from 'components/Header';
import { OrdersContext } from 'services/orders/orders.context';
import { Order } from 'interfaces/Order';
import { formatDate } from 'utils/format';

// import { AddModal } from './components/AddModal';
// import { EditModal } from './components/EditModal';

export const Orders = () => {
  const [product, setProduct] = useState<Order>();

  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  const { orders, removeOrder } = useContext(OrdersContext);

  const handleEdit = async (selectedOrder: Order) => {
    setProduct(selectedOrder);
    setShowModalEdit(true);
  };

  const handleRemove = async (selectedOrder: Order) => {
    if (selectedOrder.id) {
      await removeOrder(selectedOrder.id);
    }
  };

  return (
    <>
      <Header title="Vendas" />
      <Subheader showModal={setShowModalAdd} />
      <CustomCard>
        <CustomCard.Body>
          <CustomTable borderless>
            <thead>
              <tr>
                <th>#</th>
                <th>Data</th>
                <th>Cliente</th>
                <th>Pagamento</th>
                <th>Qnt. Prod.</th>
                <th>Total</th>
                <th className="col-md-1 col-sm-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="align-middle">
                  <td>{o.id}</td>
                  <td>{formatDate(o.date)}</td>
                  <td>{o.customerId}</td>
                  <td>{o.paymentId}</td>
                  <td>{formatDate(o.date)}</td>
                  <td>{formatDate(o.date)}</td>
                  <td>
                    <CircleButton onClick={() => handleEdit(o)}>
                      <HiPencil color="#5f5b5b" size={20} />
                    </CircleButton>
                    <CircleButton onClick={() => handleRemove(o)}>
                      <IoMdTrash color="#5f5b5b" size={16} />
                    </CircleButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </CustomTable>
        </CustomCard.Body>
      </CustomCard>

      {/* <AddModal showModal={showModalAdd} setShowModal={setShowModalAdd} /> */}

      {/* <EditModal
        product={product}
        showModal={showModalEdit}
        setShowModal={setShowModalEdit}
      /> */}
    </>
  );
};
