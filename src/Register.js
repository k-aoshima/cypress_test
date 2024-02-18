import React, { useState, useEffect } from 'react'
import { 
  createUserWithEmailAndPassword, 
  onAuthStateChanged
 } from "firebase/auth";
import { auth } from "./firebase";
import { Navigate, Link } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

function Register() {
  const [ registerEmail, setRegisterEmail ] = useState('')
  const [ registerPassword, setRegisterPassword ] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
    } catch (error) {
      alert("正しく入力してください");
    }
  };

  const [user, setUser] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <>
    {user ? (
      <Navigate to={`/`} /> 
    ) : (
        <>
          <h1>新規登録</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                name="email"
                type="email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                variant="outlined"
                label="メールアドレス"
                sx={{width: '100%'}}
              />
            </div>
            <div>
              <TextField
                name="password"
                type="password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                variant="outlined"
                label="パスワード"
                sx={{width: '100%'}}
              />
            </div>
            <Button type="submit" variant="contained" sx={{width: '100%'}}>登録する</Button>
            <p>アカウントをお持ちの方は<Link to={`/login/`}>こちら</Link></p>
          </form>
        </>
      )}
    </>
  )
}

export default Register;