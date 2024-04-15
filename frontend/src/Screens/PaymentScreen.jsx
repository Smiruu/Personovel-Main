import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { updateUserToPaid } from "../actions/userActions";
import { useSelector } from "react-redux";
import { Modal, Button, Card } from "react-bootstrap";
import Loader from "../Components/Loader";
import { FaCheckCircle } from "react-icons/fa";

function PaymentScreen() {
  const userLoginInfo = useSelector((state) => state.userLogin.userInfo);
  const userRegisterInfo = useSelector((state) => state.userRegister.userInfo);
  const userInfo = userLoginInfo || userRegisterInfo;
  const dispatch = useDispatch();
  const [sdkReady, setSdkReady] = useState(false);
  const [showPayPalButtons, setShowPayPalButtons] = useState(false);
  const [subscriptionEndDate, setSubscriptionEndDate] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const onError = (err) => {
    console.error("PayPal SDK error:", err);
  };

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
      addPayPalScript();
      window.location.reload();
      localStorage.setItem("hasReloaded", true);
    }

    return () => {
      document.body.removeChild(document.body.lastChild);
    };
  }, []);

  useEffect(() => {
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
            value: "20.00", // Total amount
            currency_code: "USD",
            breakdown: {
              item_total: { currency_code: "USD", value: "20.00" },
            },
          },
          description: "Personovel 3 months subscription plan", // Subscription description
          items: [
            {
              name: "Subscription",
              unit_amount: {
                currency_code: "USD",
                value: "16.00", // Subscription amount
              },
              quantity: "1",
            },
            {
              name: "Royalty",
              unit_amount: {
                currency_code: "USD",
                value: "4.00", // Royalty amount
              },
              quantity: "1",
            },
          ],
        },
      ],
    });
  };

  const onSuccessHandler = (details, data) => {
    console.log("Payment successful:", details);

    dispatch(updateUserToPaid(userInfo.token.id));

    setShowConfirmation(true);
  };

  const onApproveHandler = async (data, actions) => {
    const order = await actions.order.capture();
    console.log("Order captured:", order);

    onSuccessHandler(order);
  };

  const handleRenewSubscription = () => {
    setShowPayPalButtons(true);
  };

  const handleCancelClose = () => {
    setShowConfirmation(false);
  };

  const handleConfirmClose = () => {
    setShowConfirmation(false);
  };

  const [loading, setLoading] = useState(false);

  const onButtonLoading = (loadingState) => {
    setLoading(loadingState);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        fontFamily: "Montserrat, sans-serif",
      }}
    >
      <Card
        style={{
          maxWidth: "500px",
          minWidth: "300px",
          backgroundImage: 'url("/images/payment.gif")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Card.Body>
          <div className="text-center mb-4">
            <h1
              className="display-4"
              style={{
                color: "#007bff",
                fontWeight: "bold",
                fontFamily: "Dancing Script",
              }}
            >
              Subscribe Now!
            </h1>
            <h2
              className="h4"
              style={{
                color: "white",
                fontWeight: "bold",
                fontFamily: "Montserrat",
              }}
            >
              3-Month Plan Subscription
            </h2>
            <p
              style={{
                fontStyle: "italic",
                fontSize: "1.1rem",
                color: "white",
              }}
            >
              Transform your imagination into the different worlds of novels.
            </p>
          </div>
          <div className="mb-4">
            <p className="lead" style={{ color: "white", fontSize: "1.1rem" }}>
              <FaCheckCircle className="mr-2" style={{ color: "green" }} />{" "}
              Unlimited Access to Novels.
            </p>
          </div>

          <div className="text-center mb-4">
            <span
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#007bff",
                marginRight: "0.5rem",
              }}
            >
              $20
            </span>
            <span
              style={{
                fontSize: "1.2rem",
                color: "white",
                fontFamily: "Montserrat",
              }}
            >
              per 3 months
            </span>
          </div>
          {loading ? (
            <div className="text-center mt-3">
              <Loader />
            </div>
          ) : (
            <>
              {userInfo.token.is_paid ? (
                <>
                  <div className="text-center mt-3">
                    <button
                      className="btn btn-primary"
                      onClick={handleRenewSubscription}
                      style={{ marginBottom: "1rem" }}
                    >
                      Renew Subscription
                    </button>
                    {subscriptionEndDate && (
                      <p
                        className="mb-0"
                        style={{
                          fontSize: "0.9rem",
                          fontStyle: "italic",
                          color: "#6c757d",
                          fontFamily: "Montserrat",
                        }}
                      >
                        Your subscription ends on:{" "}
                        {subscriptionEndDate.toDateString()}
                      </p>
                    )}
                  </div>

                  {showPayPalButtons && (
                    <div className="mt-3">
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
                          onError={onError}
                        />
                      </PayPalScriptProvider>
                    </div>
                  )}
                </>
              ) : (
                <div className="mt-3">
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
                      onError={onError}
                    />
                  </PayPalScriptProvider>
                </div>
              )}
            </>
          )}

          <Modal show={showConfirmation} onHide={handleCancelClose}>
            <Modal.Header closeButton>
              <Modal.Title>Thank You! </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Your payment was successful. Your subscription has been renewed.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleConfirmClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <p
            className="text-center mt-3"
            style={{
              fontSize: "0.9rem",
              fontStyle: "italic",
              color: "white",
              fontFamily: "Montserrat",
            }}
          >
            We strictly follow a no refund policy. <br />
            Refresh the screen if you face any issues.
          </p>
        </Card.Body>
      </Card>
      <div
        style={{
          position: "fixed",
          bottom: "100px",
          right: "20px",
          zIndex: "9999",
          width: "300px",
          height: "250px",
        }}
      >
        <img
          src="/images/paypal-shit.gif"
          alt="paypal"
          className="img-fluid"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        />
      </div>
    </div>
  );
}

export default PaymentScreen;
