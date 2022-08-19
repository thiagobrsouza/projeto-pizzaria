import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import logoImg from '../../public/logo.svg'
import styles from '../../styles/Home.module.scss'
import { Input } from '../components/ui/Input'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sujeito Pizza - Faça o seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Sujeito pizzaria" />
        <div className={styles.login}>
          <form>
            <Input placeholder="Digite seu e-mail" type="text" />
            <Input placeholder="Digite sua senha" type="password" />
          </form>
        </div>
      </div>
    </>
  )
}

export default Home
