import React from 'react';
import './App.css';
import ProductGrid from './components/ProductGrid';
import Banner from './components/Banner';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h1>VTEX Product Grid</h1>
      </header>
      <main>
        <Banner
          imageSrc="https://a.storyblok.com/f/169304/5989x3889/fa5946e402/leem-sale_web-banners-02-1.jpg/m/1440x0/filters:quality(95)"
          title="Black Friday Discounts."
          description="30% off on seasonal designs"
        />
        <Banner
          imageSrc="https://a.storyblok.com/f/169304/5989x3890/7186bcf1ce/leem_webbannerimages_20nov2024-01.jpg/m/1440x0/filters:quality(95)"
          title="Distinctive designs of furs and bishts"
          description="Explore the luxury of traditional touches with a distinctive modern style."
        />
        <ProductGrid />
        <Banner
          imageSrc="https://a.storyblok.com/f/169304/5988x3890/00cfe0d863/leem_webbannerimages_20nov2024.jpg/m/1440x0/filters:quality(95)"
          title="Pieces that exude warmth and elegance."
          description="Explore the perfect blend of elegance and warmth."
        />
        <ProductGrid />
      </main>
    </div>
  );
}

export default App;










