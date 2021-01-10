import React, {Component} from "react";
import { useTranslation, withTranslation } from "react-i18next";
import ShoppingMall from "./Page/ShoppingInformation"
import './App.css';

import img1 from "./Images/img_floor1_en.png";
import img2 from "./Images/img_floor2_en.png";
import img3 from "./Images/img_floor3_en.png";
import img4 from "./Images/img_floor4_en.png";

const data = [
  { src: img1, caption: "Floor One" },
  { src: img2, caption: "Floor Two" },
  { src: img3, caption: "Floor Three" },
  { src: img4, caption: "Floor Four" },
];

class App extends Component {
  render() {
    const { t, i18n } = this.props
    return (
      <div className="App">
        <ShoppingMall t={t} input={data} ratio={`3:2`} mode={`manual`} />



    
      </div>
    );
  }
}
export default withTranslation()(App);