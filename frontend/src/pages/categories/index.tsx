import Head from "next/head";
import { FormEvent, useState } from "react";
import { Header } from "../../components/Header";
import styles from './styles.module.scss';

export default function Categories() {

    const [name, setName] = useState('');

    async function handleRegister(event: FormEvent) {
        event.preventDefault();
        alert('Categoria ' + name);
    }


    return (
        <>
            <Head>
                <title>Nova categoria = Sujeito Pizaria</title>
            </Head>
            <div>
                <Header />
                <main className={styles.container}>
                    <h1>Cadastrar categorias</h1>
                    <form className={styles.form} onSubmit={handleRegister}>
                        <input type="text" placeholder="Digite o nome da categoria"
                        className={styles.input} value={name} onChange={(e) => setName(e.target.value)} />
                        <button type="submit" className={styles.buttonAdd}>Cadastrar</button>
                    </form>
                </main>
            </div>
        </>
    )
}