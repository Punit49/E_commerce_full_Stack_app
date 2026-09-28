import React, { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Link, useNavigate } from 'react-router';
import useAPI from '../../../hooks/useApi';

export const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const API = useAPI();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', {
        name: `${firstName} ${lastName}`.trim(),
        email,
        password,
        confirmPassword
      });
      navigate('/auth/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="glass-panel rounded-2xl p-8 w-full max-w-md animate-slide-up">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Create Account</h1>
          <p className="text-slate-500">Join ShopNow today</p>
        </div>
        
        <form className="space-y-5" onSubmit={handleRegister}>
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="First Name" 
              placeholder="John" 
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Input 
              label="Last Name" 
              placeholder="Doe" 
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          
          <Input 
            label="Email Address" 
            type="email" 
            placeholder="you@example.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input 
            label="Password" 
            type="password" 
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input 
            label="Confirm Password" 
            type="password" 
            placeholder="••••••••" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button type="submit" className="w-full mt-4" size="lg">
            Create Account
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-600 text-sm">
            Already have an account?{' '}
            <Link className='text-blue-500' to={"/auth/login"} >Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
