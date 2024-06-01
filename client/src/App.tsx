import React, { useState } from 'react';
import axios from 'axios';
import Snackbar from './components/Snackbar';
import useSnackbar from './hooks/useSnackbar';
import { buildAutocompleteUrl } from './utils/helpers';
import './App.css';

interface InputValues {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

function App() {
  const [autocompleteData, setAutocompleteData] = useState<any>({});
  const [inputValues, setInputValues] = useState<InputValues>({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  });

  const snackbar = useSnackbar();

  const getAutocompleteData = async (inputValues: InputValues) => {
    const url = buildAutocompleteUrl(inputValues);

    try {
      const { data } = await axios.get(url);

      const initialData = {
        street: [],
        city: [],
        state: [],
        postalCode: [],
        country: []
      };

      const organizedData = data.addresses.reduce((acc: any, address: any) => {
        acc.street.push(address.street);
        acc.city.push(address.city);
        acc.state.push(address.state);
        acc.postalCode.push(address.postalCode);
        acc.country.push(address.country);
        return acc;
      }, initialData);

      if (data.addresses.length) {
        setAutocompleteData(organizedData);
      }
    } catch (err: any) {
      snackbar.open(err.message, false);
      console.error(err.message);
    }
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValues((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('http://localhost:8080/api/address', {
        address: inputValues
      });

      if (data.ok) {
        snackbar.open('Data sent successfully!', true);
      }
    } catch (err: any) {
      snackbar.open(err.response?.data?.message || 'Error occurred', false);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleFormSubmit}>
        <button type="submit">Continue</button>
      </form>
      {snackbar.isOpen && (
        <Snackbar
          message={snackbar.message}
          handleClose={snackbar.close}
          success={snackbar.isSuccess}
        />
      )}
    </div>
  );
}

export default App;