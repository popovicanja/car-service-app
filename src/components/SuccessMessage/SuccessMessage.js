import React from "react";

import styles from "./SuccessMessage.module.scss";
import { Button } from "semantic-ui-react";
function SuccessMessage({ close }) {
  return (
    <div className={styles.centered}>
      <div className={styles.title}>Vaša prijava je uspješno poslana</div>
      <div className={styles.description}>
        Vaša prijava je uspješno polsana i zaprimljena. Kontaktirati ćemo vas u
        najkraćem mogućem roku. Hvala vam.
      </div>
      <Button primary onClick={close}>
        Zatvori
      </Button>
    </div>
  );
}

export default SuccessMessage;
