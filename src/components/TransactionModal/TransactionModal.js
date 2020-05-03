import React from "react";
import { createPortal } from "react-dom";
import { useHistory } from "react-router-dom";

import { Wrapper, Content, CloseIcon } from "components/Modal/Modal.css";

import { Button } from "components";

import { connect } from "react-redux";

// const removeTransaction = (transactions) => {
//   const transaction = transactions.find()
// }

function TransactionModal({ children = [], transactions }) {
  const history = useHistory();
  const handleClose = () => {
    history.goBack();
  };

  return createPortal(
    <Wrapper onClick={handleClose}>
      <Content onClick={(e) => e.stopPropagation()}>
        <CloseIcon onClick={history.goBack}>&times;</CloseIcon>
        {children}

        <Button
          onClick={() => {
            console.log("heh");
          }}
        >
          Remove &times;
        </Button>
      </Content>
    </Wrapper>,
    document.getElementById("transaction-modal")
  );
}

export default connect((state) => {
  return {
    transactions: state.budget.budget.transactions,
  };
})(TransactionModal);
