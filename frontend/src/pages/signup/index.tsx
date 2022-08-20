import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { FormEvent, useContext, useState } from 'react'
import logoImg from '../../../public/logo.svg'
import styles from '../../../styles/Home.module.scss'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { AuthContext } from '../../contexts/AuthContext'

const Signup: NextPage = () => {

  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();
    if (name === '' || email === '' || password === '') {
      alert('Preencha os campos');
      return;
    }

    setLoading(true);

    let data = { name, email, password };
    await signUp(data);

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Sujeito Pizza - Faça o seu cadastro agora</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Sujeito pizzaria" />
        <div className={styles.login}>
            <h1>Criando sua conta</h1>
          <form onSubmit={handleSignUp}>
            <Input placeholder="Digite o seu nome" type="text" value={name} 
            onChange={(e) => setName(e.target.value)} />
            <Input placeholder="Digite seu e-mail" type="text" value={email} 
            onChange={(e) => setEmail(e.target.value)} />
            <Input placeholder="Digite sua senha" type="password" value={password} 
            onChange={(e) => setPassword(e.target.value)} />
            <Button type="submit" loading={loading}>Cadastrar</Button>
          </form>
          <Link href="/">
            <a className={styles.text}>Já possui uma conta? Faça login</a>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Signup
