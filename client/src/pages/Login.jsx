import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useAuth } from '../context/AuthContext';
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const {login} = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async(e)=>{
    e.preventDefault();
    setError("");
    try {
      await login(email,password);
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Login Failed")
    }
  }
  return (
    <div className='min-h-screen bg-bg flex justify-center items-center px-4'>
      <div className='w-full max-w-sm'>
        <div className='flex items-center justify-center gap-2 mb-7'>
          <div className='w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-bg font-medium'>
            D
          </div>
          <span className='text-text font-medium text-lg'>DevMate</span>
        </div>
        <h1 className='text-text text-base font-medium text-center mb-1'>Welcome back</h1>
        <p className='text-muted text-sm text-center mb-6'>Log in to continue to your workspace</p>

        <form onSubmit={handleSubmit} action="" className='flex flex-col gap-3'>
          {error && (<p className='text-red-400 text-xs bg-red-950/40 border border-red-900 rounded-lg px-3 py-2'>{error}</p>)}
          <div>
            <label className='text-muted tex-xs mb-1.5 block' htmlFor="">Email</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder='name@example.com' className='w-full bg-surface border border-border rounded-lg px-3 py-2.5 text-text text-sm outline-none focus:border-accent'
            required />
          </div>
          <div>
            <label className="text-muted text-xs mb-1.5 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface border border-border rounded-lg px-3 py-2.5 text-text text-sm outline-none focus:border-accent"
              placeholder="••••••••"
              required
            />
          </div>
          <button type='submit' className='bg-accent text-bg font-medium text-sm rounded-lg py-2.5 mt-1 hover:opacity-90 transition'>Log in</button>
        </form>
        <p>
          New here? {" "}
          <Link to={"/signup"}>Create an account</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
