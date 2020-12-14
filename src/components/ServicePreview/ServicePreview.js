import React from "react";

import styles from "./ServicePreview.module.scss";
import stylesStep from "../../styles/components/Step.module.scss";

import { Button } from "semantic-ui-react";
import TotalPreview from "../TotalPreview/TotalPreview/TotalPreview";

export function ServicePreview({
  prevStep,
  confirmOrder,
  changeContactInfo,
  changeCarModel,
  changeServices,
  services,
  carModel,
  userInfo,
  totalInfo,
}) {
  const { fullName, email, phoneNumber, note } = userInfo;
  return (
    <div className={stylesStep.step}>
      <div className={stylesStep.step__title}>
        Korak 4. Pregled i potvrda vašeg odabira
      </div>
      <div className={stylesStep.description}>
        Molimo vas da još jednom pogledate i potvrdite unesene podatke. Ukoliko
        želite promijeniti neki od podataka, možete pritsuti gumb za uredjivanje
        pored svake od kategorija. Kada ste provjeriili i potvrdili ispravnost
        svojih podataka pritisnite gumb pošalji na dnu, za slanje upita za
        servis.
      </div>
      <div className={`${stylesStep.step__content}`}>
        <div className={styles.section}>
          <div className={styles.box}>
            <div className={styles.box__header}>
              <div className={styles.box__title}>Model vozila</div>
              <Button onClick={changeCarModel} secondary size="tiny">
                Uredi
              </Button>
            </div>
            <div>{carModel?.name}</div>
          </div>
          <div className={styles.box}>
            <div className={styles.box__header}>
              <div className={styles.box__title}>Odabrane usluge</div>
              <Button onClick={changeServices} secondary size="tiny">
                Uredi
              </Button>
            </div>
            {services &&
              services.length &&
              services.map((el) => (
                <div className={styles.list__item} key={el.id}>
                  <span className={styles.list__label}>{el.name}</span>
                  <span className={styles.list__value}>
                    {el.price.toFixed(2)}kn
                  </span>
                </div>
              ))}
            <TotalPreview
              showDiscountValue={true}
              totalInfo={totalInfo}
            ></TotalPreview>
          </div>
        </div>
        <div>
          <div className={styles.box}>
            <div className={styles.box__header}>
              <div className={styles.box__title}>Kontakt podaci</div>
              <Button onClick={changeContactInfo} secondary size="tiny">
                Uredi
              </Button>
            </div>
            <div className={styles.section}>
              <div>
                <div className={styles.list__item}>
                  <span>Ime i prezime: </span>
                  <span className={styles.list__value}>{fullName}</span>
                </div>
                <div className={styles.list__item}>
                  <span>Broj telefona: </span>
                  <span className={styles.list__value}>{phoneNumber}</span>
                </div>
              </div>
              <div>
                <div className={styles.list__item}>
                  <span>Email adres: </span>
                  <span className={styles.list__value}>{email}</span>
                </div>
                <div className={styles.list__item}>
                  <span>Napomena: </span>
                  <span className={styles.list__value}>{note || "-"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={stylesStep.step__actions}>
        <Button primary onClick={prevStep}>
          Nazad
        </Button>
        <Button primary onClick={confirmOrder}>
          Pošalji
        </Button>
      </div>
    </div>
  );
}

export default ServicePreview;
