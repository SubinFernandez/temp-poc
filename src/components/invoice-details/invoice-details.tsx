import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import router, { useRouter } from 'next/router'

import { API_ENDPOINTS, ROUTES } from '../../constants/constants'
import { Invoice } from '../../types/invoice'

interface Props {
  invoiceId: number | undefined
}

type InvoiceStatus = 'error' | 'correct' | 'suspected'

export const InvoiceDetails: React.FC<Props> = ({ invoiceId }) => {
  const rounter = useRouter()
  const [invoice, setInvoice] = useState<Invoice>()

  useEffect(() => {
    if (!invoiceId) return 

    fetch(`${API_ENDPOINTS.INVOICE}${invoiceId}/`)
      .then(res => res.json())
      .then(data => {
        setInvoice(data)
      })
      .catch(err => {
        console.error(`Error in fetching invoice with id '${invoiceId}': ${err}`)
      })
  }, [invoiceId])

  const updateInvoiceStatus = (status: InvoiceStatus) => {
    const errorStateCode = status === 'suspected' ? 1 : status === 'error' ? 2 : 3

    fetch(`${API_ENDPOINTS.INVOICE}${invoiceId}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "error_state": errorStateCode
      })
    })
    .then(res => res.json())
    .then((data: Invoice) => {
      if (data.error_state === errorStateCode) {
        router.push(ROUTES.DASHBOARD)
      } else {
        alert('Could not update the invoice status. Please try again later.')
      }
    })
    .catch(err => {
      console.error(`Error in updateInvoiceStatus: ${err}`)
    })
  }

  return (
    <>
      {invoice && <>
        <div>
          <div>
            <span>Id</span>
            <span>{invoice.id}</span>
          </div>
          <div>
            <span>Supplier</span>
            <span>{invoice.supplier}</span>
          </div>
          <div>
            <span>Amount</span>
            <span>{invoice.amount}</span>
          </div>
          <div>
            <span>Reference</span>
            <span>{invoice.reference}</span>
          </div>
          <div>
            <span>Date</span>
            <span>{invoice.date}</span>
          </div>
          <div>
            <span>Due date</span>
            <span>{invoice.due_date}</span>
          </div>
          <div>
            <span>Is open?</span>
            <span>{invoice.is_open ? 'Yes' : 'No'}</span>
          </div>
          <div>
            <span>Status</span>
            <span>{invoice.error_state === 1 ? 'Suspected' : invoice.error_state === 2 ? 'Error' : 'Correct'}</span>
          </div>
          <div>
            <span>Error reason</span>
            <span>{invoice.data_error}</span>
          </div>
        </div>
        {invoice.error_state === 1 && (
          <div>
            <button onClick={() => updateInvoiceStatus('correct')}>Confirm Correct</button>
            <button onClick={() => updateInvoiceStatus('error')}>Confirm Error</button>
          </div>
        )}
        {invoice.error_state !== 1 && (
          <div>
            <div>No further action needed</div>
            <Link href={ROUTES.DASHBOARD}>
              <a>Back to dashboard</a>
            </Link>
          </div>
        )}
      </>}
      {!invoice && <div>Loading invoice...</div>}
    </>

  )
}