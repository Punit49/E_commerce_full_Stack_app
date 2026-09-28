import React from 'react';
import { Button } from '../../../components/ui/Button';
import { Link } from 'react-router';
import useAPI from '../../../hooks/useApi';
import { useContext } from 'react';
import { MyStore } from '../../../context/AppContext';

export const ProductCard = ({ product }) => {
  const API = useAPI();
  const { setProducts, products } = useContext(MyStore);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await API.delete(`/products/${product._id}`);
        setProducts(products.filter(p => p._id !== product._id));
      } catch (e) {
        console.error(e);
      }
    }
  };
  
  return (
    <div className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative aspect-square overflow-hidden bg-slate-50">
        <Link to={`/products/products/${product._id}`}>
          <img 
            src={product.image} 
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </Link>
      </div>
      
      <div className="p-5">
        <Link to={`/products/products/${product._id}`} className="font-semibold text-slate-900 text-lg mb-1 truncate block hover:text-primary-600">{product.title}</Link>
        <p className="text-sm text-slate-500 mb-4">{product.description?.substring(0, 60)}...</p>
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-slate-900">₹{product.price}</span>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Link to={`/products/update/${product._id}`}>
              <Button size="sm" variant="secondary">Edit</Button>
            </Link>
            <Button size="sm" className="bg-red-500 hover:bg-red-600" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
