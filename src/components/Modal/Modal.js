import React from "react";
import { createPortal } from "react-dom";
import { useHistory } from "react-router-dom";

import { Wrapper, Content, CloseIcon } from "./Modal.css";

function Modal({ children = [] }) {
  const history = useHistory();
  const handleClose = () => {
    history.goBack();
  };

  return createPortal(
    <Wrapper onClick={handleClose}>
      <Content onClick={(e) => e.stopPropagation()}>
        <CloseIcon onClick={history.goBack}>&times;</CloseIcon>
        {children}
      </Content>
    </Wrapper>,
    document.getElementById("modal")
  );
}

export default Modal;
