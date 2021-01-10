import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import LanguageSelect from "../Settings/languageSelect";
import img1 from "../Images/madame_coco.jpg";
import img2 from "../Images/adidas.jpg";

import {
  Container,
  Row,
  Col,
  FormGroup,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import "./slideshow.css";

class ShoppingInformation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      slideIndex: 0,
      dropDownOpen: "",
      filter: "",
      modal: false,
      fade: false,
      data: [
        {
          id:"1",
          fname: "Adidas",
     
        },
        {
          id:"2",
          fname: "Nike",
      
        },
        {
          id:"3",
          fname: "Decathlon",
        
        },
        {
          id:"4",
          fname: "Puma",
 
        },
      ],
    };
    this.toggle = this.toggle.bind(this);
    const ratioWHArray = this.props.ratio.split(":");
    this.ratioWH = ratioWHArray[0] / ratioWHArray[1];
  }
  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
    console.log("after setState: ", this.state);
  }
  handleChange = (event) => {
    this.setState({ filter: event.target.value });
  };

  getNewSlideIndex = (step) => {
    const slideIndex = this.state.slideIndex;
    const numberSlide = this.props.input.length;

    let newSlideIndex = slideIndex + step;

    if (newSlideIndex >= numberSlide) newSlideIndex = 0;
    else if (newSlideIndex < 0) newSlideIndex = numberSlide - 1;

    return newSlideIndex;
  };

  backward = () => {
    this.setState({
      slideIndex: this.getNewSlideIndex(-1),
    });
  };

  forward = () => {
    this.setState({
      slideIndex: this.getNewSlideIndex(1),
    });
  };

  setSlideIndex = (index) => {
    this.setState({
      slideIndex: index,
    });
  };

  updateDimensions = () => {
    this.containerElm.style.height = `${
      this.containerElm.offsetWidth / this.ratioWH
    }px`;
  };

  runAutomatic = () => {
    this.setState({
      slideIndex: this.getNewSlideIndex(1),
    });
  };

  componentDidMount() {
    this.rootElm = ReactDOM.findDOMNode(this);
    this.containerElm = this.rootElm.querySelector(".container");

    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);

    if (this.props.mode === "automatic") {
      const timeout = this.props.timeout || 5000;

      this.automaticInterval = setInterval(
        () => this.runAutomatic(),
        Number.parseInt(timeout)
      );
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
    if (this.automaticInterval) clearInterval(this.automaticInterval);
  }

  render() {
    const { filter, data } = this.state;
    const lowercasedFilter = filter.toLowerCase();
    const filteredData = data.filter((item) => {
      return Object.keys(item).some((key) =>
        item[key].toLowerCase().includes(lowercasedFilter)
      );
    });

    return (
      <Container>
        <Row>
          <Col xs="12">
            <Row>
              <Col xs="11">
                <FormGroup>
                  <Input
                    className="mt-5"
                    type="select"
                    value={filter}
                    onChange={this.handleChange}
                  >
                    {data.map((item) => (
                      <option key={item.email}>{item.fname}</option>
                    ))}
                  </Input>

                  {filter == ""
                    ? ""
                    : filteredData.map((item) => (
                        <div key={item.email}>
                          <div>
                            {item.fname} 
                        
                          </div>
                        </div>
                      ))}
                </FormGroup>
              </Col>
              <Col xs="1">
                <LanguageSelect />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xs="6">
            <div>
              <Button color="danger" onClick={this.toggle}>
                {this.props.t("campaigns_and_announcements")}
              </Button>
              <Modal
                isOpen={this.state.modal}
                fade={this.state.fade}
                toggle={this.toggle}
              >
                <ModalHeader cssModule={{'modal-title': 'w-100 text-center'}} toggle={this.toggle}>{this.props.t("campaigns_and_announcements")}</ModalHeader>
                <ModalBody>
                  <Row>
                    <Col xs="5">Madame Coco Yeni Yıl Fırsatı %50 Kampanya</Col>
                    <Col xs="7"> <img
                        className="image"
                        width="100%"
                        src={img1}
                      
                      /></Col>
                  </Row>
                  <hr/>
                  <Row>
                    <Col xs="5">Adidas'tan Öğretmenler gününe özel Fırsatlar</Col>
                    <Col xs="7"> <img
                        className="image"
                        width="100%"
                        src={img2}
                      
                      /></Col>
                  </Row>
                </ModalBody>
               
              </Modal>
            </div>
          </Col>
          <Col xs="6">
            <div className="lp-slideshow">
              <div className="container">
                {this.props.input.map((image, index) => {
                  return (
                    <div
                      key={index}
                      className={`slide ${
                        this.state.slideIndex === index ? "active" : ""
                      }`}
                    >
                      <div className="number-text">
                        {`${index + 1} / ${this.props.input.length}`}
                      </div>
                      <img
                        className="image"
                        width="200px"
                        src={image.src}
                        alt={image.caption}
                      />
                      <div className="caption-text">{this.props.t(image.caption)}</div>
                    </div>
                  );
                })}
              </div>

              <div className="dot-container">
                {this.props.input.map((_, index) => {
                  return (
                    <span
                      key={index}
                      className={`dot ${
                        this.state.slideIndex === index ? "active" : ""
                      }`}
                      onClick={() => this.setSlideIndex(index)}
                    />
                  );
                })}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default ShoppingInformation;
