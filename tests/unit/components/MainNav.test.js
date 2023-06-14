import { render, screen } from "@testing-library/vue";
import MainNav from "@/components/MainNav.vue";

describe("MainNav", () => {
  it("displays company nam", () => {
    render(MainNav);
    const companyName = screen.getByText("Google");
    expect(companyName).toBeInTheDocument();
  });
});
