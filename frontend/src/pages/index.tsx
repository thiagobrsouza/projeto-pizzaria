import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { FormEvent, useContext } from 'react'
import logoImg from '../../public/logo.svg'
import styles from '../../styles/Home.module.scss'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { AuthContext } from '../contexts/AuthContext'

const Home: NextPage = () => {

  const { signIn } = useContext(AuthContext);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    let data = {
      email: 'thiago@email.com',
      password: '12345'
    }
    await signIn(data);
  }

  return (
    <>
      <Head>
        <title>Sujeito Pizza - Faça o seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Sujeito pizzaria" />
        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input placeholder="Digite seu e-mail" type="text" />
            <Input placeholder="Digite sua senha" type="password" />
            <Button type="submit" loading={false}>Acessar</Button>
          </form>
          <Link href="/signup">
            <a className={styles.text}>Não possui uma conta? Cadastre-se</a>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home
