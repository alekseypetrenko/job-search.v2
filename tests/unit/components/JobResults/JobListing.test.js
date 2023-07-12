import { render, screen } from "@testing-library/vue";
import JobListing from "@/components/JobResults/JobListing.vue";
import { RouterLinkStub } from "@vue/test-utils";

describe("JobResults", () => {
  const createJobProps = (jobProps = {}) => ({
    title: "Vue",
    organization: "Valtech",
    ...jobProps,
  });
  const renderJobListing = (jobProps = {}) => {
    render(JobListing, {
      global: {
        stubs: {
          "router-link": RouterLinkStub,
        },
      },
      props: {
        job: {
          ...jobProps,
        },
      },
    });
  };

  it("renders job titile", () => {
    const jobProps = createJobProps({ title: "Vue Developer" });
    renderJobListing(jobProps);
    expect(screen.getByText("Vue Developer")).toBeInTheDocument();
  });
  it("renders job organization", () => {
    const jobProps = createJobProps({ organization: "Specsavers" });
    renderJobListing(jobProps);
    expect(screen.getByText("Specsavers")).toBeInTheDocument();
  });
});
