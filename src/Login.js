import React, { useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from './firebase';
import { Navigate, Link } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

const Login = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(
        auth, 
        loginEmail, 
        loginPassword
      );
    } catch (error) {
      alert("メールアドレスまたはパスワードが間違っています");
    }
  };

  const [user, setUser] = useState();
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  });

  return (
    <>
      {user ? (
        <Navigate to={`/`} />
      ) : (
        <>
          <h1>ログインページ</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                name="email"
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                label="メールアドレス"
                variant="outlined"
                sx={{width: '100%'}}
              />
            </div>
            <div>
              <TextField
                name="password"
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                label="パスワード"
                variant="outlined"
                sx={{width: '100%'}}
              />
            </div>
            <Button type="submit" variant="contained" sx={{width: '100%'}}>ログイン</Button>
            <p>アカウントをお持ちでない方は<Link to={`/register/`}>こちら</Link></p>
          </form>
        </>
      )}
    </>
  );
};

export default Login