import {
  BUDGET_GET_REQUEST,
  BUDGET_GET_SUCCESS,
  BUDGET_GET_FAILURE,
  BUDGETED_CATEGORIES_GET_REQUEST,
  BUDGETED_CATEGORIES_GET_SUCCESS,
  BUDGETED_CATEGORIES_GET_FAILURE,
} from "data/constants";

import API from "data/fetch";

export const fetchBudget = (id) => async (dispatch) => {
  // dispatch akcje BUDGET_GET_REQUEST
  dispatch({
    type: BUDGET_GET_REQUEST,
  });

  // wykonac request do api
  try {
    const response = await API.budget.fetchBudget(id);
    const data = await response.json();

    dispatch({
      type: BUDGET_GET_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: BUDGET_GET_FAILURE,
    });
  }

  // po skonczeniu requesta BUDGET_GET_REQUEST przekazac dane z requestu
};

export const fetchBudgetedCategories = (id) => async (dispatch) => {
  dispatch({
    type: BUDGETED_CATEGORIES_GET_REQUEST,
  });

  // wykonac request do api
  try {
    const response = await API.budget.fetchBudgetedCategories(id);
    const data = await response.json();

    dispatch({
      type: BUDGETED_CATEGORIES_GET_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: BUDGETED_CATEGORIES_GET_FAILURE,
    });
  }

  // po skonczeniu requesta BUDGET_GET_REQUEST przekazac dane z requestu
};
