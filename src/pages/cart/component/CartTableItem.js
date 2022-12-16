import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useApi from "../../../hooks/useApi";
import { updateFullCart } from "../../../redux/cartSlice";

const CartTableItem = (props) => {
  const cartState = useSelector((state) => state.cartState);
  const api = useApi();
  const dispatch = useDispatch();

  console.log(">>> CART STATE CartTableItem", cartState);
  console.log(">>> CART TABLE ITEM PROPS", props);

  /* CART IMAGES
  cartState.items.map((item, index) => {
    const productVariant = item.variant.replace(
      "/api/v2/shop/product-variants/",
      ""
    );

    api
      .get(`shop/product-variants/${productVariant}`)
      .then((productvariantResponse) => {
        console.log(">>> PRODUCT VARIANT response ", productvariantResponse);

        api
          .get(`shop/product-images/${productvariantResponse.data.id}`)
          .then((productImageResponse) => {
            console.log(">>> PRODUCT IMAGES RESPONSE ", productImageResponse);
          })
          .catch((error) => {
            console.log(">>> PRODUCT IMAGES ERROR ", error);
          });
      })

      .catch((error) => {
        console.log(">>> PRODUCT VARIANT ERROR ", error);
      });
  });
  */

  const onQuantitiyChange = (event) => {
    console.log(">>> ON QUANTITY CHANGE ", event.target.value);

    const patchData = {
      quantity: parseInt(event.target.value),
    };

    const patchApi = api.create({
      // .create diyerek yeni bir axios instance olusturduk. Api nin icinde yapmadik burada yeni olusturduk cunku digerlerini etkilemesin istedik
      // we are creating new axios object. Because api waiting reguest different. New patchApi content-type / accept / authorization we set them all
      baseURL: api.defaults.baseURL,
      headers: {
        "content-type": "application/merge-patch+json", // api dokumanindan gorduk bu sekilde degistirdik
        accept: "application/json", // api basarioli reguest sonucu bu bicimde bize donuyor bunda prb yok zaten onun icin http headrs da ki gibi yazdik
        authorization: api.defaults.headers.common["Authorization"], // bu zaten bizim api deki ni ladik kopyaladik
      },
    });

    patchApi
      .patch(`shop/orders/${cartState.tokenValue}/items/${props.id}`, patchData)
      .then((response) => {
        console.log(">>> ON Quantitiy Change Response", response);

        dispatch(updateFullCart(response.data));
      })
      .catch((error) => {
        console.log(">>> ON Quantitiy Change ERROR", error);
      });
  };

  const onDeleteButtonClick = (event) => {
    api
      .delete(`shop/orders/${cartState.tokenValue}/items/${props.id}`)
      .then((response) => {
        console.log(">>> Delete Button Click Response", response);

        api.get(`shop/orders/${cartState.tokenValue}`).then((response) => {
          console.log(">>> ", response);
          dispatch(updateFullCart(response.data));
          // urun silme basarili olursa then icine girer ve response da sepet bilgisi yoktur sadece delete islemi yapilmis tir.
          // Bu nedenle tekrar apiden sepet bilgisi tekrar cekilir (App.js de else if sonrasi gibi)
        });
      })
      .catch((error) => {
        console.log(">>> Delete Button Click Error", error);
      });
  };

  return (
    <tr>
      <td>
        <a href="#">
          <img src="/images/cart_product_1.png" alt="" />
        </a>
        <span>
          <a href="#">{props.productName}</a>
        </span>
      </td>
      <td>
        {props.unitPrice}
        &nbsp;
        {cartState.currencyCode}
      </td>
      <td>
        <div className="product-quantity">
          <div className="quantity">
            <input
              type="number"
              className="input-text qty text"
              step="1"
              min="1"
              max="10"
              name="quantity"
              value={props.quantity}
              title="Qty"
              size="4"
              pattern="[0-9]*"
              onChange={onQuantitiyChange}
            />
          </div>
        </div>
      </td>
      <td>
        {props.subtotal} &nbsp;
        {cartState.currencyCode}
      </td>
      <th scope="row">
        <button onClick={onDeleteButtonClick} className="btn-close btn-link">
          <i className="fa fa-times-circle-o"></i>
        </button>
      </th>
    </tr>
  );
};

export default CartTableItem;
