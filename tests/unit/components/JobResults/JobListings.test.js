import { render, screen } from "@testing-library/vue";
import JobListings from "@/components/JobResults/JobListings.vue";
import { RouterLinkStub } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { useJobsStore } from "@/stores/jobs";

describe("JobListings", () => {
  const createRoute = (queryParams) => ({
    query: {
      page: "5",
      ...queryParams,
    },
  });

  const renderJobListings = ($route) => {
    const pinia = createTestingPinia();

    render(JobListings, {
      global: {
        plugins: [pinia],
        stubs: {
          "router-link": RouterLinkStub,
        },
        mocks: {
          $route,
        },
      },
    });
  };

  it("fetches jobs", () => {
    const $route = createRoute();
    renderJobListings($route);
    const jobStore = useJobsStore();
    expect(jobStore.FETCH_JOBS).toHaveBeenCalled();
  });

  it("it displayes max of 10 jobs", async () => {
    const $route = createRoute({ page: "1" });
    renderJobListings($route);
    const jobStore = useJobsStore();
    jobStore.jobs = Array(15).fill({});

    const jobListings = await screen.findAllByRole("listitem");
    expect(jobListings).toHaveLength(10);
  });
  describe("when params exclude page number", () => {
    it("displays page number 1", () => {
      const $route = createRoute({ page: undefined });
      renderJobListings($route);
      expect(screen.getByText("Page 1")).toBeInTheDocument();
    });
  });

  describe("when params include page number", () => {
    it("displays page number", () => {
      const $route = createRoute({ page: 5 });
      renderJobListings($route);
      expect(screen.getByText("Page 5")).toBeInTheDocument();
    });
  });

  describe("when user is on the first page", () => {
    it("it does not show link to the previous page", async () => {
      const $route = createRoute({ page: "1" });
      renderJobListings($route);

      const jobStore = useJobsStore();
      jobStore.jobs = Array(15).fill({});
      await screen.findAllByRole("listitem");

      const previousLink = screen.queryByRole("link", { name: /previous/i });
      expect(previousLink).not.toBeInTheDocument();
    });

    it("it shows link to the next page", async () => {
      const $route = createRoute({ page: "1" });
      renderJobListings($route);
      const jobStore = useJobsStore();
      jobStore.jobs = Array(15).fill({});
      await screen.findAllByRole("listitem");
      const nextLink = screen.queryByRole("link", { name: /next/i });
      expect(nextLink).toBeInTheDocument();
    });
  });

  describe("when user is on the last page", () => {
    it("it does not show link to the next page", async () => {
      const $route = createRoute({ page: "2" });
      renderJobListings($route);
      const jobStore = useJobsStore();
      jobStore.jobs = Array(15).fill({});
      await screen.findAllByRole("listitem");
      const nextLink = screen.queryByRole("link", { name: /next/i });
      expect(nextLink).not.toBeInTheDocument();
    });

    it("shows link to the previous page", async () => {
      const $route = createRoute({ page: "2" });

      renderJobListings($route);
      const jobStore = useJobsStore();
      jobStore.jobs = Array(15).fill({});

      await screen.findAllByRole("listitem");
      const previousLink = screen.queryByRole("link", { name: /previous/i });
      expect(previousLink).toBeInTheDocument();
    });
  });
});
