import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import {  } from '../../src/components'
import { InvoiceDetails } from '../../src/components/invoice-details/invoice-details'

const Dashboard: NextPage = () => {
  const router = useRouter()
  const [invoiceId, setInvoiceId] = useState<number>()
  
  useEffect(() => {
    if (router.query?.invoiceId) setInvoiceId(router.query?.invoiceId.toString() as unknown as number)
  }, [router])

  return (
    <>
      <Head>
        <title>Invoice Details</title>
        <meta name="description" content="View invoice details and take action" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Invoice details</h1>
        <InvoiceDetails invoiceId={invoiceId} />
      </main>
    </>
  )
}

export default Dashboard
