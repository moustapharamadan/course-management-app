import React from "react";
import Header from "../Header";
import { mount, shallow } from "enzyme";
import { MemoryRouter } from "react-router-dom";

it("contains 3 NavLink via shallow", () => {
  const numLinks = shallow(<Header />).find("NavLink").length;
  expect(numLinks).toBe(3);
});

it("contains 3 NavLink via mount", () => {
  const numAnchors = mount(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  ).find("a").length;
  expect(numAnchors).toBe(3);
});
