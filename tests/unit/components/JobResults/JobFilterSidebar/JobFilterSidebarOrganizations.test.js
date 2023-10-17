import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import JobFilterSidebarOrganization from "@/components/JobResults/JobFilterSidebar/JobFilterSidebarOrganizations.vue";
import { createTestingPinia } from "@pinia/testing";
import { useJobsStore } from "@/stores/jobs";

describe("JobFilterSidebarOrganization", () => {
  it("renders unique organizations from jobs", async () => {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();

    jobsStore.UNIQUE_ORGANIZATIONS = new Set(["google", "amazon", "VTI"]);

    render(JobFilterSidebarOrganization, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });

    const button = screen.getByRole("button", { name: /organization/i });
    await userEvent.click(button);
    const organizationListItems = screen.getAllByRole("listitem");
    const organizations = organizationListItems.map((node) => node.textContent);
    expect(organizations).toEqual(["google", "amazon", "VTI"]);
  });
});