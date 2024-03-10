import React, {useState, useEffect} from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from './firebase'
import { useNavigate, Navigate } from 'react-router-dom';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import TaskManagement from './TaskManagement';
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/system';
import { Image } from '@mui/icons-material';

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
    <Box>
      <AppBar 
        position="fixed"
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            マイページ
          </Typography>
          <Box sx ={{ mr: 3 }}>
            {!user.photoURL ? (
              <Box>{user?.email}</Box>
            ) : (
              <Image src={user?.photoURL} alt="Icon Image"/>
            )}
          </Box>
          <Button color="inherit" onClick={logout}>ログアウト</Button>
        </Toolbar>
      </AppBar>
      {!loading && (      
        <Box sx={{ mt: 10 }}>
          {!user ? (
            <Navigate to={`/login/`} />
          ) : (
            <Box>
              <TaskManagement />
            </Box>
          )}
        </Box>
      )}
    </Box>
  )
}

export default MyPage