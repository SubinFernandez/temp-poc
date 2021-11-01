import React, { useEffect, useState } from 'react'
import { Invoice } from '../../types/invoice'

interface Props {
  invoices: Invoice[]
}
export const InvoiceInsights: React.FC<Props> = ({ invoices }) => {
  const [invoicesUnclassified, setInvoicesUnclassified] = useState(0)
  const [invoicesWithConfirmedErrors, setInvoicesWithConfirmedErrors] = useState(0)
  const [invoicesWithNoErrors, setInvoicesWithNoErrors] = useState(0)

  useEffect(() => {
    // Count number of invoices marked at suspected
    setInvoicesUnclassified(invoices.filter(invoice => invoice.error_state === 1).length)

    // Count number of invoices confirmed as error
    setInvoicesWithConfirmedErrors(invoices.filter(invoice => invoice.error_state === 2).length)

    // Count number of invoices confirmed as correct
    setInvoicesWithNoErrors(invoices.filter(invoice => invoice.error_state === 3).length)
  }, [invoices])

  return (
    <div>
      <div><strong>Unclassified invoices</strong>{': '}{invoicesUnclassified}</div>
      <div><strong>Confirmed errors</strong>{': '}{invoicesWithConfirmedErrors}</div>
      <div><strong>Invoices wihout errors</strong>{': '}{invoicesWithNoErrors}</div>
    </div>
  )
}