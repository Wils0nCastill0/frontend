import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import { logout } from '../store/slices/authSlice';

export const useAuth = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Despachamos la acción para cerrar sesión
    navigate('/login'); // Redirigimos al login
  };

  return {
    user: auth.user, // Información del usuario
    token: auth.token, // Token de autenticación
    isAuthenticated: auth.isAuthenticated, // Estado de autenticación
    isLoading: auth.isLoading, // Estado de carga
    error: auth.error, // Error de autenticación si existe
    logout: handleLogout, // Función de cierre de sesión
  };
};
