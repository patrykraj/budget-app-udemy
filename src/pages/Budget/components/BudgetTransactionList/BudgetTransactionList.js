import React from "react";
import { connect } from "react-redux";
import { groupBy } from "lodash";

import { formatCurrency, formatDate } from "utils";

import { List, ListItem } from "./BudgetTransactionList.css";

import { Link } from "react-router-dom";

function BudgetTransactionList({
  transactions,
  allCategories,
  selectedParentCategoryId,
  budgetedCategories,
  handleClick,
}) {
  const filteredTransactionsBySelectedParentCategory = (() => {
    if (typeof selectedParentCategoryId === "undefined") return transactions;

    if (selectedParentCategoryId === null) {
      return transactions.filter((transaction) => {
        const hasBudgetedCategory = budgetedCategories.some(
          (budgetedCategory) =>
            budgetedCategory.categoryId === transaction.categoryId
        );

        return !hasBudgetedCategory;
      });
    }

    return transactions.filter((transaction) => {
      try {
        const category = allCategories.find(
          (category) => category.id === transaction.categoryId
        );

        const parentCategoryName = category.parentCategory.name;

        return parentCategoryName === selectedParentCategoryId;
      } catch (error) {
        return false;
      }
    });
  })();

  const groupedTransactions = groupBy(
    filteredTransactionsBySelectedParentCategory,
    (transaction) => new Date(transaction.date).getUTCDate()
  );

  return (
    <List>
      {Object.entries(groupedTransactions).map(([key, transactions]) => (
        <li key={key}>
          <ul>
            {transactions.map((transaction) => (
              <Link
                key={transaction.id}
                style={{
                  textDecoration: "none",
                  color: "#111",
                }}
                to={`/budget/transactions/${transaction.id}`}
                onClick={() => handleClick(transaction)}
              >
                <ListItem key={transaction.id}>
                  <div>{transaction.description}</div>
                  <div>{formatCurrency(transaction.amount)}</div>
                  <div>{formatDate(transaction.date)}</div>
                  <div>
                    {
                      (
                        allCategories.find(
                          (category) => category.id === transaction.categoryId
                        ) || {}
                      ).name
                    }
                  </div>
                </ListItem>
              </Link>
            ))}
          </ul>
        </li>
      ))}
    </List>
  );
}

export default connect((state) => ({
  transactions: state.budget.budget.transactions,
  budgetedCategories: state.budget.budgetedCategories,
  allCategories: state.common.allCategories,
  selectedParentCategoryId: state.budget.selectedParentCategoryId,
}))(BudgetTransactionList);
