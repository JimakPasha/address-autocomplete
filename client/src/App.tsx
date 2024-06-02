import React from "react";
import { Snackbar, AutocompleteInput } from "./components";
import { useGetFormData } from "./hooks";
import { generatePattern } from "./utils";
import { FieldsForm } from "./constants";
import "./App.css";

export const App = () => {
  const {
    inputValues,
    autocompleteData,
    showAutocomplete,
    isValidInput,
    snackbar,
    handleInputChange,
    handleInputFocus,
    handleInputBlur,
    handleOptionSelect,
    handleResetForm,
    handleFormSubmit,
  } = useGetFormData();

  return (
    <div className="App">
      <form onSubmit={handleFormSubmit}>
        <AutocompleteInput
          name={FieldsForm.Street}
          label="Street"
          value={inputValues.street}
          isValid={isValidInput.street}
          pattern={generatePattern(autocompleteData.street)}
          isRenderOptions={
            autocompleteData.street.length > 0 &&
            showAutocomplete[FieldsForm.Street]
          }
          options={autocompleteData.street}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onOptionSelect={handleOptionSelect}
        />

        <AutocompleteInput
          name={FieldsForm.State}
          label="State"
          value={inputValues.state}
          isValid={isValidInput.state}
          pattern={generatePattern(autocompleteData.state)}
          isRenderOptions={
            autocompleteData.state.length > 0 &&
            showAutocomplete[FieldsForm.State]
          }
          options={autocompleteData.state}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onOptionSelect={handleOptionSelect}
        />

        <AutocompleteInput
          name={FieldsForm.City}
          label="City"
          value={inputValues.city}
          isValid={isValidInput.city}
          pattern={generatePattern(autocompleteData.city)}
          isRenderOptions={
            autocompleteData.city.length > 0 &&
            showAutocomplete[FieldsForm.City]
          }
          options={autocompleteData.city}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onOptionSelect={handleOptionSelect}
        />

        <AutocompleteInput
          name={FieldsForm.PostalCode}
          label="Postal Code"
          value={inputValues.postalCode}
          isValid={isValidInput.postalCode}
          pattern={generatePattern(autocompleteData.postalCode)}
          isRenderOptions={
            autocompleteData.postalCode.length > 0 &&
            showAutocomplete[FieldsForm.PostalCode]
          }
          options={autocompleteData.postalCode}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onOptionSelect={handleOptionSelect}
        />

        <AutocompleteInput
          name={FieldsForm.Country}
          label="Country"
          value={inputValues.country}
          isValid={isValidInput.country}
          pattern={generatePattern(autocompleteData.country)}
          isRenderOptions={
            autocompleteData.country.length > 0 &&
            showAutocomplete[FieldsForm.Country]
          }
          options={autocompleteData.country}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onOptionSelect={handleOptionSelect}
        />

        <button type="submit">Continue</button>
        <button type="button" onClick={handleResetForm}>
          Reset Form
        </button>
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
};
