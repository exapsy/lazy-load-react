import './App.css'

import React from 'react'

import LazyLoad from './components/LazyLoad'

const PLACEHOLDER_SRC = "http://eton.host/skin/frontend/rwd/eton/images/placeholder-shirt-tall.jpg"
const LOW_RES_SRC = "https://cdn.etonshirts.com/dyn/media/catalog/product/F/6/F6031-25_10000178225_tshov_1_st/100x/blue_medallion_print_signature_twill_shirt.jpg"
const HIGH_RES_SRC = "https://cdn.etonshirts.com/dyn/media/catalog/product/F/6/F6031-25_10000178225_tshov_1_st/2000x/blue_medallion_print_signature_twill_shirt.jpg"

function App() {
  return (
    <div className="App">
      <div className='images'>
        <LazyLoad
          images={{
            alt: "product",
            highRes: HIGH_RES_SRC,
            lowRes: LOW_RES_SRC,
            placeholder: PLACEHOLDER_SRC,
          }}
        />
      </div>
    </div>
  )
}

export default App
