import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./index.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { connect } from "react-redux";
import {
  fetchBudget,
  fetchBudgetedCategories,
} from "data/actions/budget.action";

import theme from "utils/theme";

import { Navigation, Wrapper, LoadingIndicator, Button } from "components";

function App({ budget, fetchBudget, fetchBudgetedCategories }) {
  useEffect(() => {
    fetchBudget(1);
    fetchBudgetedCategories(1);
  }, [fetchBudget, fetchBudgetedCategories]);

  const { t, i18n } = useTranslation();

  return (
    <>
      <GlobalStyles />
      <Router>
        <Navigation
          items={[
            { content: t("Homepage"), to: "/" },
            { content: t("Budget"), to: "/budget" },
          ]}
          RightElement={
            <div>
              <Button
                variant="regular"
                onClick={() => i18n.changeLanguage("pl")}
              >
                pl
              </Button>
              <Button
                variant="regular"
                onClick={() => i18n.changeLanguage("en")}
              >
                en
              </Button>
            </div>
          }
        />
        <Wrapper>
          <Switch>
            <Route path="/" exact>
              Homepage
            </Route>
            <Route path="/budget">Budget page</Route>
          </Switch>
        </Wrapper>
      </Router>
    </>
  );
}

const ConnectedApp = connect(
  (state) => {
    return {
      budget: state.budget.budget,
    };
  },
  {
    fetchBudget,
    fetchBudgetedCategories,
  }
)(App);

function RootApp() {
  return (
    <ThemeProvider theme={theme}>
      <React.Suspense fallback={<LoadingIndicator />}>
        <ConnectedApp />
      </React.Suspense>
    </ThemeProvider>
  );
}

export default RootApp;
