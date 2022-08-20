import Head from "next/head";
import { ChangeEvent, FormEvent, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { toast } from "react-toastify";
import { Header } from "../../components/Header";
import { setupAPIClient } from "../../services/api";
import { canSSRAuth } from "../../utils/canSSRAuth";
import styles from './styles.module.scss';

type ItemProps = {
    id: string;
    name: string;
}

interface CategoryProps {
    categoryList: ItemProps[];
}

export default function Products({ categoryList }: CategoryProps) {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const [avatarUrl, setAvatarUrl] = useState('');
    const [imageAvatar, setImageAvatar] = useState(null);

    const [categories, setCategories] = useState(categoryList || []);
    const [categorySelected, setCategorySelected] = useState(0);

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

    function handleChangeCategory(event) {
        setCategorySelected(event.target.value);
    }

    async function handleRegister(event: FormEvent) {
        event.preventDefault();
        try {
            const data = new FormData();
            if (name === '' || price === '' || description === '' || imageAvatar === null) {
                toast.error('Preencha todos os campos');
                return;
            }
            data.append('name', name);
            data.append('price', price);
            data.append('description', description);
            data.append('categoryId', categories[categorySelected].id);
            data.append('file', imageAvatar);
            const apiClient = setupAPIClient();
            await apiClient.post('/products', data);
            toast.success('Produto registrado com sucesso!');
        } catch (error) {
            console.log(error);
            toast.error('Ops, erro ao cadastrar');
        }
        setName('');
        setPrice('');
        setDescription('');
        setImageAvatar(null);
        setAvatarUrl('');
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
                    <form className={styles.form} onSubmit={handleRegister}>

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

                        <select value={categorySelected} onChange={handleChangeCategory}>
                            {
                                categories.map((item, index) => {
                                    return (
                                        <option key={item.id} value={index}>{item.name}</option>
                                    )
                                })
                            }
                        </select>
                        
                        <input type="text" placeholder="Digite o nome do produto" 
                        className={styles.input} value={name} onChange={(e) => setName(e.target.value)} />

                        <input type="text" placeholder="Digite o preço do produto" 
                        className={styles.input} value={price} onChange={(e) => setPrice(e.target.value)} />

                        <textarea placeholder="Descreva seu produto..." className={styles.input}
                        value={description} onChange={(e) => setDescription(e.target.value)} />

                        <button type="submit" className={styles.buttonAdd}>Cadastrar</button>
                    </form>
                </main>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get('/categories');
    //console.log(response.data);
    return {
        props: {
            categoryList: response.data
        }
    }
});