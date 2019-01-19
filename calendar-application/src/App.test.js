import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { shallow } from "enzyme";

//Enzyme.configure({ adapter: new Adapter() });

describe("<App />", () => {
  const wrapper = shallow(<App />);
  const obj = wrapper.instance();
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("Previous button click test", () => {
    const wrapper = shallow(<App />);
    const obj = wrapper.instance();
    obj.onPrevYear();
    expect(obj.state.year).toEqual(2018);
  });

  it("Next button click test", () => {
    obj.onNextYear();
    expect(obj.state.year).toEqual(2020);
  });

  it("Today button click test", () => {
    obj.goToToday();
    expect(obj.state.year).toEqual(2019);
  });
});
