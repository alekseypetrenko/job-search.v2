import { render, screen } from "@testing-library/vue";
import HeaderContainer from "@/components/Shared/HeaderContainer.vue";

describe("HeaderContainer", () => {
  const headerContainer = (config = {}) => {
    render(HeaderContainer, {
      slots: {
        default: "<p>Hi there</p>",
      },
      ...config,
    });
  };

  it("allows parent component to provide default content", () => {
    headerContainer();
    expect(screen.queryByText("Hi there")).toBeInTheDocument();
  });
  it("allows parent component to provide subtitle content", () => {
    const slots = {
      subtitle: "<p>I am subtitle</p>",
    };
    headerContainer({ slots });
    expect(screen.queryByText("I am subtitle")).toBeInTheDocument();
  });
});
