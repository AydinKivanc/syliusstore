import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "../../components/breadcrumb";
import SideBarSearch from "../../components/side-bar-search";
import useApi from "../../hooks/useApi";
import ProductList from "./components/product-list";

const Category = (props) => {
  const params = useParams();
  const api = useApi();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const urlQueryData = {};
    urlQueryData["productTaxons.taxon.code"] = params.taxon_code; // api den geliyorlar  GET  /api/v2/shop/products  Retrieves the collection of Product resources.
    urlQueryData["order[code]"] = "asc";
    urlQueryData["order[createdAt]"] = "asc";
    // urlQueryData.productTaxon.taxon.code='asc' BU IFADE ICI ICE PROPERTLERI OLAN OBJELER IFADESI VE BIZ BU SEKILDE APININ ISTEDIGI GIBI YAZARSAK JS HATA ALIRIZ.
    // ARADAKI NOKTA JS DE KI ANLAMI ICERIDEKI OBJE YE ULASIMI IFADE EDER. Biz bunu string ifade olarak yazmak istersek ['']icinde yazariz.
    // urlQueryData['productTaxon.taxon.code']='asc'
    // urlQueryData[0]=1  JS de objenin propertylerine erisimde gormustuk. Ozel karakter oldugunda striung gibi gorunmesi icin boule erisiriz.
    console.log(">> URL QUERY DATA", urlQueryData); //YAZDIRDIGIMIZDA productTaxon.taxon.code BIR PROPERTY NAME GIBI GELIR.

    api
      .get("shop/products", { params: urlQueryData }) // url query denir buna {params: urlQeryData} Bu sekilde apiden gelen ? sonrasi olusan uzun yazinin axios tarafindan otomatik olusturulmasi saglanir
      .then((response) => {
        console.log(">>PRODUCT RESP", response);
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(">>PRODUCT ERR", error);
      });
  }, []);

  const breadcrumb = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Category",
      href: "/category",
    },
    {
      title: params.taxon_code,
      href: "/category/" + params.taxon_code,
    },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumb} />
      <div class="content">
        <div class="container">
          <div class="row">
            <SideBarSearch />
            <ProductList products={products} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
