import React from "react";
import {
  Checkbox,
  AutocompleteInput,
  Snackbar,
  ScreenLoader,
} from "./components";
import { useGetFormData } from "./hooks";
import { generatePattern } from "./utils";
import { FieldsForm } from "./constants";
import "./App.css";

export const App = () => {
  const {
    isOnMask,
    inputValues,
    autocompleteData,
    showAutocomplete,
    isValidInput,
    snackbar,
    isLoadingSubmit,
    isLoadingAutocompleteData,
    handleMaskChange,
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
        <Checkbox
          name="letterCaseMask"
          label="Letter Case Mask"
          checked={isOnMask}
          description={`By checking this checkbox, you don't need to worry about the case of the letters you enter. This feature helps automatically correct the text you enter to quickly and better find options in the dropdowns.`}
          onChange={handleMaskChange}
        />

        <AutocompleteInput
          name={FieldsForm.Street}
          label="Street"
          value={inputValues.street}
          isValid={isValidInput.street}
          pattern={generatePattern(autocompleteData.street)}
          isRenderOptions={showAutocomplete[FieldsForm.Street]}
          options={autocompleteData.street}
          isLoadingOptions={isLoadingAutocompleteData}
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
          isRenderOptions={showAutocomplete[FieldsForm.State]}
          options={autocompleteData.state}
          isLoadingOptions={isLoadingAutocompleteData}
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
          isRenderOptions={showAutocomplete[FieldsForm.City]}
          options={autocompleteData.city}
          isLoadingOptions={isLoadingAutocompleteData}
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
          isRenderOptions={showAutocomplete[FieldsForm.PostalCode]}
          options={autocompleteData.postalCode}
          isLoadingOptions={isLoadingAutocompleteData}
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
          isRenderOptions={showAutocomplete[FieldsForm.Country]}
          options={autocompleteData.country}
          isLoadingOptions={isLoadingAutocompleteData}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onOptionSelect={handleOptionSelect}
        />

        <div className="actions">
          <button type="submit">Continue</button>
          <button type="button" onClick={handleResetForm}>
            Reset Form
          </button>
        </div>
      </form>

      {snackbar.isOpen && (
        <Snackbar
          message={snackbar.message}
          handleClose={snackbar.close}
          success={snackbar.isSuccess}
        />
      )}

      {isLoadingSubmit && <ScreenLoader />}
    </div>
  );
};
