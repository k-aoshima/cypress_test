import React, {useState, useEffect} from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from './firebase'
import { useNavigate, Navigate } from 'react-router-dom';
import { Button } from '@mui/material';
import TaskManagement from './TaskManagement';

function MyPage() {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
  }, []);

  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/login/");
  }

  return (
    <>
    {!loading && (      
      <>
        {!user ? (
          <Navigate to={`/login/`} />
        ) : (
          <>
            <h1>マイページ</h1>
            <p>{user?.email}</p>
            <Button  type="submit" variant="contained" onClick={logout}>ログアウト</Button>
            <TaskManagement />
          </>
        )}
      </>
    )}
    </>
  )
}

export default MyPage