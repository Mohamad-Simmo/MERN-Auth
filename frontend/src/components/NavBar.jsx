import styled from 'styled-components';
import { FiLogIn, FiEdit } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { logout, reset } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';

const StyledLink = styled(Link)`
  display: flex;
  text-decoration: none;
  color: inherit;
  gap: 5px;

  &:hover {
    color: #ffc757d5;
  }
`;

const Nav = styled.nav`
  padding: 10px;
  background-color: #2e4052;
  color: #ffc857;
  display: flex;
  justify-content: space-around;
  align-items: center;

  h1 {
    font-size: 2.5rem;
  }

  div {
    display: flex;
    gap: 30px;
  }
`;

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };

  return (
    <Nav>
      <h1>Auth</h1>

      <div>
        <StyledLink to="/login">
          <FiLogIn />
          <h4>Login</h4>
        </StyledLink>
        <StyledLink to="/register">
          <FiEdit />
          <h4>Register</h4>
        </StyledLink>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </Nav>
  );
};
export default NavBar;
