import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";

import {
  fetchBudget,
  fetchBudgetedCategories,
} from "data/actions/budget.action";
import { fetchAllCategories } from "data/actions/common.action";

import { Grid } from "./Budget.css";
import { LoadingIndicator } from "components";

import BudgetCategoryList from "pages/Budget/components/BudgetCategoryList/BudgetCategoryList";
import BudgetTransactionList from "pages/Budget/components/BudgetTransactionList";

function Budget({
  commonState,
  budgetState,
  fetchBudget,
  fetchBudgetedCategories,
  fetchAllCategories,
}) {
  useEffect(() => {
    fetchBudget(1);
    fetchBudgetedCategories(1);
    fetchAllCategories();
  }, [fetchBudget, fetchBudgetedCategories, fetchAllCategories]);
  const isLoaded = useMemo(
    () => commonState === "LOADED" && Object.keys(budgetState).length === 0,
    [commonState, budgetState]
  );

  return (
    <Grid>
      <section>
        {isLoaded ? <LoadingIndicator /> : <BudgetCategoryList />}
      </section>
      <section>
        {isLoaded ? <LoadingIndicator /> : <BudgetTransactionList />}
      </section>
    </Grid>
  );
}

export default connect(
  (state) => {
    return {
      budget: state.budget.budget,
      commonState: state.common.loadingState,
      budgetState: state.budget.loadingState,
    };
  },
  {
    fetchBudget,
    fetchBudgetedCategories,
    fetchAllCategories,
  }
)(Budget);
