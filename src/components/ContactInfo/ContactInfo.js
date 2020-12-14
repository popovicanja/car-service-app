import React, { useState } from "react";

import { Form, Button, TextArea } from "semantic-ui-react";
import stylesStep from "../../styles/components/Step.module.scss";
import styles from "./ContactInfo.module.scss";
import {
  validateFullName,
  validateEmail,
  validatePhoneNumber,
  checIsFormValid,
} from "./Validation";

export function ContactInfo({ userInfo, setUserInfo, prevStep, nextStep }) {
  const { fullName, email, phoneNumber, note } = userInfo;
  const [errors, setErrors] = useState(() => ({
    fullName: validateFullName(fullName),
    email: validateEmail(email),
    phoneNumber: validatePhoneNumber(phoneNumber),
  }));
  const [isFormValid, setIsFormValid] = useState(() => checIsFormValid(errors));

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (errors[name]) {
      handleErrors(event);
    }
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleErrors = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "fullName":
        errors.fullName = validateFullName(value);
        break;
      case "email":
        errors.email = validateEmail(value);
        break;
      case "phoneNumber":
        errors.phoneNumber = validatePhoneNumber(value);
        break;
      default:
        break;
    }

    setErrors({ ...errors });
    setIsFormValid(checIsFormValid(errors));
  };

  return (
    <div className={stylesStep.step}>
      <div className={stylesStep.step__title}>Korak 3. Vaši kontakt podaci</div>
      <div
        className={`${stylesStep.step__content} ${stylesStep.grid__template}`}
      >
        <Form>
          <Form.Field>
            <input
              placeholder="Ume i prezime *"
              id="name"
              name="fullName"
              defaultValue={fullName}
              onChange={handleInputChange}
            />
            {!errors.fullName.valid && (
              <span className={styles.error}>{errors.fullName.message}</span>
            )}
          </Form.Field>
          <Form.Field>
            <input
              placeholder="Email adresa *"
              id="email"
              name="email"
              defaultValue={email}
              onChange={handleInputChange}
            />
            {!errors.email.valid && (
              <span className={styles.error}>{errors.email.message}</span>
            )}
          </Form.Field>
          <Form.Field>
            <input
              placeholder="Broj telefona *"
              id="phone"
              name="phoneNumber"
              defaultValue={phoneNumber}
              onChange={handleInputChange}
            />
            {!errors.phoneNumber.valid && (
              <span className={styles.error}>{errors.phoneNumber.message}</span>
            )}
          </Form.Field>
          <Form.Field>
            <TextArea
              placeholder="Napomena (opcionalno)"
              id="note"
              defaultValue={note}
              onChange={handleInputChange}
              name="note"
            />
          </Form.Field>
        </Form>
      </div>
      <div className={stylesStep.step__actions}>
        <Button primary onClick={prevStep}>
          Nazad
        </Button>
        <Button primary disabled={!isFormValid} onClick={nextStep}>
          Dalje
        </Button>
      </div>
    </div>
  );
}

export default ContactInfo;
