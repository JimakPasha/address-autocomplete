import { FieldsForm, fieldsFormList } from "./fieldsForm";
import { initializeObject } from "../utils";

export const initialAutocompleteData = initializeObject<string[], FieldsForm>(
    fieldsFormList,
  []
);

export const initialInputValues = initializeObject<string, FieldsForm>(fieldsFormList, "");

export const initialShowAutocomplete = initializeObject<boolean, FieldsForm>(
    fieldsFormList,
  false
);

export const initialValidInput = initializeObject<boolean, FieldsForm>(fieldsFormList, true);
