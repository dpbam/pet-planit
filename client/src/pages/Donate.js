import React, { useEffect } from 'react';
import foundations from '../non-profits.json';
import { loadStripe } from '@stripe/stripe-js';
import { QUERY_CHECKOUT } from '../utils/queries';
import { useLazyQuery } from '@apollo/client';

const Donate = () => {
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  function submitCheckout(event) {
    event.preventDefault();
    // split it at the dash to grab the number in the id below
    const donationId = event.target.id.split('-')[1];

    const productIds = [];
    productIds.push({ id: donationId });

    getCheckout({
      variables: { products: productIds },
    });
  }
  return (
    <main className='content'>
      <div className='hero-donate'></div>
      <h1 className='donate-h1'>Donate</h1>
      <section className='donate-paws'>
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
      <div className='donation-divider'>
        <hr />
        OR
        <hr />
      </div>
      <section className='donate-site'>
        <p>Consider donating to keep this website up and running&#42;:</p>
        <small>
          &#42;50% of proceeds will be donated to an animal rescue non-profit
          each month.
        </small>
      </section>
    </main>
  );
};

export default Donate;
