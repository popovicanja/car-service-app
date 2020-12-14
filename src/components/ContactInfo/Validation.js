const validEmailRegex = RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
const validPhoneRegex = RegExp(/^[0-9]{0,14}$/i);

const requiredFieldMessage = "Ovo polje je obavezno";

const validateFullName = (value) =>
  !value
    ? { message: requiredFieldMessage, valid: false }
    : { message: "", valid: true };

const validateEmail = (value) =>
  !value
    ? { message: requiredFieldMessage, valid: false }
    : validEmailRegex.test(value)
    ? { message: "", valid: true }
    : { message: "Nevalidan format!", valid: false };

const validatePhoneNumber = (value) =>
  !value
    ? { message: requiredFieldMessage, valid: false }
    : validPhoneRegex.test(value)
    ? { message: "", valid: true }
    : { message: "Nevalidan format!", valid: false };

const checIsFormValid = (errors) => {
  for (const key of Object.keys(errors)) {
    if (!errors[key].valid) {
      return false;
    }
  }
  return true;
};

export {
  validateFullName,
  validateEmail,
  validatePhoneNumber,
  checIsFormValid,
};
