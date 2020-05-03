import React, { useMemo } from "react";
import { Form, Field } from "react-final-form";
import { groupBy } from "lodash";

const required = (value) => (value ? undefined : "Required");

function AddTransactionForm({ onSubmit, categories }) {
  const groupedCategoriesByParentName = groupBy(
    categories,
    "parentCategory.name"
  );

  const categoryItems = useMemo(
    () =>
      Object.entries(groupedCategoriesByParentName).map(
        ([parentName, categoriesList]) => (
          <optgroup key={parentName} label={parentName}>
            {categoriesList.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </optgroup>
        )
      ),
    [groupedCategoriesByParentName]
  );

  const fieldsData = [
    { name: "description", label: "Description", type: "text" },
    {
      name: "amount",
      label: "Amount",
      type: "number",
      step: "0.01",
      parse: true,
    },
    { name: "categoryId", label: "Category", type: "select" },
    { name: "date", label: "Date", type: "date" },
  ];

  const fields = fieldsData.map((item) => {
    return (
      <Field
        key={item.name}
        name={item.name}
        validate={required}
        parse={item.parse ? (value) => parseFloat(value) : (value) => value}
      >
        {({ input, meta }) => (
          <div>
            <label>{item.label}</label>
            {item.type === "select" ? (
              <select {...input}>{categoryItems}</select>
            ) : (
              <input
                {...input}
                type={item.type}
                placeholder={item.label}
                step={item.type === "number" ? "0.01" : null}
              />
            )}
            {meta.error && meta.touched && <span>{meta.error}</span>}
          </div>
        )}
      </Field>
    );
  });

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          {fields}
          <div className="buttons">
            <button type="submit" disabled={submitting}>
              Submit
            </button>
            <button
              type="button"
              onClick={form.reset}
              disabled={submitting || pristine}
            >
              Reset
            </button>
          </div>
        </form>
      )}
    />
  );
}

export default AddTransactionForm;
