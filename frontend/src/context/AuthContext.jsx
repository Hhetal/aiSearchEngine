import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setUser(null);
        return;
      }
  
      try {
        const res = await fetch('http://localhost:3000/api/users/me', {
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          }
        });
  
        const data = await res.json();
  
        if (res.ok) {
          setUser(data);
        } else {
          console.error('Invalid or expired token:', data?.message);
          localStorage.removeItem('token'); // ✅ Remove token if invalid
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        localStorage.removeItem('token'); // ✅ Ensure token is removed on error
        setUser(null);
      }
    };
  
    fetchUser();
  }, []); // ✅ Dependency changed to `[]` to avoid infinite re-fetching
  

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
