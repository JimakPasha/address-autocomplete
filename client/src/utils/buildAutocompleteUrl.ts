/**
 * Given an address object, produce the URL string to be called for
 * the autocomplete API.
 *
 * @param {Address} address - the address object
 * @property {string} [address.street]
 * @property {string} [address.city]
 * @property {string} [address.state]
 * @property {string} [address.postalCode]
 * @property {string} [address.country]
 * @returns {string} The URL for the autocomplete API
 */
interface Address {
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

export const buildAutocompleteUrl = (address: Address): string => {
  const { street, city, state, postalCode, country } = address;
  let query = "";

  if (street) {
    query += `street=${street}&`;
  }

  if (city) {
    query += `city=${city}&`;
  }

  if (state) {
    query += `state=${state}&`;
  }

  if (postalCode) {
    query += `postalCode=${postalCode}&`;
  }

  if (country) {
    query += `country=${country}`;
  }

  return `http://localhost:8080/api/address/autocomplete?${encodeURI(query)}`;
};
