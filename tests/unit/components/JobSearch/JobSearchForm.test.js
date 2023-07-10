import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import JobSearchForm from "@/components/JobSearch/JobSearchForm.vue";

describe("JobSearchForm", () => {
  describe("when user submits form", () => {
    it.only("redirects to job results with search parameters", async () => {
      const push = vi.fn();
      const $router = { push };

      render(JobSearchForm, {
        global: {
          stubs: {
            FontAwesomeIcon: true,
          },
          mocks: {
            $router,
          },
        },
      });

      const roleInput = screen.getByRole("textbox", { name: /role/i });
      const locationInput = screen.getByRole("textbox", { name: /where?/i });

      await userEvent.type(roleInput, "vue dev");
      await userEvent.type(locationInput, "NY");

      const searchButton = screen.getByRole("button", { name: /search/i });
      await userEvent.click(searchButton);

      expect(push).toHaveBeenCalledWith({
        name: "JobResults",
        query: {
          role: "vue dev",
          location: "NY",
        },
      });
    });
  });
});
