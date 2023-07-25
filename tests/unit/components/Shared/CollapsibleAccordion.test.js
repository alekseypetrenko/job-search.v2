import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";

describe("CollapsibleAccordion", () => {
  it("renders child content", async () => {
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
    });

    expect(screen.queryByText("My nested child")).not.toBeInTheDocument();

    const button = screen.getByRole("button", { name: /Category/i });
    await userEvent.click(button);
    expect(screen.queryByText("My nested child")).toBeInTheDocument();
  });

  describe("when parent doesn't provide a content for the slot", () => {
    it("renders default content", async () => {
      render(CollapsibleAccordion, {
        global: {
          stubs: {
            FontAwesomeIcon: true,
          },
        },
        props: {
          header: "Category",
        },
      });

      const button = screen.getByRole("button", { name: /Category/i });
      await userEvent.click(button);
      expect(
        screen.queryByText("Whoops, somebody forget to populate me")
      ).toBeInTheDocument();
    });
  });
});
