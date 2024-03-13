import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import SelectInput from "../general/SelectInput.vue";

describe("SelectInput", () => {
  it("renders properly", () => {
    const wrapper = mount(SelectInput);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
