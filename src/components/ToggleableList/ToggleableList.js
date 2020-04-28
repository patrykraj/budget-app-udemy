import React, { useState, useEffect } from "react";

const Item = ({ item, onClickHandler, isActive }) => (
  <div>
    <item.Trigger onClick={onClickHandler} />
    {isActive && item.children}
  </div>
);

function ToggleableList({ items, clickRef }) {
  const [selectedItem, setSelectedItem] = useState();

  useEffect(() => {
    clickRef.current = setSelectedItem;
  }, [clickRef, setSelectedItem]);

  const list = items.map((item) => (
    <Item
      key={item.id}
      item={item}
      onClickHandler={setSelectedItem}
      isActive={selectedItem === item.id}
    />
  ));

  return <>{list}</>;
}

export default ToggleableList;
