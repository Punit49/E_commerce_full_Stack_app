import React, { useState, useContext } from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Link, useNavigate } from 'react-router';
import useAPI from '../../../hooks/useApi';
import { MyStore } from '../../../context/AppContext';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const API = useAPI();
  const navigate = useNavigate();
  const { setUser, setAccessToken } = useContext(MyStore);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      setUser(res.data.data.user);
      setAccessToken(res.data.data.accessToken);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="glass-panel rounded-2xl p-8 w-full max-w-md animate-slide-up">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h1>
          <p className="text-slate-500">Sign in to your ShopNow account</p>
        </div>
        
        <form className="space-y-5" onSubmit={handleLogin}>
          <Input 
            label="Email Address" 
            type="email" 
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <div>
            <Input 
              label="Password" 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-end mt-2">
              <a href="#" className="text-sm text-primary-600 hover:text-primary-700 font-medium">Forgot password?</a>
            </div>
          </div>

          <Button type="submit" className="w-full mt-4" size="lg">
            Sign In
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-600 text-sm">
            Don't have an account?{' '}
            <Link className='text-blue-500' to={"/auth/register"} >Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
