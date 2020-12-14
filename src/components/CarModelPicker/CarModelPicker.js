import React from "react";
import { Button } from "semantic-ui-react";
import styles from "./CarModelPicker.module.scss";
import stylesStep from "../../styles/components/Step.module.scss";

function CarModelPicker({ carModelsData, handleNextStep, selectCarModel }) {
  const handleCarModelSelection = (event) => {
    selectCarModel(event.target.id);
  };
  return (
    <div className={stylesStep.step}>
      <div className={stylesStep.step__title}>
        Korak 1. Odaberite proizvodzača vašeg vozila
      </div>
      <div className={`${stylesStep.step__content} ${styles.grid__template}`}>
        {carModelsData &&
          carModelsData.map((el) => {
            return (
              <div key={el.id}>
                <label htmlFor={el.id} className={stylesStep.item}>
                  <input
                    name="car"
                    id={el.id}
                    type="radio"
                    value={el}
                    checked={el.checked}
                    onChange={handleCarModelSelection}
                  ></input>
                  <span className={stylesStep.item__name}>{el.name}</span>
                </label>
              </div>
            );
          })}
      </div>
      <div className={stylesStep.step__actions}>
        <Button
          primary
          disabled={carModelsData.filter((el) => el.checked).length === 0}
          onClick={handleNextStep}
        >
          Dalje
        </Button>
      </div>
    </div>
  );
}

export default CarModelPicker;
