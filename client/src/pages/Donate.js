import React from 'react';
import foundations from '../non-profits.json';

const Donate = () => {
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
      {/* <div className="donation-divider">
        <hr />OR<hr />
      </div>
      <section className="donate-site">
          <p>Consider donating to keep this website up and running&#42;:</p>
          <small>&#42;50% of proceeds will be donated to an animal rescue non-profit each month.</small>
      </section> */}
    </main>
  );
};

export default Donate;
