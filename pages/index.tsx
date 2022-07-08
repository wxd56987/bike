import type { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import styles from '../styles/index.module.scss'
import PC from '../components/pc'
import RodemapCtx from '../hooks/use-roadmao-content'
import { Rodemap } from '../utils/types'
import axios from 'axios'
import { ApiStart } from '../utils/tools'

const Home: NextPage<Rodemap> = ({ v }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>风|林|火|山|🚴🏻</title>
        <meta name="description" content="风林火山骑行团" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RodemapCtx.Provider value={{ v }}>
        <PC />
      </RodemapCtx.Provider>

      <div className={styles.footer}
        onClick={() => {
          axios.get('/api/get').then((e) => {
            console.log(e)
          })
        }}
      >
        Powered by Kmy
        <br />
        Github: https://github.com/wxd56987/bike
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const url = ApiStart(process.env.NEXT_PUBLIC_DOMAIN_ENV as string)
  const { data: { v } } = await axios.get(`${url}/api/get`);
  return {
    props: {
      v
    },
  };
};

export default Home
