import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";

describe("CollapsibleAccordion", () => {
  const collapsibleAccordion = (config = {}) => {
    render(CollapsibleAccordion, {
      global: {
        stubs: {
          FontAwesomeIcon: true,
        },
      },
      props: {
        header: "Category",
      },
      slots: {
        default: "<h3>My nested child</h3>",
      },
      ...config,
    });
  };

  it("renders child content", async () => {
    const props = {
      header: "Category",
    };
    const slots = {
      default: "<h3>My nested child</h3>",
    };

    const config = { props, slots };

    collapsibleAccordion(config);

    expect(screen.queryByText("My nested child")).not.toBeInTheDocument();
    const button = screen.getByRole("button", { name: /Category/i });
    await userEvent.click(button);
    expect(screen.queryByText("My nested child")).toBeInTheDocument();
  });

  describe("when parent doesn't provide a content for the slot", () => {
    it("renders default content", async () => {
      const props = {
        header: "Category",
      };
      const slots = {};

      const config = { props, slots };

      collapsibleAccordion(config);

      const button = screen.getByRole("button", { name: /Category/i });
      await userEvent.click(button);
      expect(
        screen.queryByText("Whoops, somebody forget to populate me")
      ).toBeInTheDocument();
    });
  });
});
