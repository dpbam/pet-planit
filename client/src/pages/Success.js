import React, { useEffect } from 'react';
import Jumbotron from '../components/Jumbotron';
import { useMutation } from '@apollo/client';
import { ADD_DONATION } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';

function Success() {
  const [addDonation] = useMutation(ADD_DONATION);

  useEffect(() => {
    async function saveDonation() {
      const cart = await idbPromise('cart', 'get');
      const products = cart.map((item) => item._id);

      if (products.length) {
        const { data } = await addDonation({ variables: { products } });
        const productData = data.addDonation.products;

        productData.forEach((item) => {
          idbPromise('cart', 'delete', item);
        });
      }

      setTimeout(function () {
        window.location.assign('/');
      }, 3000);
    }

    saveDonation();
  }, [addDonation]);
  return (
    <div>
      <Jumbotron>
        <h1>Success!</h1>
        <h2>Thank you for your donation!</h2>
        <h2>You will now be redirected to the homepage</h2>
      </Jumbotron>
    </div>
  );
}

export default Success;
