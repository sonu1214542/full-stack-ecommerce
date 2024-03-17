import React from 'react'
import { useSearchParams } from 'react-router-dom'

const PaymentSuccess = () => {
    const searchquery = useSearchParams()[0];
    const referNum=searchquery.get("reference")
  return (
    <div style={{marginTop:"200px"}}>PaymentSuccess
        <p>{referNum}</p>
    </div>
  )
}

export default PaymentSuccess