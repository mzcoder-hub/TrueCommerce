import React from 'react'
import { Helmet } from 'react-helmet-async'

const Meta = ({
  title,
  description,
  keywords,
  contentType,
  contentDescription,
  contentPrimaryImage,
  contentUrl,
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
      <meta property='og:url' content={contentUrl} />
      <meta property='og:type' content={contentType} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={contentDescription} />
      <meta property='og:image' content={contentPrimaryImage} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: process.env.REACT_APP_SITENAME,
  description: process.env.REACT_APP_DESCRIPTION,
  keywords: process.env.REACT_APP_KEYWORD,
  contentUrl: process.env.REACT_APP_URL,
  contentType: 'article',
  contentDescription: process.env.REACT_APP_DESCRIPTION,
  contentPrimaryImage: '',
}

export default Meta
