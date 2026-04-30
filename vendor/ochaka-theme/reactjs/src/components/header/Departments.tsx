import { Link } from "react-router-dom";

export default function Departments() {
  return (
    <>
      {" "}
      <li>
        <Link to={`/shop-default`} className="nav-category_link h5">
          <i className="icon icon-tv" />
          Electronics
        </Link>
      </li>
      <li>
        <Link to={`/shop-default`} className="nav-category_link h5">
          <i className="icon icon-arm-chair" />
          Furniture
        </Link>
      </li>
      <li>
        <Link to={`/shop-default`} className="nav-category_link h5">
          <i className="icon icon-shirt" />
          Fashion &amp; Style
        </Link>
      </li>
      <li>
        <Link to={`/shop-default`} className="nav-category_link h5">
          <i className="icon icon-book" />
          Book
        </Link>
      </li>
      <li>
        <Link to={`/shop-default`} className="nav-category_link h5">
          <i className="icon icon-headset" />
          Music
        </Link>
      </li>
      <li>
        <Link to={`/shop-default`} className="nav-category_link h5">
          <i className="icon icon-drop" />
          Cosmetic &amp; Beauty
        </Link>
      </li>
      <li>
        <Link to={`/shop-default`} className="nav-category_link h5">
          <i className="icon icon-mobile" />
          Smartphone
        </Link>
      </li>
      <li>
        <Link to={`/shop-default`} className="nav-category_link h5">
          <i className="icon icon-volley-ball" />
          Sports
        </Link>
      </li>
      <li>
        <Link to={`/shop-default`} className="nav-category_link h5">
          <i className="icon icon-sneaker" />
          Shoes
        </Link>
      </li>
      <li>
        <Link to={`/shop-default`} className="nav-category_link h5">
          <i className="icon icon-camera" />
          Camera - Camcorder
        </Link>
      </li>
      <li>
        <Link to={`/shop-default`} className="nav-category_link h5">
          <i className="icon icon-clock-cd" />
          Clock
        </Link>
      </li>
      <li>
        <Link to={`/shop-default`} className="nav-category_link h5">
          <i className="icon icon-diamond" />
          Jewelry
        </Link>
      </li>
      <li>
        <Link to={`/shop-default`} className="nav-category_link h5">
          <i className="icon icon-barbell" />
          Gym
        </Link>
      </li>
      <li>
        <Link to={`/shop-default`} className="nav-category_link h5">
          <i className="icon icon-bag" />
          Bag
        </Link>
      </li>
    </>
  );
}
