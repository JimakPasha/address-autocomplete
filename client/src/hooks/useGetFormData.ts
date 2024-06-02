import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  ChangeEvent,
  FormEvent,
} from "react";
import axios from "axios";
import { useSnackbar } from ".";
import { buildAutocompleteUrl, debounce } from "../utils";
import {
  FieldsForm,
  initialAutocompleteData,
  initialInputValues,
  initialShowAutocomplete,
  initialValidInput,
  NON_DIGIT_REGEX,
  CAPITALIZE_FIRST_LETTER_REGEX,
  MESSAGES,
  DEBOUNCE_DELAY,
} from "../constants";

export const useGetFormData = () => {
  const snackbar = useSnackbar();

  const [isOnMask, setIsOnMask] = useState(true);
  const [inputValues, setInputValues] = useState(initialInputValues);
  const [autocompleteData, setAutocompleteData] = useState(
    initialAutocompleteData
  );
  const [showAutocomplete, setShowAutocomplete] = useState(
    initialShowAutocomplete
  );
  const [isValidInput, setIsValidInput] = useState(initialValidInput);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [isLoadingAutocompleteData, setIsLoadingAutocompleteData] = useState(false);

  const isAllFieldsFill = useMemo(
    () =>
      Object.keys(inputValues).every((key) => inputValues[key as FieldsForm]),
    [inputValues]
  );
  const isAllFieldsValid = useMemo(
    () =>
      Object.keys(isValidInput).every((key) => isValidInput[key as FieldsForm]),
    [isValidInput]
  );

  const getAutocompleteData = async (
    inputValues: Record<FieldsForm, string>
  ) => {
    setIsLoadingAutocompleteData(true);
    const url = buildAutocompleteUrl(inputValues);

    try {
      const { data } = await axios.get(url);

      const initialData = {
        street: [],
        city: [],
        state: [],
        postalCode: [],
        country: [],
      };

      const organizedData = data.addresses.reduce((acc: any, address: any) => {
        if (!acc.street.includes(address.street))
          acc.street.push(address.street);
        if (!acc.city.includes(address.city)) acc.city.push(address.city);
        if (!acc.state.includes(address.state)) acc.state.push(address.state);
        if (!acc.postalCode.includes(address.postalCode))
          acc.postalCode.push(address.postalCode);
        if (!acc.country.includes(address.country))
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
    setIsLoadingAutocompleteData(false);
  };

  const debouncedGetAutocompleteData = useCallback(
    debounce(getAutocompleteData, DEBOUNCE_DELAY),
    []
  );

  useEffect(() => {
    getAutocompleteData(inputValues);
  }, []);

  useEffect(() => {
    const isOneOption = Object.keys(autocompleteData).every(
      (key) => autocompleteData[key as FieldsForm].length === 1
    );

    if (isOneOption && isAllFieldsValid) {
      Object.keys(inputValues).forEach((key) => {
        setInputValues((prevData) => ({
          ...prevData,
          [key]: autocompleteData[key as FieldsForm][0],
        }));
      });

      setIsValidInput(initialValidInput);
    }
  }, [autocompleteData]);

  const handleMaskChange = (e: ChangeEvent<HTMLInputElement>) => setIsOnMask(e.target.checked);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === FieldsForm.PostalCode && NON_DIGIT_REGEX.test(value)) {
      return;
    }

    let updatedValue = value;

    if (isOnMask) {
      updatedValue = value
        .toLowerCase()
        .replace(CAPITALIZE_FIRST_LETTER_REGEX, (char) => char.toUpperCase());
    }

    const updatedInputValues = { ...inputValues, [name]: updatedValue };

    const isValid = autocompleteData[name as FieldsForm].includes(updatedValue);

    setIsValidInput((prevState) => ({
      ...prevState,
      [name]: isValid,
    }));

    setInputValues(updatedInputValues);

    debouncedGetAutocompleteData(updatedInputValues);
  };

  const handleInputFocus = (name: FieldsForm) => {
    setShowAutocomplete((prevState) => ({
      ...prevState,
      [name]: true,
    }));
  };

  const handleInputBlur = (name: FieldsForm) => {
    setShowAutocomplete((prevState) => ({
      ...prevState,
      [name]: false,
    }));
  };

  const handleOptionSelect = (name: FieldsForm, value: string) => {
    const updatedInputValues = { ...inputValues, [name]: value };

    setIsValidInput((prevState) => ({
      ...prevState,
      [name]: true,
    }));

    setInputValues(updatedInputValues);
    getAutocompleteData(updatedInputValues);
  };

  const handleResetForm = () => {
    setInputValues(initialInputValues);
    setAutocompleteData(initialAutocompleteData);
    setShowAutocomplete(initialShowAutocomplete);
    setIsValidInput(initialValidInput);

    getAutocompleteData(initialInputValues);
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isAllFieldsFill) {
      Object.keys(inputValues).forEach((key) => {
        if (!inputValues[key as FieldsForm]) {
          setIsValidInput((prevState) => ({
            ...prevState,
            [key]: false,
          }));
        }
      });
      return snackbar.open(MESSAGES.FORM_FILL_OUT_ALL_FIELDS, false);
    }

    setIsLoadingSubmit(true);

    try {
      const { data } = await axios.post("http://localhost:8080/api/address", {
        address: inputValues,
      });

      if (data.ok) {
        snackbar.open(MESSAGES.DATA_SENT_SUCCESSFULLY, true);
      }
      handleResetForm();
    } catch (err: any) {
      snackbar.open(
        err.response?.data?.message || MESSAGES.ERROR_OCCURRED,
        false
      );
    }
    setIsLoadingSubmit(false);
  };

  return {
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
  };
};
