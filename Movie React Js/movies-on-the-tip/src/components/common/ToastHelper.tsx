import React, { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

type Props = {
  heading: string;
  message: string;
  variant: string;
  onCloseHandler: Function;
};

const ToastHelper = ({ heading, message, variant, onCloseHandler }: Props) => {
  const [show, setShow] = useState(true);

  return (
    <ToastContainer
      position="top-end"
      style={{ zIndex: "1" }}
      containerPosition="fixed"
    >
      <Toast
        onClose={() => {
          setShow(false);
          onCloseHandler();
        }}
        show={show}
        delay={3000}
        autohide
        bg={variant.toLowerCase()}
      >
        <Toast.Header>
          <strong className="me-auto">{heading}</strong>
        </Toast.Header>
        <Toast.Body className="text-white">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastHelper;
