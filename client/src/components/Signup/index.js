import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';

import Auth from '../../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    zipcode: '',
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error }] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
      window.location.assign("/pawfeed");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="signup">
      <p>Welcome!</p>
      <h1>Sign Up</h1>
        <form onSubmit={handleFormSubmit}>
        {/* <form> */}
          <div className="full-name">
            <div>
              <label htmlFor="first-name">First name&#42;</label>
              <input
                className='form-input'
                placeholder='Your first name'
                name='firstName'
                type='text'
                id='first-name'
                value={formState.firstName}
                onChange={handleChange}
                required={true}
              />
            </div>
            <div>
              <label htmlFor="last-name">Last name&#42;</label>
              <input
                className='form-input'
                placeholder='Your last name'
                name='lastName'
                type='text'
                id='last-name'
                value={formState.lastName}
                onChange={handleChange}
                required={true}
              />
            </div>
          </div>
          <label htmlFor="email">Zipcode&#42;</label>
          <input
            className='form-input'
            placeholder='Zipcode'
            name='zipcode'
            type='text'
            id='zipcode'
            value={formState.zipcode}
            onChange={handleChange}
            required={true}
          />
          <label htmlFor="name">Username&#42;</label>
          <input
            className='form-input'
            placeholder='Username'
            name='username'
            type='text'
            id='username'
            value={formState.username}
            onChange={handleChange}
            required={true}
          />
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
        {error && <div>Signup failed</div>}
    </div>
  );
};

export default Signup;
