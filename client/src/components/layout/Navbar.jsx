import React from 'react';
import { Button } from '../ui/Button';
import { useContext } from 'react';
import { MyStore } from '../../context/AppContext';
import { Link, useNavigate } from 'react-router';
import useAPI from '../../hooks/useApi';

export const Navbar = () => {

  const { user, setUser, setAccessToken } = useContext(MyStore);
  const API = useAPI();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await API.post('/auth/logout');
      setUser(null);
      setAccessToken(null);
      navigate('/auth/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary-500/30 group-hover:scale-105 transition-transform">
              S
            </div>
            <span className="font-bold text-xl text-slate-800 tracking-tight">ShopNow</span>
          </div>

          <div className="flex items-center gap-4">
            <Link to={"/"} >Home</Link>
            {
              user ? (
                <div className="hidden sm:flex gap-4 items-center">
                  <p>{user.name}</p>
                  <Button onClick={handleLogout} variant="secondary" size="sm">Logout</Button>
                </div>
              ) : (
                <div className="hidden sm:flex gap-2">
                  <Link className='px-3 py-2 rounded-lg bg-blue-600 text-white' to={"/auth/login"} >Login</Link>
                  <Link className='px-3 py-2 rounded-lg bg-blue-600 text-white' to={"/auth/register"} >Register</Link>
                </div> 
              )
            }
          </div>
        </div>
      </div>
    </nav>
  );
};
