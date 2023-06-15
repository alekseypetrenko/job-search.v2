import { render, screen } from "@testing-library/vue";
import MainNav from "@/components/MainNav.vue";

describe("MainNav", () => {
  it("displays company nam", () => {
    render(MainNav);
    const companyName = screen.getByText("Google");
    expect(companyName).toBeInTheDocument();
  });

  it("displays menu items", () => {
    render(MainNav);
    const navigationMenuItems = screen.getAllByRole("listitem");
    const navMenuText = navigationMenuItems.map((item) => item.textContent);
    expect(navMenuText).toEqual([
      "Teams",
      "Location",
      "Life at Google",
      "How we hire",
      "Students",
      "Jobs",
    ]);
  });
});
