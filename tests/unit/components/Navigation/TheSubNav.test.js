import { render, screen } from "@testing-library/vue";
import TheSubNav from "@/components/Navigation/TheSubNav.vue";

describe("TheSubNav", () => {
  const renderTheSubNav = (routeName) => {
    render(TheSubNav, {
      global: {
        mocks: {
          $route: {
            name: routeName,
          },
        },
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });
  };

  describe("when the user on the jobs page", () => {
    it("displays job count", () => {
      const routeName = "JobResults";

      renderTheSubNav(routeName);

      const jobCount = screen.getByText("1653");
      expect(jobCount).toBeInTheDocument();
    });
  });

  describe("when the user is not on the jobs page", () => {
    it("does not display job count", () => {
      const routeName = "HomeView";

      renderTheSubNav(routeName);

      const jobCount = screen.queryByText("1653");
      expect(jobCount).not.toBeInTheDocument();
    });
  });
});
