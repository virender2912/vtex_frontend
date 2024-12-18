// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Switch } from "react-router-dom";

// import './App.css';
// import ProductGrid from './components/ProductGrid';
// import ProductPage from './components/ProductPage';
// import Banner from './components/Banner';
// import Header from './components/Header';
// import CollectionPage from './components/CollectionPage';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <header className="App-header">
//           <Header />
//         </header>
//         <main>
//           <Routes>
//             <Route
//               path="/"
//               element={
//                 <>
//                   <Banner
//                     imageSrc="https://a.storyblok.com/f/169304/5989x3889/fa5946e402/leem-sale_web-banners-02-1.jpg/m/1440x0/filters:quality(95)"
//                     title="Black Friday Discounts."
//                     description="30% off on seasonal designs"
//                     productid="138"
//                   />
//                   <Banner
//                     imageSrc="https://a.storyblok.com/f/169304/5989x3890/7186bcf1ce/leem_webbannerimages_20nov2024-01.jpg/m/1440x0/filters:quality(95)"
//                     title="Distinctive designs of furs and bishts"
//                     description="Explore the luxury of traditional touches with a distinctive modern style."
//                     productid="137"
//                   />
//                   <ProductGrid myId={138} />
//                   <Banner
//                     imageSrc="https://a.storyblok.com/f/169304/5988x3890/00cfe0d863/leem_webbannerimages_20nov2024.jpg/m/1440x0/filters:quality(95)"
//                     title="Pieces that exude warmth and elegance."
//                     description="Explore the perfect blend of elegance and warmth."
//                   // productid={139}
//                   />
//                   <ProductGrid myId={139} />
//                   <CollectionPage />
//                 </>
//               }
//             />
//             <Route path="/product/:id" element={<ProductPage />} />

//           </Routes>
//         </main>
//       </div>
//     </Router>
//   );
// }

// export default App;



import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import ProductGrid from './components/ProductGrid';
import ProductPage from './components/ProductPage';
import Banner from './components/Banner';
import Header from './components/Header';
import Footer from './components/Footer';
// import Footer from './components/footer';
import CollectionPage from './components/CollectionPage';
import SearchComponent from './components/SearchComponent';
import Register from './components/RegisterForm'
import Categories from './components/Collection-list'

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Header />
        </header>
        <main>
          <Routes>
            {/* Home route with banners and product grids */}
            <Route
              path="/"
              element={
                <>
                  <Banner
                    imageSrc="https://a.storyblok.com/f/169304/5989x3889/fa5946e402/leem-sale_web-banners-02-1.jpg/m/1440x0/filters:quality(95)"
                    heading="Black Friday Discounts."
                    subheading="30% off on seasonal designs"
                    collectionID="138"
                    buttonname="Shop Now"
                    piececount="20 Items"
                  />
                  <Banner
                    imageSrc="https://a.storyblok.com/f/169304/5989x3890/7186bcf1ce/leem_webbannerimages_20nov2024-01.jpg/m/1440x0/filters:quality(95)"
                    heading="Distinctive designs of furs and bishts"
                    subheading="Explore the luxury of traditional touches with a distinctive modern style."
                    collectionID="137"
                    buttonname="New Collection"
                    piececount="24 Items"
                  />
                  <ProductGrid myId={138} />
                  <Banner
                    imageSrc="https://a.storyblok.com/f/169304/5988x3890/00cfe0d863/leem_webbannerimages_20nov2024.jpg/m/1440x0/filters:quality(95)"
                    heading="Pieces that exude warmth and elegance."
                    subheading="Explore the perfect blend of elegance and warmth."
                    collectionID="138"
                  />
                  <ProductGrid myId={139} />

                  <Categories />
                  {/* Collection page component */}
                  {/* <CollectionPage /> */}
                </>
              }
            />
            {/* Product page route */}
            <Route path="/product/:id" element={<ProductPage />} />
            {/* You can add more routes for other collection pages */}
            <Route path="/accessories" element={<CollectionPage id={139} />} />
            <Route path="/comfortable-clothes" element={<CollectionPage id={137} />} />
            <Route path="/dresses-and-kaftans" element={<CollectionPage id={138} />} />
            <Route path="/search-results" element={<SearchComponent />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    
    <Footer/>
    </Router>
  );
}

export default App;

