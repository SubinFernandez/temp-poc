import type { NextPage } from 'next'
import Head from 'next/head'

import { Invoices } from '../src/components'

const Dashboard: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard listing all invoices to be verified" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Invoices</h1>
        <Invoices />
      </main>
    </>
  )
}

export default Dashboard
