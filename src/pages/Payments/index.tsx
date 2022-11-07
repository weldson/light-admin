import React, { useState, useContext } from 'react';
import { IoMdTrash } from 'react-icons/io';
import { HiPencil } from 'react-icons/hi';

import { Subheader } from 'components/Subheader';
import { CustomCard } from 'components/CustomCard';
import { CircleButton, CustomTable } from 'components/CustomTable';

import { Payment } from 'interfaces/Payment';
import { Header } from 'components/Header';
import { PaymentsContext } from 'services/payments/payments.context';

import { AddModal } from './components/AddModal';
import { EditModal } from './components/EditModal';

export const Payments = () => {
  const [payment, setPayment] = useState<Payment>();

  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  const { payments, removePayment } = useContext(PaymentsContext);

  const handleEdit = async (selectedPayment: Payment) => {
    setPayment(selectedPayment);
    setShowModalEdit(true);
  };

  const handleRemove = async (selectedPayment: Payment) => {
    if (selectedPayment.id) {
      await removePayment(selectedPayment.id);
    }
  };

  return (
    <>
      <Header title="Formas de pagamento" />
      <Subheader showModal={setShowModalAdd} />
      <CustomCard>
        <CustomCard.Body>
          <CustomTable borderless>
            <thead>
              <tr>
                <th className="col-md-1 col-sm-1">#</th>
                <th className="col-md-1 col-sm-1">Nome</th>
                <th className="col-md-9 col-sm-8">Taxa (%)</th>
                <th className="col-md-1 col-sm-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} className="align-middle">
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.tax}</td>
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

      <EditModal
        payment={payment}
        showModal={showModalEdit}
        setShowModal={setShowModalEdit}
      />
    </>
  );
};
