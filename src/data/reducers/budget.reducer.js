import {
  LOADING_STATES,

  // BUDGET_GET,
  BUDGET_GET_REQUEST,
  BUDGET_GET_SUCCESS,
  BUDGET_GET_FAILURE,

  // BUDGETED_CATEGORIES_GET,
  BUDGETED_CATEGORIES_GET_REQUEST,
  BUDGETED_CATEGORIES_GET_SUCCESS,
  BUDGETED_CATEGORIES_GET_FAILURE,
  SET_SELECTED_PARENT_CATEGORY_ID,
} from "data/constants";

const initialState = {
  loadingState: true,
  budget: {},
  budgetedCategories: [],
  selectedParentCategoryId: undefined,
};

function budget(state = initialState, action) {
  const newLoadingState = {
    ...state.loadingState,
  };

  switch (action.type) {
    case BUDGET_GET_REQUEST:
      return {
        ...state,
        loadingState: {
          ...state.loadingState,
          // BUDGET_GET_REQUEST: true,
          [action.type]: LOADING_STATES.LOADING,
        },
      };

    case BUDGET_GET_SUCCESS:
      delete newLoadingState.BUDGET_GET_REQUEST;

      return {
        ...state,
        budget: action.payload,
        loadingState: newLoadingState,
      };

    case BUDGET_GET_FAILURE:
      delete newLoadingState.BUDGET_GET_REQUEST;

      return {
        ...state,
        budget: {},
        loadingState: newLoadingState,
      };

    case BUDGETED_CATEGORIES_GET_REQUEST:
      return {
        ...state,
        loadingState: {
          ...state.loadingState,
          // BUDGET_GET_REQUEST: true,
          [action.type]: LOADING_STATES.LOADING,
        },
      };

    case BUDGETED_CATEGORIES_GET_SUCCESS:
      delete newLoadingState.BUDGETED_CATEGORIES_GET_REQUEST;

      return {
        ...state,
        budgetedCategories: action.payload,
        loadingState: newLoadingState,
      };

    case BUDGETED_CATEGORIES_GET_FAILURE:
      delete newLoadingState.BUDGETED_CATEGORIES_GET_REQUEST;

      return {
        ...state,
        budgetedCategories: [],
        loadingState: newLoadingState,
      };

    case SET_SELECTED_PARENT_CATEGORY_ID:
      return {
        ...state,
        selectedParentCategoryId: action.payload,
      };

    default:
      return state;
  }
}

export default budget;
