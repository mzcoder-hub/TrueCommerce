import asyncHandler from 'express-async-handler'
import axios from 'axios'

const apiKey = 'cdf25177193ad00dbe5ece9fab754e9c'

const getProvince = asyncHandler(async (req, res) => {
  await axios
    .get(
      'https://pro.rajaongkir.com/api/province',
      //   JSON.stringify(payload),
      {
        headers: {
          key: apiKey,
        },
      }
    )
    .then(async (response) => {
      const province = response.data.rajaongkir.results
      return res.json(province)
    })
})

const getCity = asyncHandler(async (req, res) => {
  await axios
    .get(
      'https://pro.rajaongkir.com/api/city',
      //   JSON.stringify(payload),
      {
        headers: {
          key: apiKey,
        },
      }
    )
    .then(async (response) => {
      const city = response.data.rajaongkir.results
      return res.json(city)
    })
})

const getCityByProvinceId = asyncHandler(async (req, res) => {
  const payload = {
    province: `${req.params.id}`,
  }
  await axios
    .get(
      'https://pro.rajaongkir.com/api/city',
      //   JSON.stringify(payload),
      {
        headers: {
          key: apiKey,
        },
        params: payload,
      }
    )
    .then(async (response) => {
      const city = response.data.rajaongkir.results
      return res.json(city)
    })
})

const getSubDistrict = asyncHandler(async (req, res) => {
  const payload = {
    city: `${req.params.id}`,
  }

  await axios
    .get('https://pro.rajaongkir.com/api/subdistrict', {
      headers: {
        key: apiKey,
      },
      params: payload,
    })
    .then(async (response) => {
      const subdistrict = response.data.rajaongkir.results
      return res.json(subdistrict)
    })
})

export { getProvince, getCity, getSubDistrict, getCityByProvinceId }