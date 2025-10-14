import React, { useState } from 'react';
import Product from './Product';

const productsInit = [
  { id:1, name:'Stellar T-Shirt', description:'Nice tee', price:'5', seller:'GASAFXGOF7BY6NDVESCDERFBUBTF4SHCJWO7GWWM3YPOEDUAIUXNF3ZD', category:'apparel' },
  { id:2, name:'XLM Mug', description:'Ceramic mug', price:'10', seller:'GASAFXGOF7BY6NDVESCDERFBUBTF4SHCJWO7GWWM3YPOEDUAIUXNF3ZD', category:'home' },
];

export default function ProductList({ products: propProducts, searchCategory, onAccept, ...props }) {
  const [products, setProducts] = useState(productsInit);
  const currentProducts = propProducts || products;

  const filteredProducts = searchCategory 
    ? currentProducts.filter(p => p.category.toLowerCase().includes(searchCategory.toLowerCase()))
    : currentProducts;

  const updateDescription = (id, text) => {
    setProducts(prev => prev.map(p => p.id===id?{...p,description:text}:p));
  };

  return (
    <div className="product-list">
      <h2>Available Products</h2>
      {filteredProducts.map(p => <Product key={p.id} product={p} onAccept={onAccept} {...props} />)}
    </div>
  );
}
