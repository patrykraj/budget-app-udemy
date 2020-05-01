import React, { useEffect, useMemo } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import {
  fetchBudget,
  fetchBudgetedCategories,
  addTransaction,
} from "data/actions/budget.action";
import { fetchAllCategories } from "data/actions/common.action";

import { Grid } from "./Budget.css";
import { LoadingIndicator, Modal, Button } from "components";

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
              <BudgetTransactionList />
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
