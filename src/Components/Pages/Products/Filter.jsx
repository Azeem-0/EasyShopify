function Filter(props) {
  const { name, filter } = props;
  return (
    <div className="filter-options">
      {name === "price" ? (
        <Price name={props.name} filter={filter} />
      ) : name === "category" ? (
        <Category filter={filter} name={name} />
      ) : (
        <Quantity filter={filter} name={name} />
      )}
    </div>
  );
}
function Price(props) {
  const { name, filter } = props;
  return (
    <select className="price-select" name={name} onChange={filter}>
      <option name={name} value="head">
        Filter By {name}
      </option>
      <option name={name} value="1000">
        0-999
      </option>
      <option name={name} value="2000">
        1000-1999
      </option>
      <option name={name} value="3000">
        2000-2999
      </option>
      <option name={name} value="4000">
        3000-More
      </option>
    </select>
  );
}
function Category(props) {
  const { value, name, filter } = props;
  return (
    <select className="category-select" value={value} name={name} onChange={filter}>
      <option name={name} value="head">
        Filter By {name}
      </option>
      <option name={name} value="clothes">
        Clothes
      </option>
      <option name={name} value="mobiles">
        Mobiles
      </option>
      <option name={name} value="watches">
        Watches
      </option>
      <option name={name} value="shoes">
        Shoes
      </option>
    </select>
  );
}
function Quantity(props) {
  const { value, name, filter } = props;
  return (
    <select className="quantity-select" value={value} name={name} onChange={filter}>
      <option name={name} value="head">
        Filter By {name}
      </option>
      <option name={name} value="10">
        0-9
      </option>
      <option name={name} value="20">
        10-19
      </option>
      <option name={name} value="30">
        20-More
      </option>
    </select>
  );
}
export { Filter, Price, Category, Quantity };
