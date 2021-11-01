import { useEffect } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

import { ROUTES } from '../src/constants/constants'

const Home: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.push(ROUTES.DASHBOARD)
  }, [router])

  return (
    <>
      <Head>
        <title>Pleave wait...</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Link href={ROUTES.DASHBOARD}>
          <a>Click here if not automatically redirected</a>
        </Link>
      </main>
    </>
  )
}

export default Home
