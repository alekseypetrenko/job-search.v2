import { render, screen } from "@testing-library/vue";
import JobListing from "@/components/JobResults/JobListing.vue";
import { RouterLinkStub } from "@vue/test-utils";

describe("JobResults", () => {
  it("renders job titile", () => {
    render(JobListing, {
      global: {
        stubs: {
          "router-link": RouterLinkStub,
        },
      },
      props: {
        job: {
          title: "Vue Dev",
        },
      },
    });

    expect(screen.getByText("Vue Dev")).toBeInTheDocument();
  });
});
