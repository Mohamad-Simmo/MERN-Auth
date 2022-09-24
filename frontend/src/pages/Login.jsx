import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

const Form = styled.form`
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;
const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 300px;

  h1 {
    text-align: center;
  }

  input {
    padding: 7px;
  }
`;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (isSuccess || user) {
      navigate('/home');
    }

    dispatch(reset());
  }, [isError, isSuccess, user, dispatch, navigate, message]);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const name = e.target.name;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(login(formData));
  };

  if (isLoading) return <ClipLoader />;

  return (
    <Form onSubmit={handleSubmit}>
      <FormControl>
        <h1>Login</h1>
        <input
          type="text"
          name="username"
          placeholder="Enter your username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </FormControl>
    </Form>
  );
};
export default Login;
