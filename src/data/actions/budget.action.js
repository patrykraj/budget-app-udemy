import {
  BUDGET_GET,
  // BUDGET_GET_REQUEST,
  // BUDGET_GET_SUCCESS,
  // BUDGET_GET_FAILURE,
  BUDGETED_CATEGORIES_GET,
  // BUDGETED_CATEGORIES_GET_REQUEST,
  // BUDGETED_CATEGORIES_GET_SUCCESS,
  // BUDGETED_CATEGORIES_GET_FAILURE,
  SET_SELECTED_PARENT_CATEGORY_ID,
  BUDGET_TRANSACTION_ADD,
} from "data/constants";

import API from "data/fetch";

export const fetchBudget = (id) => {
  // dispatch akcje BUDGET_GET_REQUEST
  // dispatch({
  //   type: BUDGET_GET_REQUEST,
  // });
  const promise = API.budget.fetchBudget(id);

  return {
    type: BUDGET_GET,
    promise,
  };

  // wykonac request do api
  // try {
  //   const response = await API.budget.fetchBudget(id);
  //   const data = await response.json();

  //   dispatch({
  //     type: BUDGET_GET_SUCCESS,
  //     payload: data,
  //   });
  // } catch (err) {
  //   dispatch({
  //     type: BUDGET_GET_FAILURE,
  //   });
  // }

  // po skonczeniu requesta BUDGET_GET_REQUEST przekazac dane z requestu
};

export const fetchBudgetedCategories = (id) => {
  const promise = API.budget.fetchBudgetedCategories(id);

  return {
    type: BUDGETED_CATEGORIES_GET,
    promise,
  };

  // wykonac request do api
  // try {
  //   const response = await API.budget.fetchBudgetedCategories(id);
  //   const data = await response.json();

  //   dispatch({
  //     type: BUDGETED_CATEGORIES_GET_SUCCESS,
  //     payload: data,
  //   });
  // } catch (err) {
  //   dispatch({
  //     type: BUDGETED_CATEGORIES_GET_FAILURE,
  //   });
  // }

  // po skonczeniu requesta BUDGET_GET_REQUEST przekazac dane z requestu
};

export const addTransaction = ({ budgetId, data }) => {
  const promise = API.budget.addTransaction({ budgetId, data });

  return {
    type: BUDGET_TRANSACTION_ADD,
    promise,
    successMessage: "Transaction has been added",
  };
};

export const selectParentCategory = (id) => {
  return {
    type: SET_SELECTED_PARENT_CATEGORY_ID,
    payload: id,
  };
};
