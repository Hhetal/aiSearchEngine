import { redirect } from 'next/navigation';
import Login from '../app/login/page';
import Dashboard from '../app/dashboard/page';

const Homepage = () => {
  // You'll need to implement your authentication check
  const isAuthenticated = false; // Replace with actual authentication logic

  if (!isAuthenticated) {
    return <Login />;
  }

  return <Dashboard />;
}

export default Homepage