import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./pages/home";
import Category from "./pages/category";
import Login from "./pages/login";
import Register from "./pages/register";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "./redux/categorySlice";
import { setTokenValue, updateFullCart } from "./redux/cartSlice";

import useApi from "./hooks/useApi";

function App() {
  const categoryState = useSelector((state) => state.categoryState);
  const api = useApi();
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cartState);
  console.log(">>> CATEGORY STATE", categoryState);

  if (!cartState.tokenValue) {
    // !cartState.tokenValue is null we are creating new cart. ELSE there is cart tokenValue and we are getting this cart details
    const postData = { localeCode: "en_US" };
    api
      .post("shop/orders", postData)
      .then((response) => {
        console.log(">>> RESPONSE ORDERS CART", response);

        dispatch(
          setTokenValue({
            tokenValue: response.data.tokenValue,
          })
        );
        /*
            dispatch(setTokenValue(response.data.tokenValue))  // bu sekilde dispatch yaparsak SLICE da da 
            state.tokenValue = action.payload direkt payload dan aliriz.
            fakat payload sonuna obje ekleyip almak anlasilir olmasi acisindan onemli
        */
      })
      .catch((err) => {
        console.log(">>> ERROR ORDERS CART", err);
      });
  } else if (!cartState.id) {
    api.get(`shop/orders/${cartState.tokenValue}`).then((response) => {
      console.log(">>> ", response);
      dispatch(updateFullCart(response.data)); // direkt payload a gonderdik obje olusturmadik cunku bu sekilde bekleniyor slice dan
    });
  }

  if (categoryState.categories === null) {
    // TODO kategoriler yuklenmedigi icin apiden al
    api
      .get("shop/taxons")
      .then((response) => {
        console.log(">>> RESPONSE CATEGOIES", response);
        dispatch(
          setCategories({
            categories: response.data,
          })
        );
      })
      .catch((err) => {
        console.log(">>> ERROR CATEGOIES", err);
      });
  }

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="category/:taxon_code" element={<Category />} />
          <Route path="auth/login" element={<Login />} />
          <Route path="auth/register" element={<Register />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
