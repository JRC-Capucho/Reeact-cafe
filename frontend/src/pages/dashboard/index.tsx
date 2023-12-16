import Header from "@/components/ui/Header"
import { canSSRAuth } from "@/utils/canSSRAuth"
import Head from "next/head"
import styles from './styles.module.scss'
import { FiRefreshCcw } from 'react-icons/fi'
import { setupAPICliente } from "@/services/api"
import { useState } from "react"

import Modal from 'react-modal'
import { api } from "@/services/apiClient"
import { ModalOrder } from "@/components/ui/modalOrder"
import { toast } from "react-toastify"

type ItemProps = {
  id: number;
  table: number;
  status: boolean;
  draft: boolean;
  name?: string | null;
}
interface OrdersProps {
  orders: ItemProps[];

}

export type OrderItemProps = {
  id: number;
  amount: number;
  orderId: number;
  productId: number;
  product: {
    id: number,
    name: string,
    price: number,
    description: string,
    banner: string,
    categoryId: number
  }
  order: {
    id: number,
    table: number,
    status: boolean,
    name: string | null
  }
}

export default function Dashboard({ orders }: OrdersProps) {
  const [ordersList, setOrdersList] = useState(orders || [])

  const [modalItem, setModalItem] = useState<OrderItemProps[]>();

  const [modalVisible, setModalVisible] = useState(false);

  async function handleFinishOrder(id: number) {

    await api.put('order/finish', {
      id: id
    }
    );

    const res = await api.get('order');

    setOrdersList(res.data);

    toast.success("Order finish");

    setModalVisible(false);

  }

  function handleCloseModal() {
    setModalVisible(false);
  }

  async function handleDetailTable(id: number) {
    const res = await api.get('order/describe', {
      params: {
        id: id
      }
    })

    setModalItem(res.data)
    setModalVisible(true)
  }

  async function handleRefreshOrders() {
    const res = await api.get('order')
    setOrdersList(res.data);
  }

  Modal.setAppElement('#__next');

  return (
    <>
      <Head>
        <title>Dashboard Cafe</title>
      </Head>
      <div>
        <Header />
        <main className={styles.container}>
          <div className={styles.containerHeader}>
            <h1>List Orders</h1>
            <button onClick={handleRefreshOrders}>
              <FiRefreshCcw color="#3fffa3" size={25} />
            </button>
          </div>
          <article className={styles.listOrders}>
            {ordersList.length === 0 && (
              <span className={styles.emptyList}>
                Don't have orders
              </span>
            )}
            {ordersList.map(item => (
              < section className={styles.orderItem} key={item.id} >
                <button onClick={() => handleDetailTable(item.id)}>
                  <div className={styles.tag}>
                  </div>
                  <span>Table {item.table}</span>
                </button>
              </section>
            ))}

          </article>

        </main>
        {modalVisible && (
          <ModalOrder
            isOpen={modalVisible}
            onRequestCloes={handleCloseModal}
            order={modalItem}
            handleFinishOrder={handleFinishOrder}
          />
        )}
      </div >
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const api = setupAPICliente(ctx);

  const res = await api.get('order');

  return {
    props: {
      orders: res.data
    }
  }
})
