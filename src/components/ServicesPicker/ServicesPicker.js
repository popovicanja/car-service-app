import React from "react";
import stylesStep from "../../styles/components/Step.module.scss";
import styles from "./ServicesPicker.module.scss";
import { Button, Checkbox, Label } from "semantic-ui-react";
import TotalPreview from "../TotalPreview/TotalPreview/TotalPreview";

function ServicesPicker({
  totalInfo,
  couponInfo,
  showCouponField,
  handleCouponChange,
  applyCoupon,
  servicesData,
  setService,
  prevStep,
  nextStep,
}) {
  const handleServiceSelection = (e) => setService(e.target.id);

  const { total } = totalInfo;

  const { couponValue, validCoupon, couponRevealed, showField } = couponInfo;

  return (
    <div className={stylesStep.step}>
      <div className={stylesStep.step__title}>
        Korak 2. Odaberite jednu ili više usluga za koje ste
      </div>
      <div className={stylesStep.step__content}>
        <div className={stylesStep.grid__template}>
          {servicesData &&
            servicesData.map((el) => {
              return (
                <Checkbox
                  key={el.id}
                  label={`${el.name} (${el.price} kn)`}
                  id={el.id}
                  checked={el.checked}
                  onChange={handleServiceSelection}
                />
              );
            })}
        </div>

        <div className={`${styles.coupon__container}`}>
          {!showField ? (
            <span onClick={showCouponField} className={styles.coupon__action}>
              Imam kupon
            </span>
          ) : couponRevealed ? (
            <div>
              {validCoupon ? (
                <Label className="info__message" color="green">
                  Hvala vam, Unijeli ste ispravan kod kupona
                </Label>
              ) : (
                <Label className={styles.error_message} color="red">
                  Žao nam je, kod koji ste unijeli nije ispravan
                </Label>
              )}
            </div>
          ) : (
            <div className="ui action input">
              <input
                placeholder="Unesite kod kupona ovdje"
                id="coupon"
                name="coupon"
                defaultValue={couponValue}
                onChange={(e) => handleCouponChange(e.target.value)}
              />
              <Button
                secondary
                onClick={applyCoupon}
                className={styles.coupon__btn}
                disabled={!couponValue || !total}
                size="tiny"
              >
                Primijeni
              </Button>
            </div>
          )}
        </div>

        <TotalPreview
          showDiscountValue={couponRevealed}
          totalInfo={totalInfo}
        ></TotalPreview>
      </div>
      <div className={stylesStep.step__actions}>
        <Button primary onClick={prevStep}>
          Nazad
        </Button>
        <Button
          primary
          disabled={servicesData.filter((el) => el.checked).length === 0}
          onClick={nextStep}
        >
          Dalje
        </Button>
      </div>
    </div>
  );
}

export default ServicesPicker;
