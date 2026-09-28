import React, { useEffect, useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { useParams, Link } from 'react-router';
import useAPI from '../../../hooks/useApi';

export const ProductDetail = () => {
  const { id } = useParams();
  const API = useAPI();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data.data.product);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center p-8 text-xl">Loading...</div>;
  if (!product) return <div className="text-center p-8 text-xl">Product not found. <Link to="/" className="text-blue-500">Go back</Link></div>;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="p-8 md:p-12 flex items-center justify-center bg-slate-50">
          <img 
            src={product.image} 
            alt={product.title}
            className="max-w-full h-auto rounded-xl shadow-lg hover:scale-105 transition-transform duration-500"
          />
        </div>
        
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{product.title}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold text-slate-900">${product.price}</span>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
               In Stock: {product.stock}
            </span>
          </div>
          
          <p className="text-slate-600 mb-8 leading-relaxed whitespace-pre-wrap">
            {product.description}
          </p>
          
          <div className="flex gap-4 mt-auto">
            <Button size="lg" className="flex-1 text-lg">Add to Cart</Button>
            <Link to={`/products/update/${id}`}>
               <Button size="lg" variant="secondary" className="px-4">Edit</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
