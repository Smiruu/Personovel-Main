import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { updateUserToPaid } from "../actions/userActions";
import { useSelector } from "react-redux";

function PaymentScreen() {
  const userLoginInfo = useSelector((state) => state.userLogin.userInfo);
  const userRegisterInfo = useSelector((state) => state.userRegister.userInfo);
  const userInfo = userLoginInfo || userRegisterInfo;
  const dispatch = useDispatch();
  const [sdkReady, setSdkReady] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [showPayPalButtons, setShowPayPalButtons] = useState(false);
  const [subscriptionEndDate, setSubscriptionEndDate] = useState(null);

  useEffect(() => {
    const addPayPalScript = () => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "https://www.paypal.com/sdk/js?client-id=Ad1WVslFyzstzzLW0POqHs4IwuczDbgqHb1z1tlXweb1preOa8fjSxgA-KT2UBDsrDks0R7u_i1vsGLh&currency=USD";
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    addPayPalScript();
    const hasReloaded = localStorage.getItem("hasReloaded");
    if (!hasReloaded) {
      // Reload the page
      addPayPalScript();
      window.location.reload();
      // Set the flag in localStorage to indicate that the page has been reloaded
      localStorage.setItem("hasReloaded", true);
    }
    

    return () => {
      // Cleanup function to remove the dynamically added script
      document.body.removeChild(document.body.lastChild);
    };
  }, []);

  useEffect(() => {
    // Calculate subscription end date when user info changes
    if (userInfo.token && userInfo.token.is_paid) {
      const paidAt = new Date(userInfo.token.paid_at);
      const endDate = new Date(
        paidAt.getFullYear(),
        paidAt.getMonth() + 3,
        paidAt.getDate()
      );
      setSubscriptionEndDate(endDate);
    }
  }, [userInfo]);

  const createOrderHandler = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "5.00", // Adjust the value according to your pricing
            currency_code: "USD",
          },
        },
      ],
    });
  };

  const onSuccessHandler = (details, data) => {
    // Handle successful payment
    console.log("Payment successful:", details);

    // Dispatch the action to update user to paid
    dispatch(updateUserToPaid(userInfo.token.id));

    // Show the thank you message
    setShowThankYou(true);
  };

  const onApproveHandler = async (data, actions) => {
    const order = await actions.order.capture();
    // Handle the captured order, you can log it or perform any other action
    console.log("Order captured:", order);

    // Call the onSuccessHandler to handle the successful payment
    onSuccessHandler(order);
  };

  const closeThankYouPopup = () => {
    setShowThankYou(false);
  };

  const handleRenewSubscription = () => {
    setShowPayPalButtons(true);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Subscribe to our 3 month subscription plan</h1>
      <p style={styles.description}>
        to receive unlimited access to books that is a road to your imagination
      </p>
      <div style={styles.priceContainer}>
        <span style={styles.price}>$5</span>{" "}
        <span style={styles.priceInfo}>per 3 months</span>
      </div>
      {userInfo.token.is_paid ? (
        <>
          <div>
            <button onClick={handleRenewSubscription}>
              Renew Subscription
            </button>
            {subscriptionEndDate && (
              <p>
                Your subscription ends on: {subscriptionEndDate.toDateString()}
              </p>
            )}
          </div>
          {showPayPalButtons && (
            <div style={styles.paypalContainer}>
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "Ad1WVslFyzstzzLW0POqHs4IwuczDbgqHb1z1tlXweb1preOa8fjSxgA-KT2UBDsrDks0R7u_i1vsGLh",
                }}
              >
                <PayPalButtons
                  createOrder={createOrderHandler}
                  onSuccess={onSuccessHandler}
                  onApprove={onApproveHandler}
                />
              </PayPalScriptProvider>
            </div>
          )}
        </>
      ) : (
        <div style={styles.paypalContainer}>
          <PayPalScriptProvider
            options={{
              "client-id":
                "Ad1WVslFyzstzzLW0POqHs4IwuczDbgqHb1z1tlXweb1preOa8fjSxgA-KT2UBDsrDks0R7u_i1vsGLh",
            }}
          >
            <PayPalButtons
              createOrder={createOrderHandler}
              onSuccess={onSuccessHandler}
              onApprove={onApproveHandler}
            />
          </PayPalScriptProvider>
        </div>
      )}
      {showThankYou && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <span style={styles.closeButton} onClick={closeThankYouPopup}>
              X
            </span>
            <h2>Thank You!</h2>
            <p>Your patronage is greatly appreciated.</p>
          </div>
        </div>
      )}
      <p style={styles.noRefundText}>We strictly follow a no refund policy</p>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh", // Ensure container fills the viewport height
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  description: {
    fontSize: "18px",
    marginBottom: "20px",
  },
  priceContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  price: {
    fontSize: "28px",
    fontWeight: "bold",
    marginRight: "5px",
  },
  priceInfo: {
    fontSize: "18px",
  },
  paypalContainer: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    position: "fixed",
    zIndex: 1,
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fefefe",
    margin: "15% auto",
    padding: "20px",
    border: "1px solid #888",
    width: "80%",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    cursor: "pointer",
    fontSize: "20px",
  },
  noRefundText: {
    fontSize: "14px",
    marginTop: "20px",
    color: "red",
  },
};

export default PaymentScreen;
