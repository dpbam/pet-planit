import React, { useState } from 'react';
// import { useMutation } from '@apollo/client';
// import { LOGIN_USER } from '../../utils/mutations';

// import Auth from '../../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  // const [login, { error }] = useMutation(LOGIN_USER);.

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();

  //   try {
  //     const { data } = await login({
  //       variables: { ...formState },
  //     });

  //     Auth.login(data.login.token);
  //   } catch (e) {
  //     console.error(e);
  //   }

  //   // clear form values
  //   setFormState({
  //     email: '',
  //     password: '',
  //   });
  // };

  return (
    <div className="login">
      <p>Welcome back!</p>
      <h1>Login</h1>
        {/* <form onSubmit={handleFormSubmit}> */}
        <form>
          <label htmlFor="email">Email&#42;</label> 
          <input
            className='form-input'
            placeholder='Your email'
            name='email'
            type='email'
            id='email'
            value={formState.email}
            onChange={handleChange}
            required={true}
          />
          <label htmlFor="password">Password&#42;</label>
          <input
            className='form-input'
            placeholder='******'
            name='password'
            type='password'
            id='password'
            value={formState.password}
            onChange={handleChange}
            required={true}
          />
          <p className="required">&#42;Required field</p>
          <button className='btn d-block w-100' type='submit'>
            Submit
          </button>
        </form>
        {/* {error && <div>Login failed</div>} */}
    </div>
      
  );
};

export default Login;
