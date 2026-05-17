import { useAuth } from '../context/AuthContext';

const AdminOnly = ({ children }: any) => {
  const { user } = useAuth();

  if (user?.role !== 'admin') {
    return null;
  }

  return children;
};

export default AdminOnly;