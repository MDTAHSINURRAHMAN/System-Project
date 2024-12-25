import { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { auth } from '../firebase.config';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const MainLayout = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav>
        <Link to="/">Home</Link> | <Link to="/pets">Adopt</Link> | <Link to="/add-pet">Add Pet</Link>
        {!user ? (
          <>
            {' | '}
            <Link to="/register">Register</Link> | <Link to="/login">Sign In</Link>
          </>
        ) : (
          <>
            {' | '}
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt="User"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  marginRight: '10px',
                }}
              />
            ) : (
              <span>{user.email}</span>
            )}
            {' | '}
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </nav>
      <hr />
      {/* Render child routes */}
      <Outlet />
    </div>
  );
};

export default MainLayout;
