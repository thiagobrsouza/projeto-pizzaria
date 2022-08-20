import Head from "next/head";
import { ChangeEvent, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { Header } from "../../components/Header";
import { canSSRAuth } from "../../utils/canSSRAuth";
import styles from './styles.module.scss';

export default function Products() {

    const [avatarUrl, setAvatarUrl] = useState('');
    const [imageAvatar, setImageAvatar] = useState(null);

    function handleFile(event: ChangeEvent<HTMLInputElement>) {
        if (!event.target.files) {
            return;
        }
        const image = event.target.files[0];
        if (!image) {
            return;
        }
        if (image.type === 'image/jpeg' || image.type === 'image/jpg' || image.type === 'image/png') {
            setImageAvatar(image);
            setAvatarUrl(URL.createObjectURL(event.target.files[0]));
        }
    }

    return (
        <>
            <Head>
                <title>Novo Produto - Sujeito Pizzaria</title>
            </Head>
            <div>
                <Header />
                <main className={styles.container}>
                    <h1>Novo Produto</h1>
                    <form className={styles.form}>

                        <label className={styles.labelAvatar}>
                            <span><FiUpload size={30} color="#FFF" /></span>
                            <input type="file" accept="image/png, image/jpeg, image/jpg" 
                            onChange={handleFile} />
                            {avatarUrl && (
                                <img src={avatarUrl} width={250} height={250} alt="Foto do produto" 
                                className={styles.preview} />
                                )
                            }
                        </label>

                        <select>
                            <option value="">Bebida</option>
                        </select>
                        <input type="text" placeholder="Digite o nome do produto" 
                        className={styles.input} />
                        <input type="text" placeholder="Digite o preço do produto" 
                        className={styles.input} />

                        <textarea placeholder="Descreva seu produto..." className={styles.input} />

                        <button type="submit" className={styles.buttonAdd}>Cadastrar</button>
                    </form>
                </main>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: {}
    }
});