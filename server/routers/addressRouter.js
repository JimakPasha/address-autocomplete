const express = require('express');
const { addresses } = require('../addressData');

const addressRouter = express.Router();

addressRouter.get('/autocomplete', (req, res) => {
  const { street, city, postalCode, state, country } = req.query;

  const filteredAddresses = addresses.filter((address) => {
    const inStreet =
      street !== undefined ? address.street.includes(street) : true;
    const inCity = city !== undefined ? address.city.includes(city) : true;
    const inPostalCode =
      postalCode !== undefined ? address.postalCode.includes(postalCode) : true;
    const inState = state !== undefined ? address.state.includes(state) : true;
    const inCountry =
      country !== undefined ? address.country.includes(country) : true;

    return inStreet && inCity && inPostalCode && inState && inCountry;
  });

  res.json({ addresses: filteredAddresses });
});

addressRouter.post('/', (req, res) => {
  const response = { ok: true };
  const { address } = req.body;
  try {
    if (!address.street) {
      throw new Error(`The street address can't be blank.`);
    }
    if (!address.postalCode) {
      throw new Error(`The postal code can't be blank.`);
    }
    if (!address.city) {
      throw new Error(`The city can't be blank.`);
    }
    if (!address.state) {
      throw new Error(`The state can't be blank.`);
    }
    if (!address.country) {
      throw new Error(`The country can't be blank.`);
    }

    if (
      !addresses.some((add) => {
        let result = true;
        result = result && add.street === address.street;
        result = result && add.postalCode === address.postalCode;
        result = result && add.city === address.city;
        result = result && add.country === address.country;
        return result;
      })
    ) {
      throw new Error(`The given address doesn't match any on our records.`);
    }
  } catch (err) {
    res.status(400);
    response.ok = false;
    response.message = err.message;
  }

  res.json(response);
});

module.exports = { addressRouter };
