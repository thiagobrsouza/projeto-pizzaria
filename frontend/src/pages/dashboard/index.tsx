import Head from "next/head"
import { useState } from "react"
import { FiRefreshCcw } from "react-icons/fi"
import Modal from 'react-modal'
import { Header } from "../../components/Header"
import { ModalOrder } from "../../components/ModalOrder"
import { setupAPIClient } from "../../services/api"
import { canSSRAuth } from "../../utils/canSSRAuth"
import styles from './styles.module.scss'

type OrderProps = {
    id: string;
    table: string | number;
    status: boolean;
    draft: boolean;
    name: string | null;
}

interface HomeProps {
    orders: OrderProps[];
}

export type OrderItemProps = {
    id: string;
    amount: number;
    orderId: string;
    productId: string;
    product: {
        id: string;
        name: string;
        description: string;
        price: string;
        banner: string;
    }
    order: {
        id: string;
        table: string | number;
        status: boolean;
        name: string | null;
    }
}

export default function Dashboard({ orders }: HomeProps) {

    const [orderList, setOrderList] = useState(orders || []);

    const [modalItem, setModalItem] = useState<OrderItemProps[]>([]);
    const [modalVisible, setModalVisible] = useState(false);

    function handleCloseModal() {
        setModalVisible(false);
    }

    async function handleOpenModalView(id: string) {
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/orders/details', {
            params: { orderId: id },
        });
        setModalItem(response.data);
        setModalVisible(true);
    }

    Modal.setAppElement("#__next");

    return (
        <>
            <Head>
                <title>Painel - Sujeito Pizzaria</title>
            </Head>
            <div>
                <Header />
                <main className={styles.container}>
                    <div className={styles.containerHeader}>
                        <h1>Últimos pedidos</h1>
                        <button><FiRefreshCcw size={25} color="#3fffa3" /></button>
                    </div>

                    <article className={styles.listOrders}>
                        {
                            orderList.map(item => (
                                <section key={item.id} className={styles.orderItem}>
                                    <button onClick={() => handleOpenModalView(item.id)}>
                                        <div className={styles.tag}></div>
                                        <span>Mesa {item.table}</span>
                                    </button>
                                </section>
                            ))
                        }
                    </article>
                </main>

                {
                    modalVisible && (
                        <ModalOrder />
                    )
                }
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get('/orders');

    return {
        props: {
            orders: response.data
        }
    }
})