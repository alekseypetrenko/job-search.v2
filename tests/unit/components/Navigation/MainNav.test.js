import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import MainNav from "@/components/Navigation/MainNav.vue";
import { RouterLinkStub } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { useUserStore } from "@/stores/user";

describe("MainNav", () => {
  const renderMainNav = () => {
    const pinia = createTestingPinia();
    const $route = {
      name: "Home",
    };
    render(MainNav, {
      global: {
        plugins: [pinia],
        mocks: {
          $route,
        },
        stubs: {
          FontAwesomeIcon: true,
          RouterLink: RouterLinkStub,
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
      const userStore = useUserStore();

      let profileImage = screen.queryByRole("img", {
        name: /profile image/i,
      });

      expect(profileImage).not.toBeInTheDocument();

      const loginButton = screen.getByRole("button", {
        name: /Sign In/i,
      });
      userStore.isLoggedIn = true;

      await userEvent.click(loginButton);

      profileImage = screen.queryByRole("img", {
        name: /profile image/i,
      });
      expect(profileImage).toBeInTheDocument();
    });
  });
});
