import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./header";
import ProductSearch from "./ProductSearch";

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <ProductSearch></ProductSearch>
      </>
    );
  }
}
export default App;
