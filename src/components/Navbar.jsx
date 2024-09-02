import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { items } from "./Data";
import { BsFillCartCheckFill } from "react-icons/bs";
import Logo from "../assets/Logo.jpeg";
const Navbar = ({ setData, cart }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");

  const filterByCategory = (category) => {
    const filteredItems = items.filter(
      (product) => product.category === category
    );
    setData(filteredItems);
  };

  const filterByPrice = (price) => {
    const filteredItems = items.filter((product) => product.price >= price);
    setData(filteredItems);
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);

    if (value === "no-filter") {
      setData(items);
    } else if (["mobiles", "laptops", "tablets"].includes(value)) {
      filterByCategory(value);
    } else if (["29999", "49999", "69999", "89999"].includes(value)) {
      filterByPrice(parseInt(value, 10));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchTerm}`);
    setSearchTerm("");
  };

  return (
    <>
      <header className="sticky-top">
        <div className="nav-bar">
          <Link to={"/"} className="brand">
            <img
              src={Logo}
              alt="logo"
              width={50}
              height={50}
              className="rounded-circle"
            />
          </Link>

          <form onSubmit={handleSubmit} className="search-bar">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Search Products"
            />
          </form>

          <Link to={"/cart"} className="cart">
            <button type="button" className="btn btn-primary position-relative">
              <BsFillCartCheckFill style={{ fontSize: "1.5rem" }} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cart.length}
                <span className="visually-hidden">unread messages</span>
              </span>
            </button>
          </Link>
        </div>
      </header>
      {location.pathname === "/" && (
        <div className="nav-bar-wrapper">
          <h5 className="text-white">Filter By</h5>
          <select
            value={filter}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="no-filter">All</option>
            <option value="mobiles">Mobiles</option>
            <option value="laptops">Laptops</option>
            <option value="tablets">Tablets</option>
            <option value="29999">{">="}29999</option>
            <option value="49999">{">="}49999</option>
            <option value="69999">{">="}69999</option>
            <option value="89999">{">="}89999</option>
          </select>
        </div>
      )}
    </>
  );
};

export default Navbar;
