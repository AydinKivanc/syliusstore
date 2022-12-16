import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useApi from "../../../../hooks/useApi";
import { updateFullCart } from "../../../../redux/cartSlice";

const ProductItem = (props) => {
  const cartState = useSelector((state) => state.cartState);
  const api = useApi();
  const dispatch = useDispatch();
  console.log(">>> PRODUCT ITEM PROP", props);

  const onAddToCartButtonClick = (event) => {
    event.preventDefault();
    console.log(">>> PRODUCT DETAILS", props.product);

    const productVariant = props.product.defaultVariant.replace(
      "/api/v2/shop/product-variants/",
      ""
    );

    const postData = {
      productVariant: productVariant,
      quantity: 1,
    };

    api
      .post(`/shop/orders/${cartState.tokenValue}/items`, postData) // API DEN ALDIGIIZ LINKTE tokenValue yi cartState icinden alarak yazdik
      //alert("Clicked here");
      .then((response) => {
        console.log(">>> CART ITEM ADD RESPONSE ", response);
        dispatch(updateFullCart(response.data));
      })
      .catch((error) => {
        console.log(">>> CART ITEM ADD ERROR  ", error);
      });
  };

  return (
    <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 mb30">
      <div className="product-block">
        <div className="product-img">
          <img
            src={
              "https://ecommerce-api.udemig.dev" + props.product.images[0].path
            }
            alt=""
          />
        </div>
        <div className="product-content">
          <h5>
            <a href="#" className="product-title">
              {props.product.name}
              <br />
              <strong>(128GB, Black)</strong>
            </a>
          </h5>
          <div className="product-meta">
            <a href="#" className="product-price">
              $1100
            </a>
            <a href="#" className="discounted-price">
              $1400
            </a>
            <span className="offer-price">20%off</span>
          </div>
          <div className="shopping-btn">
            <a
              href="#"
              className="product-btn btn-cart"
              onClick={onAddToCartButtonClick}
            >
              <i className="fa fa-shopping-cart"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
