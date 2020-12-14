import React from "react";
import { Modal, Button, Icon } from "semantic-ui-react";
import CarModelPicker from "../CarModelPicker/CarModelPicker";
import { getManufactures, getServices } from "../../api";
import ServicesPicker from "../ServicesPicker/ServicesPicker";
import ContactInfo from "../ContactInfo/ContactInfo";
import ServicePreview from "../ServicePreview/ServicePreview";
import SuccessMessage from "../SuccessMessage/SuccessMessage";

function Configurator({ open, setOpen }) {
  const stepper = {
    CAR_MODEL_PICKER: 1,
    SERVICES_PICKER: 2,
    USER_INFO: 3,
    SERVICE_PREVIEW: 4,
    SUCCESS_MESSAGE: 5,
  };
  const [step, setStep] = React.useState(1);
  const [carModelsData, setCarModelsData] = React.useState([]);
  const [servicesData, setServicesData] = React.useState([]);
  const totalInitialValue = {
    totalWithoutDiscount: 0,
    discountPercentage: 0,
    discountPrice: 0,
    total: 0,
  };
  const userInitialValue = {
    fullName: "",
    email: "",
    phoneNumber: "",
    note: "",
  };
  const couponInitialValue = {
    couponValue: "",
    validCoupon: false,
    couponRevealed: false,
    showField: false,
  };
  const validCouponValue = "Tokić123";
  const [totalInfo, setTotalInfo] = React.useState(totalInitialValue);
  const [userInfo, setUserInfo] = React.useState(userInitialValue);
  const [couponInfo, setCouponInfo] = React.useState(couponInitialValue);

  React.useEffect(() => {
    const manufacturers = getManufactures().map((el) => {
      el["checked"] = false;
      return el;
    });
    setCarModelsData(manufacturers);

    const services = getServices().map((el) => {
      el["checked"] = false;
      return el;
    });

    setServicesData(services);
  }, []);

  const prevStep = () => setStep((step) => step - 1);

  const nextStep = () => setStep((step) => step + 1);

  const gotToCarPickerStep = () => setStep(stepper.CAR_MODEL_PICKER);

  const gotToServicePickerStep = () => setStep(stepper.SERVICES_PICKER);

  const gotToContactInfoStep = () => setStep(stepper.USER_INFO);

  const handleOrderConfirmation = () => {
    const requestData = {
      userInfo,
      totalInfo,
      carModel: carModelsData.find((el) => el.checked).id,
      services: servicesData.filter((el) => el.checked).map((el) => el.id),
    };

    console.log({ requestData });

    restartState();
    nextStep();
  };

  const selectCarModel = (carModelId) => {
    carModelsData.forEach((el) => {
      el.checked = el.id === Number(carModelId) ? true : false;
    });
    setCarModelsData([...carModelsData]);
  };

  const selectService = (serviceId) => {
    const service = servicesData.find((el) => el.id === Number(serviceId));
    service.checked = !service.checked;
    setServicesData([...servicesData]);
    calculateTotal();
  };

  const closeModalAndRestartStepper = () => {
    setOpen(false);
    setStep(1);
  };

  const restartState = () => {
    setUserInfo(userInitialValue);
    setTotalInfo(totalInitialValue);
    setCouponInfo(couponInitialValue);
    setServicesData(servicesData.map((el) => ({ ...el, checked: false })));
    setCarModelsData(carModelsData.map((el) => ({ ...el, checked: false })));
  };

  const calculateDiscountPrice = (value, discount) => (value * discount) / 100;

  const calculateTotal = () => {
    const total = servicesData
      .filter((el) => el.checked)
      .reduce((acc, curr) => acc + curr.price, 0);
    const { couponRevealed } = couponInfo;
    const { discountPercentage } = totalInfo;
    setTotalInfo({
      ...totalInfo,
      totalWithoutDiscount: total,
      total: couponRevealed
        ? total - calculateDiscountPrice(total, discountPercentage)
        : total,
      discountPrice: couponRevealed
        ? calculateDiscountPrice(total, discountPercentage)
        : 0,
    });
  };

  const showCouponField = () => {
    setCouponInfo({ ...couponInfo, showField: true });
  };

  const applyCoupon = () => {
    const { couponValue } = couponInfo;
    if (couponValue === validCouponValue) {
      const { total } = totalInfo;
      setCouponInfo({ ...couponInfo, couponRevealed: true, validCoupon: true });
      const discountPercentage = 30;
      setTotalInfo({
        ...totalInfo,
        discountPercentage,
        total: total - calculateDiscountPrice(total, discountPercentage),
        discountPrice: calculateDiscountPrice(total, discountPercentage),
      });
    } else {
      setCouponInfo({
        ...couponInfo,
        couponRevealed: true,
        validCoupon: false,
      });
    }
  };

  const onCouponValueChange = (value) => {
    setCouponInfo({ ...couponInfo, couponValue: value });
  };

  const renderComponent = () => {
    switch (step) {
      case stepper.CAR_MODEL_PICKER:
        return (
          <CarModelPicker
            carModelsData={carModelsData}
            selectCarModel={selectCarModel}
            handleNextStep={nextStep}
          ></CarModelPicker>
        );
      case stepper.SERVICES_PICKER:
        return (
          <ServicesPicker
            servicesData={servicesData}
            setService={selectService}
            totalInfo={totalInfo}
            couponInfo={couponInfo}
            handleCouponChange={onCouponValueChange}
            showCouponField={showCouponField}
            applyCoupon={applyCoupon}
            nextStep={nextStep}
            prevStep={prevStep}
          ></ServicesPicker>
        );
      case stepper.USER_INFO:
        return (
          <ContactInfo
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            prevStep={prevStep}
            nextStep={nextStep}
          ></ContactInfo>
        );
      case stepper.SERVICE_PREVIEW:
        return (
          <ServicePreview
            prevStep={prevStep}
            confirmOrder={handleOrderConfirmation}
            changeCarModel={gotToCarPickerStep}
            changeServices={gotToServicePickerStep}
            changeContactInfo={gotToContactInfoStep}
            carModel={carModelsData.find((el) => el.checked)}
            services={servicesData.filter((el) => el.checked)}
            userInfo={userInfo}
            totalInfo={totalInfo}
          ></ServicePreview>
        );
      case stepper.SUCCESS_MESSAGE:
        return (
          <SuccessMessage close={closeModalAndRestartStepper}></SuccessMessage>
        );
      default:
        return;
    }
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button primary>Pokreni Konfigurator</Button>}
    >
      <Modal.Header>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          Konfigurator Servisa
          <Icon name="close" onClick={() => setOpen(false)}></Icon>
        </div>
      </Modal.Header>
      <Modal.Content>{renderComponent()}</Modal.Content>
    </Modal>
  );
}
export default Configurator;
