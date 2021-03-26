import React from 'react'
import Slider from 'infinite-react-carousel'

const Sliders = () => {
  const width_manual = '100%'
  const settings = {
    autoplay: true,
    dots: false,
    autoplaySpeed: 7000,
    duration: 1000,
  }
  const imageList = [
    { id: '1', image: '/images/slider-1.webp' },
    { id: '2', image: '/images/slider-2.webp' },
    { id: '3', image: '/images/slider-3.webp' },
  ]
  return (
    <div>
      <Slider {...settings}>
        {imageList.map((imageC) => (
          <div className='css-u2d2ff' key={imageC.id}>
            <img
              src={imageC.image}
              style={{ width: width_manual }}
              alt={`Carausel ${imageC.id}`}
            />
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default Sliders
