import { render, screen } from "@testing-library/vue";
import JobListing from "@/components/JobResults/JobListing.vue";
import { RouterLinkStub } from "@vue/test-utils";

describe("JobListing", () => {
  const createJobProps = (jobProps = {}) => ({
    title: "Vue",
    organization: "Valtech",
    locations: ["Some", "Dnipro"],
    minimumQualifications: ["Bakalavr", "Some other"],
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

  it("renders job locations", () => {
    const jobProps = createJobProps({
      locations: ["Some", "Dnipro"],
    });
    renderJobListing(jobProps);
    expect(screen.getByText("Some")).toBeInTheDocument();
    expect(screen.getByText("Dnipro")).toBeInTheDocument();
  });
  it("renders job qualifications", () => {
    const jobProps = createJobProps({
      minimumQualifications: ["Bakalavr", "Some other"],
    });
    renderJobListing(jobProps);
    expect(screen.getByText("Bakalavr")).toBeInTheDocument();
    expect(screen.getByText("Some other")).toBeInTheDocument();
  });
});
