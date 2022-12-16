import React from "react";
import Breadcrumb from "../../components/breadcrumb";
import SideBarSearch from "../../components/side-bar-search";

const Checkout = () => {
  const breadcrumb = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Cart",
      href: "/cart",
    },
    {
      title: "Checkout",
      href: "/checkout",
    },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumb} />
      <div class="content">
        <div class="container">
          <div class="row">
            <div className="col-12">CHECKOUT PAGE</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
