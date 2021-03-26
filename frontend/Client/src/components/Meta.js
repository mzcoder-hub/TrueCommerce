import React from 'react'
import { Helmet } from 'react-helmet-async'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: process.env.REACT_APP_SITENAME,
  description: process.env.REACT_APP_DESCRIPTION,
  keywords: process.env.REACT_APP_KEYWORD,
}

export default Meta
