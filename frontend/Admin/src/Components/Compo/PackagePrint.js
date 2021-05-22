import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'

function rupiahConvert(nominal) {
  if (nominal) {
    var rupiah = ''
    var numberrev = nominal.toString().split('').reverse().join('')
    for (var i = 0; i < numberrev.length; i++)
      if (i % 3 === 0) rupiah += numberrev.substr(i, 3) + '.'
    return (
      'Rp. ' +
      rupiah
        .split('', rupiah.length - 1)
        .reverse()
        .join('')
    )
  } else {
    return nominal
  }
}

const PackagePrint = React.forwardRef((props, ref) => (
  <div ref={ref} style={{ marginLeft: 275, marginTop: 20 }}>
    <table border='2' width='450' height='670' className='text-center'>
      <tr>
        <td rowspan='2'>
          Shipping
          <br />
          {props.shipping}
        </td>
        <td colspan='2'>Label Pengiriman</td>
        <td rowspan='2'>Logo</td>
      </tr>
      <tr>
        <td>{props.tgl}</td>
        <td>{props.kdFaktur}</td>
      </tr>
      <tr>
        <td colspan='4'>{props.noResi}</td>
      </tr>
      <tr>
        <td colspan='3' rowspan='6'>
          Logo, {props.kdFaktur}
        </td>
        <td>Paket</td>
      </tr>
      <tr>
        <td> {props.typePackage}</td>
      </tr>
      <tr>
        <td>-</td>
      </tr>
      <tr>
        <td>-</td>
      </tr>
      <tr>
        <td>Non-COD</td>
      </tr>
      <tr>
        <td>{rupiahConvert(props.price)}</td>
      </tr>
      <tr>
        <td colspan='2' className='text-center' style={{ fontSize: 15 }}>
          <b> Penjual : </b>
        </td>
        <td colspan='2' className='text-center' style={{ fontSize: 15 }}>
          <b> Penerima :</b>
        </td>
      </tr>
      <tr>
        <td colspan='2' className='text-left' style={{ fontSize: 15 }}>
          <b>abaindonesia.id</b> <br /> 08112511193, <br /> JL.DHARMA BHAKTI GG
          12 NO 16 RT 3 RW 15, <br /> KEL.SAPURO KEBULEN, <br /> Kota
          Pekalongan, Jawa Tengah
        </td>
        <td colspan='2' className='text-left' style={{ fontSize: 15 }}>
          <b>{props.penerima}</b>, <br />
          {props.alamat.address}, {props.alamat.city.city_name},{' '}
          {props.alamat.city.postal_code}{' '}
        </td>
      </tr>
      <tr>
        <td colspan='4'>
          KODE ORDER : <br />
          {props.kodeOrder}
        </td>
      </tr>
      <tr>
        <td colspan='4' className='text-center'>
          <b>INFO PENTING!!!</b> <br /> MOHON FOTO / VIDEO PAKET ANDA <br />{' '}
          SEBELUM DIBUKA / BUAT VIDEO <br /> UNBOXING PAKET <br />{' '}
          <p style={{ fontSize: 8 }}>*syarat utama komplain produk</p>
        </td>
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
  alamat: '',
  penerima: '',
  kodeOrder: '',
}

export default PackagePrint
