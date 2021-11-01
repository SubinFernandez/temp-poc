import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import { API_ENDPOINTS, ROUTES } from '../../constants/constants'
import { Invoice } from '../../types/invoice'
import { InvoiceInsights } from '../../../src/components'

export const Invoices: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([])

  useEffect(() => {
    fetch(API_ENDPOINTS.INVOICE)
      .then(res => res.json())
      .then(data => {
        setInvoices(data)
      })
      .catch(err => {
        console.error(`Error in fetching invoices: ${err}`)
      })
  }, [])

  return (
    <>
      {invoices.length && (
        <div>
          <h2>Insights</h2>
          <InvoiceInsights invoices={invoices} />
          <h2>All invoices</h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                {/* <th>Due Date</th> */}
                <th>Supplier</th>
                {/* <th>Reference</th> */}
                <th>Amount</th>
                <th>Is Open</th>
                <th>Error?</th>
                <th>Error Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {invoices.map(invoice => (
                <tr key={invoice.id}>
                  <td>{invoice.date}</td>
                  {/* <td>{invoice.due_date}</td> */}
                  <td>{invoice.supplier}</td>
                  {/* <td>{invoice.reference}</td> */}
                  <td>{invoice.amount}</td>
                  <td>{invoice.is_open ? 'Yes' : 'No'}</td>
                  <td>{invoice.error_state === 1 ? 'Suspected' : invoice.error_state === 2 ? 'Confirmed error' : 'Confirmed correct'}</td>
                  <td>{invoice.data_error}</td>
                  <td>{invoice.error_state === 1 && (
                    <Link href={`${ROUTES.INVOICE}${invoice.id}`}>
                      <a>Confirm</a>
                    </Link>
                  )}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {!invoices.length && <div>Loading invoices...</div>}
    </>

  )
}