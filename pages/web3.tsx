import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/index.module.scss'
import { Rodemap } from '../utils/types'
import { useState } from 'react';
import AdmetaSdk from 'admeta-sdk'
import { useRouter } from 'next/router';
import axios from 'axios';

const Web3: NextPage<Rodemap> = ({ v }) => {
  const [account, setAccount] = useState('')
  const router = useRouter()
  const { add, id } = router.query
  const handleOpenPlokadot = async () => {
    // if (account) {
    //   return;
    // }
    // if (typeof window !== "undefined") {
    //   const { web3Accounts, web3Enable } = await import('@polkadot/extension-dapp')
    //   await web3Enable('AdMeta');
    //   const allAccounts = await web3Accounts() as any[];
    //   setAccount(allAccounts[0].address)
    //   console.log(allAccounts)
    //   new AdmetaSdk(allAccounts[0].address).init()
    // }

    // new AdmetaSdk('').init()
    if (add) {
      axios.post(`https://api.admeta.network/admeta/recordAdCompleted`, {
        walletAddress: add,
        advertisementId: id
      }).then(() => {
        router.push('https://app.admeta.network/ad-display?rd=23nqw343')
      })
    } else {
      router.push('https://app.admeta.network/ad-display?rd=23nqw343')
    }
  }

  const formatAddress = (address: string): string => {
    const str_1 = address.substring(0, 4)
    const str_2 = address.substring(address.length - 4)
    return `${str_1}......${str_2}`
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Web3</title>
        <meta name="description" content="web3 ecology" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.web3}>
        <div className={styles.brand}>
          <div className={styles.title}>Trustworthy</div>
          <div className={styles.title}>Innovative</div>
          <div className={styles.title}>Humanistic</div>
          <div
            className={styles.btn}
            onClick={handleOpenPlokadot}
          >
            <p>Ad completed</p>
          </div>
        </div>
        <div className={styles.circle}></div>
      </div>

      <div className={styles.footer}>
        Powered by Web3 Ecology
      </div>
    </div>
  )
}
export default Web3