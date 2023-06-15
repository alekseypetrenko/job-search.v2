import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import MainNav from "@/components/MainNav.vue";

describe("MainNav", () => {
  const renderMainNav = () => {
    render(MainNav, {
      global: {
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });
  };

  it("displays company nam", () => {
    renderMainNav();
    const companyName = screen.getByText("Google");
    expect(companyName).toBeInTheDocument();
  });

  it("displays menu items", () => {
    renderMainNav();

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
      renderMainNav();

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
