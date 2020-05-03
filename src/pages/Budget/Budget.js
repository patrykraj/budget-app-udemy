import React, { useEffect, useMemo, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import {
  fetchBudget,
  fetchBudgetedCategories,
  addTransaction,
} from "data/actions/budget.action";
import { fetchAllCategories } from "data/actions/common.action";

import { Grid } from "./Budget.css";
import { LoadingIndicator, Modal, TransactionModal, Button } from "components";

import BudgetCategoryList from "pages/Budget/components/BudgetCategoryList/BudgetCategoryList";
import BudgetTransactionList from "pages/Budget/components/BudgetTransactionList";
import AddTransactionForm from "components/AddTransactionForm";

function Budget({
  commonState,
  budgetState,
  fetchBudget,
  budget,
  fetchBudgetedCategories,
  fetchAllCategories,
  allCategories,
  addTransaction,
}) {
  const history = useHistory();

  useEffect(() => {
    fetchBudget(1);
    fetchBudgetedCategories(1);
    fetchAllCategories();
  }, [fetchBudget, fetchBudgetedCategories, fetchAllCategories]);
  const isLoaded = useMemo(
    () => commonState === "LOADED" && Object.keys(budgetState).length === 0,
    [commonState, budgetState]
  );

  const handleSubmitAddTransaction = (values) => {
    addTransaction({
      budgetId: budget.id,
      data: values,
    }).then(() => {
      history.goBack();
    });
  };

  const [selectedItem, setSelectedItem] = useState();

  const items = selectedItem
    ? Object.entries(selectedItem).map(([key, transaction]) => {
        console.log(selectedItem);
        if (key === "categoryId") {
          const item = allCategories.find((category) => {
            return category.id === transaction;
          });

          return <p key={key}>category: {item ? item.name : "Other"}</p>;
        }

        return (
          <p key={key}>
            {key}: {transaction}
          </p>
        );
      })
    : undefined;

  return (
    <>
      <Grid>
        <section>
          {isLoaded ? <LoadingIndicator /> : <BudgetCategoryList />}
        </section>
        <section>
          {isLoaded ? (
            <LoadingIndicator />
          ) : (
            <>
              <Button to="/budget/transactions/new">Add new transaction</Button>
              <BudgetTransactionList handleClick={setSelectedItem} />
            </>
          )}
        </section>
      </Grid>
      <Switch>
        <Route path="/budget/transactions/new">
          <Modal>
            <AddTransactionForm
              categories={allCategories}
              onSubmit={handleSubmitAddTransaction}
            />
          </Modal>
        </Route>
        <Route path="/budget/transactions/:id">
          <TransactionModal children={items} />
        </Route>
      </Switch>
    </>
  );
}

export default connect(
  (state) => {
    return {
      budget: state.budget.budget,
      commonState: state.common.loadingState,
      budgetState: state.budget.loadingState,
      allCategories: state.common.allCategories,
    };
  },
  {
    fetchBudget,
    fetchBudgetedCategories,
    fetchAllCategories,
    addTransaction,
  }
)(Budget);
