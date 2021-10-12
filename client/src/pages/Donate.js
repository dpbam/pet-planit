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

// split it at the dash to grab the number in the id below
const handleFormSubmit = async (event) => {
  event.preventDefault();
  const donationIdOrSomething = event.target.id.split('-')[0];
};

// all these three as part of function when you hit Submit
updateProduct;

addOrder;

checkout;

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
      {/* maybe radio button for each price point of their donation with submit button OR buttons for each price point*/}
      <form action='/create-checkout-session' method='POST'>
        <button type='submit'>Checkout</button>
        <button id='donation-20'>$20</button>
        <button id='donation-50'>$50</button>
        <button id='donation-100'>$100</button>
      </form>
    </main>
  );
};

export default Donate;
