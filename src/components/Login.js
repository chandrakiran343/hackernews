import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import { AUTH_TOKEN } from './constants';


const SIGNUP_MUTATION = gql`
  mutation SignupMutation(
    $email: String!
    $password: String!
    $name: String!
  ) {
    signup(
      email: $email
      password: $password
      name: $name
    ) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation(
    $email: String!
    $password: String!
  ) {
    login(email: $email, password: $password) {
      token
    }
  }
`;
const Login = () => {

    const navigate = useNavigate();
    const [form, setForm] = useState({
        login: true,
        email: '',
        password:'',
        name:''
    });

    const [login] = useMutation(LOGIN_MUTATION, {
      variables: {
        email: form.email,
        password: form.password
      },
      onCompleted: ({ login }) => {
        localStorage.setItem(AUTH_TOKEN, login.token);
        navigate('/');
      }
    });
    
    const [signup] = useMutation(SIGNUP_MUTATION, {
      variables: {
        name: form.name,
        email: form.email,
        password: form.password
      },
      onCompleted: ({ signup }) => {
        localStorage.setItem(AUTH_TOKEN, signup.token);
        navigate('/');
      }
    });

    return (
        <div>
            <h4 className="mv3">
        {form.login ? 'Login' : 'Sign Up'}
      </h4>
      <div className="flex flex-column">
        {!form.login && (
          <input
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value
              })
            }
            type="text"
            placeholder="Your name"
          />
        )}
        <input
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value
            })
          }
          type="text"
          placeholder="Your email address"
        />
        <input
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value
            })
          }
          type="password"
          placeholder="Choose a safe password"
        />
      </div>
      <div className="flex mt3">
  <button
    className="pointer mr2 button"
    onClick={form.login ? login : signup}
  >
    {form.login ? 'login' : 'create account'}
  </button>
  <button
    className="pointer button"
    onClick={(e) =>
      setForm({
        ...form,
        login: !form.login
      })
    }
  >
    {form.login
      ? 'need to create an account?'
      : 'already have an account?'}
  </button>
</div>
        </div>
      );
}
 
export default Login;