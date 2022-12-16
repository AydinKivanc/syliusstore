import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import CartTableItem from "./component/CartTableItem";

const Cart = (props) => {
  const cartState = useSelector((state) => state.cartState);
  // cartSlice daki initialState de id ilk basta null oldugundan loading koyduk
  if (cartState.id === null) {
    return (
      <div class="space-medium">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
              Loading...
            </div>
          </div>
        </div>
      </div>
    );
  }

  const cartTableItems = [];
  cartState.items.map((item, index) => {
    cartTableItems.push(
      <CartTableItem
        key={index}
        /* 1. yontem ayri ayri set ederiz 
        id={item.id}
        name={item.name}
        */
        /* 2. spread operator ile tumunu getiririz*/ {...item}
        /* 3. item i set ederiz */ // item= {item}
      />
    );
  });

  return (
    <div class="space-medium">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
            <div class="box">
              <div class="box-head">
                <h3 class="head-title">My Cart (02)</h3>
              </div>

              <div class="box-body">
                <div class="table-responsive">
                  <div class="cart">
                    <table class="table table-bordered ">
                      <thead>
                        <tr>
                          <th>
                            <span>Item</span>
                          </th>
                          <th>
                            <span>Price</span>
                          </th>
                          <th>
                            <span>Quantity</span>
                          </th>
                          <th>
                            <span>Total</span>
                          </th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>{cartTableItems}</tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <a href="#" class="btn-link">
              <i class="fa fa-angle-left"></i> back to shopping
            </a>
          </div>

          <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
            <div class="box mb30">
              <div class="box-head">
                <h3 class="head-title">Price Details</h3>
              </div>
              <div class="box-body">
                <div class=" table-responsive">
                  <div class="pay-amount ">
                    <table class="table mb20">
                      <tbody>
                        <tr>
                          <th>
                            <span>Price ({cartState.items.length} items)</span>
                          </th>
                          <td>
                            {cartState.items.reduce(
                              (currentTotal, item) =>
                                currentTotal + item.subtotal,
                              0
                            )}
                            &nbsp;
                            {cartState.currencyCode}
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <span>VAT Total</span>
                          </th>
                          <td>
                            <span>
                              {cartState.taxTotal} &nbsp;
                              {cartState.currencyCode}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <span>Delivery Charges</span>
                          </th>
                          <td>
                            {cartState.shippingTotal === 0 ? (
                              <strong class="text-green">Free</strong>
                            ) : (
                              <>
                                {cartState.shippingTotal} &nbsp;
                                {cartState.currencyCode}
                              </>
                            )}
                          </td>
                        </tr>
                      </tbody>
                      <tbody>
                        <tr>
                          <th>
                            <span class="mb0" style={{ fontWeight: 700 }}>
                              Amount Payable
                            </span>
                          </th>
                          <td style={{ fontWeight: 700, color: "#1c1e1e" }}>
                            {cartState.items.reduce(
                              (currentTotal, item) =>
                                currentTotal + item.subtotal,
                              0
                            ) +
                              cartState.taxTotal +
                              cartState.shippingTotal}{" "}
                            &nbsp;
                            {cartState.currencyCode}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <Link to="/checkout" class="btn btn-primary btn-block">
                    Proceed To Checkout
                  </Link>
                </div>
              </div>
            </div>

            <div class="box mb30">
              <div class="box-head">
                <h3 class="head-title">Coupons &amp; Offers</h3>
              </div>
              <div class="box-body">
                <form>
                  <div class="coupon-form">
                    <input
                      type="text"
                      name="coupon_code"
                      class="form-control"
                      id="coupon_code"
                      value=""
                      placeholder="Coupon code"
                    />
                    <input
                      type="submit"
                      class="btn btn-primary btn-block"
                      name="apply_coupon"
                      value="Apply coupon"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
