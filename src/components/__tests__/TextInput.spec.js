import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import TextInput from "../general/TextInput.vue";

describe("TextInput", () => {
  it("renders properly", () => {
    const wrapper = mount(TextInput);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
