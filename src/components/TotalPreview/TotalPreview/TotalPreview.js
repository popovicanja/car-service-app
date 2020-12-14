import React from "react";
import styles from "./TotalPreview.module.scss";

function TotalPreview({ showDiscountValue, totalInfo }) {
  const {
    total,
    totalWithoutDiscount,
    discountPrice,
    discountPercentage,
  } = totalInfo;
  return (
    <div className={`${styles.total__info}`}>
      {showDiscountValue && (
        <div className={styles.box}>
          <span className={styles.box__label}>Osnovica: </span>
          <span className={styles.box__value}>
            {totalWithoutDiscount.toFixed(2)}kn
          </span>
        </div>
      )}
      {showDiscountValue && (
        <div className={styles.box}>
          <span className={styles.box__label}>
            Popust({discountPercentage}%):{" "}
          </span>
          <span className={styles.box__value}>
            -{discountPrice.toFixed(2)}kn
          </span>
        </div>
      )}
      <div className={styles.box}>
        <span className={`${styles.box__label} ${styles.total}`}>Ukupno: </span>
        <span className={`${styles.box__value} ${styles.total}`}>
          {total.toFixed(2)}kn
        </span>
      </div>
    </div>
  );
}

export default TotalPreview;
