import React, { useState, useEffect } from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { useNavigate, useParams } from 'react-router';
import useAPI from '../../../hooks/useApi';

export const AddProduct = () => {
  const navigate = useNavigate();
  const API = useAPI();
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const res = await API.get(`/products/${id}`);
          const prod = res.data.data.product;
          setTitle(prod.title);
          setPrice(prod.price);
          setStock(prod.stock);
          setDescription(prod.description);
        } catch (error) {
          console.error(error);
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleCancel = () => {
    navigate("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await API.put(`/products/${id}`, { title, price, stock, description });
      } else {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('price', price);
        formData.append('stock', stock);
        formData.append('description', description);
        if (image) formData.append('image', image);

        await API.post('/products', formData);
      }
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">{id ? 'Edit Product' : 'Add New Product'}</h2>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-slate-900 border-b pb-2">Basic Information</h3>
            <Input 
              label="Product Title" 
              placeholder="e.g. Wireless Keyboard" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              minLength={10}
              maxLength={50}
              required
            />
            
            <div className="grid grid-cols-2 gap-4">
              <Input 
                label="Price ($)" 
                type="number" 
                placeholder="0.00" 
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min={0}
                required
              />
              <Input 
                label="Stock Quantity" 
                type="number" 
                placeholder="0" 
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                min={0}
                required
              />
            </div>
            
            <div className="flex flex-col space-y-1.5 w-full">
              <label className="text-sm font-medium text-slate-700">Description</label>
              <textarea 
                rows={4}
                className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 resize-none"
                placeholder="Product description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                minLength={30}
                maxLength={200}
                required
              />
            </div>
          </div>
          
          {!id && (
            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-medium text-slate-900 border-b pb-2">Media</h3>
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                <svg className="mx-auto h-12 w-12 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="mt-4 flex justify-center text-sm text-slate-600">
                  <span className="relative cursor-pointer bg-transparent rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
                    <span>Upload a file</span>
                    <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => setImage(e.target.files[0])} />
                  </span>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-slate-500 mt-2">PNG, JPG, GIF up to 5MB</p>
              </div>
            </div>
          )}
          
          <div className="pt-6 flex justify-end gap-3 border-t">
            <Button onClick={handleCancel} variant="secondary">Cancel</Button>
            <Button type="submit">Save Product</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
