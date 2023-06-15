import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
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

  describe("when the user logs in", () => {
    it("displays user profile picture", async () => {
      render(MainNav);
      let profileImage = screen.queryByRole("img", {
        name: /profile image/i,
      });

      expect(profileImage).not.toBeInTheDocument();

      const loginButton = screen.getByRole("button", {
        name: /Sign In/i,
      });

      await userEvent.click(loginButton);
      profileImage = screen.queryByRole("img", {
        name: /profile image/i,
      });
      expect(profileImage).toBeInTheDocument();
    });
  });
});
