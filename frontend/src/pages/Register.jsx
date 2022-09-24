import styled from 'styled-components';
import { register, reset } from '../features/auth/authSlice';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
  });

  const { isError, isSuccess, user, message } = useSelector((state) => {
    return state.auth;
  });

  const { username, password, passwordConfirm } = formData;

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (isSuccess || user) {
      navigate('/home');
    }

    dispatch(reset());
  }, [isError, isSuccess, user, dispatch, navigate, message]);

  const handleChange = (e) => {
    const name = e.target.name;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(register(formData));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormControl>
        <h1>Register</h1>
        <input
          type="text"
          name="username"
          placeholder="Enter a username"
          value={username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter a password"
          value={password}
          onChange={handleChange}
        />
        <input
          type="password"
          name="passwordConfirm"
          placeholder="Confirm password"
          value={passwordConfirm}
          onChange={handleChange}
        />
        <button>Submit</button>
      </FormControl>
    </Form>
  );
};
export default Register;
