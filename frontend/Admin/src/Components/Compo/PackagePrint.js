import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'

const PackagePrint = React.forwardRef((props, ref) => (
  <div ref={ref} style={{ marginLeft: 275, marginTop: 20 }}>
    <table border='2' width='450' height='670' className='text-center'>
      <tr>
        <td rowspan='2'>Shipping</td>
        <td colspan='2'>asdasdsa</td>
        <td rowspan='2'>asdasds</td>
      </tr>
      <tr>
        <td>asdasdasd</td>
        <td>asdasdsa</td>
      </tr>
      <tr>
        <td colspan='4'>asdasd</td>
      </tr>
      <tr>
        <td colspan='3' rowspan='6'>
          asdasdasdasd
        </td>
        <td>asdasdasdasd</td>
      </tr>
      <tr>
        <td>adasdaaa</td>
      </tr>
      <tr>
        <td>adasdaaa</td>
      </tr>
      <tr>
        <td>adasdaaa</td>
      </tr>
      <tr>
        <td>adasdaaa</td>
      </tr>
      <tr>
        <td>adasdaaa</td>
      </tr>
      <tr>
        <td colspan='2'>adasdaaa</td>
        <td colspan='2'>adasdaaa</td>
      </tr>
      <tr>
        <td colspan='4'>asdasd</td>
      </tr>
      <tr>
        <td colspan='4'>asdasd</td>
      </tr>
    </table>
  </div>
))

PackagePrint.defaultProps = {
  shipping: '',
  tgl: '',
  kdFaktur: '',
  noResi: '',
  typePackage: '',
  price: '',
}

export default PackagePrint
