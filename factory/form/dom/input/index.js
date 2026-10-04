
// ----- IMPORT -----
// import { createInputText, createInputPassword, createInputEmail, createInputNumber, createInputDate, createInputCheckbox, createInputRadio } from './input.js';


/* ============================================
              CREATE INPUT
============================================ */
function createInput(name, inputType, {
  maxLength = null,
  eventChange = null,
  eventInput = null,
  id = null,
  classes = null,
  placeholder = null,
  value = null,
  required = null,
  minLength = null,
  title = null,
  disabled = null,
  readOnly = null,
  autofocus = null,
  autocomplete = null,
  inputmode = null,
  spellcheck = null,
  pattern = null,
  type = null,
  min = null,
  max = null,
  step = null,
  checked = null
} = {}){



  let properties = {
    maxLength,
    eventChange,
    eventInput,
    id,
    classes,
    placeholder,
    value,
    required,
    minLength,
    title,
    disabled,
    readOnly,
    autofocus,
    autocomplete,
    inputmode,
    spellcheck,
    pattern,
    type,
    min,
    max,
    step,
    checked
  }


  // GUARD CLAUSES
  if (!name) throw new Error(`${inputType}: El parámetro 'name' es obligatorio.`);

  // CREATE
  const input = document.createElement('input');
  input.name = name;
  input.classList.add("input");

  // SET PROPERTIES
  Object.entries(properties).forEach(([key, value]) => {

    if (Array.isArray(value) && value.length > 0) {
      input.classList.add(...value);
      return;
    }

    if (typeof value === "function" && key === "eventChange") {
      input.addEventListener('change', value);
      return;
    }

    if (typeof value === "function" && key === "eventInput") {
      input.addEventListener('input', value);
      return;
    }

    if (value !== null) input[key] = value;

  });

  // RETURN
  return input;
}












/* ============================================
              TYPE TEXT
============================================ */
export function createInputText(name, options = {}){

  const textOptions = {
    maxLength: 30,
    required: true,
    type: "text",
    ...options,
    classes: ["input", "input-text", ...(options.classes || [])]
  };

  return createInput(name, "createInputText", textOptions);

}



/* ============================================
              TYPE PASSWORD
============================================ */
export function createInputPassword(name, options = {}){

  const passwordOptions = {
    maxLength: 30,
    required: true,
    type: "password",
    ...options,
    classes: ["input", "input-password", ...(options.classes || [])]
  };

  return createInput(name, "createInputPassword", passwordOptions);
}




/* ============================================
              TYPE EMAIL
============================================ */
export function createInputEmail(name, options = {}) {

  const emailOptions = {
    maxLength: 30,
    required: true,
    type: "email",
    ...options,
    classes: ["input", "input-email", ...(options.classes || [])]
  };

  return createInput(name, "createInputEmail", emailOptions);
}





/* ============================================
              TYPE NUMBER
============================================ */
export function createInputNumber(name, options = {}) {

  const numberOptions = {
    maxLength: 30,
    required: true,
    type: "text",
    inputmode: "numeric",
    pattern: "[0-9]*",
    ...options,
    classes: ["input", "input-number", ...(options.classes || [])]
  };

  return createInput(name, "createInputNumber", numberOptions);
}





/* ============================================
              TYPE DATE
============================================ */
export function createInputDate(name, options = {}) {

  /* Propiedades únicas: min, max, step */

  const dateOptions = {
    required: true,
    type: "date",
    ...options,
    classes: ["input", "input-date", ...(options.classes || [])]
  };

  return createInput(name, "createInputDate", dateOptions);
}



/* ============================================
              TYPE CHECKBOX
============================================ */
export function createInputCheckbox(name, options = {}) {

  /* Propiedades únicas: checked */

  const checkboxOptions = {
    type: "checkbox",
    ...options,
    classes: ["input", "input-checkbox", ...(options.classes || [])]
  };

  return createInput(name, "createInputCheckbox", checkboxOptions);
}




/* ============================================
              TYPE RADIO
============================================ */
export function createInputRadio(name, options = {}) {

  /* Propiedades únicas: checked */

  const radioOptions = {
    type: "radio",
    ...options,
    classes: ["input", "input-radio", ...(options.classes || [])]
  };

  return createInput(name, "createInputRadio", radioOptions);
}



