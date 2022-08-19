import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import logoImg from '../../../public/logo.svg'
import styles from '../../../styles/Home.module.scss'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'

const Signup: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sujeito Pizza - Faça o seu cadastro agora</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Sujeito pizzaria" />
        <div className={styles.login}>
            <h1>Criando sua conta</h1>
          <form>
            <Input placeholder="Digite o seu nome" type="text" />
            <Input placeholder="Digite seu e-mail" type="text" />
            <Input placeholder="Digite sua senha" type="password" />
            <Button type="submit" loading={false}>Cadastrar</Button>
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
