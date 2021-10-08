import React, { useState } from 'react';
// import { useMutation } from '@apollo/client';
// import { ADD_USER } from '../../utils/mutations';

// import Auth from '../../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  // const [addUser, { error }] = useMutation(ADD_USER);

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
  //     const { data } = await addUser({
  //       variables: { ...formState },
  //     });

  //     Auth.login(data.addUser.token);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  return (
    <div>
      <h4>Sign Up</h4>
        {/* <form onSubmit={handleFormSubmit}> */}
        <form>
          <div className="full-name">
            <div>
              <label htmlFor="first-name">First name:</label>
              <input
                className='form-input'
                placeholder='Your first name'
                name='first-name'
                type='text'
                id='first-name'
                value={formState.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="last-name">Last name:</label>
              <input
                className='form-input'
                placeholder='Your last name'
                name='last-name'
                type='text'
                id='last-name'
                value={formState.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
          <label htmlFor="email">Zipcode:</label>
          <input
            className='form-input'
            placeholder='Zipcode'
            name='zipcode'
            type='text'
            id='zipcode'
            value={formState.zipcode}
            onChange={handleChange}
          />
          <label htmlFor="name">Username:</label>
          <input
            className='form-input'
            placeholder='Username'
            name='username'
            type='text'
            id='username'
            value={formState.username}
            onChange={handleChange}
          />
          <label htmlFor="email">Email:</label>
          <input
            className='form-input'
            placeholder='Your email'
            name='email'
            type='email'
            id='email'
            value={formState.email}
            onChange={handleChange}
          />
          <label htmlFor="password">Password:</label>
          <input
            className='form-input'
            placeholder='******'
            name='password'
            type='password'
            id='password'
            value={formState.password}
            onChange={handleChange}
          />
          <button className='btn d-block w-100' type='submit'>
            Submit
          </button>
        </form>
        {/* {error && <div>Signup failed</div>} */}
    </div>
  );
};

export default Signup;
