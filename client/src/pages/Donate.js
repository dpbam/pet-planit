import React from 'react';
import foundations from '../non-profits.json';

// const stripe = require('stripe')('pk_test_TYooMQauvdEDq54NiTphI7jx');

// const button = document.querySelector('button');
// button.addEventListener('click', () => {
//   fetch('/create-checkout-session', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       items: [
//         { id: 1, quantity: 3 },
//         { id: 2, quantity: 1 },
//         { id: 3, quantity: 2 },
//       ],
//     }),
//   })
//     .then((res) => {
//       if (res.ok) return res.json();
//       return res.json().then((json) => Promise.reject(json));
//     })
//     .then(({ url }) => {
//       window.location = url;
//     })
//     .catch((e) => {
//       console.error(e.error);
//     });
// });

const Donate = () => {
  return (
    <main className='content'>
      <div className='hero-donate'></div>
      <h1 className='donate-h1'>Donate</h1>
      <section class='donate-paws'>
        <p>
          Lend a helping paw, consider donating to one of these wonderful
          organizations.
        </p>
        <div>
          {foundations.map((foundation) => (
            <button
              key={foundation.id}
              onClick={() => window.open(foundation.url, '_blank')}
            >
              {foundation.name}
            </button>
          ))}
        </div>
      </section>
      {/* <div className="donation-divider">
        <hr />OR<hr />
      </div>
      <section className="donate-site">
          <p>Consider donating to keep this website up and running&#42;:</p>
          <small>&#42;50% of proceeds will be donated to an animal rescue non-profit each month.</small>
      </section> */}
      <form action='/create-checkout-session' method='POST'>
        <button type='submit'>Checkout</button>
      </form>
    </main>
  );
};

export default Donate;
