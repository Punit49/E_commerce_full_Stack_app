import { useContext, useEffect } from 'react';
import { Button } from '../../../components/ui/Button';
import { ProductCard } from './ProductCard';
import { MyStore } from '../../../context/AppContext';
import { Link } from 'react-router';
import useAPI from '../../../hooks/useApi';

export const ProductList = () => {
  const { products, setProducts, user } = useContext(MyStore);
  const API = useAPI();

  useEffect(() => {
    API.get("/products")
      .then(res => setProducts(res.data.data.products))
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Featured Products</h2>
          <p className="text-slate-500 mt-1">Discover our hand-picked selections</p>
        </div>
        {user && <Link className='px-3 py-2 rounded-md bg-green-600 text-white' to={"/products/create"}>Add Product</Link>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {!products.length ? (
          <h1>No Products Yet {user && <Link className='text-blue-700' to={"/products/create"}>Click Here to add</Link>}</h1>
        ) : (
          products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};
