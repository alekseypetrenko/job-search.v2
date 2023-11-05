import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";
import { createPinia, setActivePinia } from "pinia";
import axios from "axios";

vi.mock("axios");

describe("state", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("stored jobs ", () => {
    const store = useJobsStore();
    expect(store.jobs).toEqual([]);
  });
});

describe("actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("FETCH_JOBS", () => {
    it("makes api request and stores recieved jobs", async () => {
      axios.get.mockResolvedValue({ data: ["job1", "job2"] });

      const store = useJobsStore();
      await store.FETCH_JOBS();

      expect(store.jobs).toEqual(["job1", "job2"]);
    });
  });
});

describe("getters", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("UNIQUE_ORGANIZATIONS", () => {
    it("finds uniq organizations from the jobs store", () => {
      const store = useJobsStore();
      store.jobs = [
        { organization: "google" },
        { organization: "google" },
        { organization: "amazon" },
      ];
      const result = store.UNIQUE_ORGANIZATIONS;

      expect(result).toEqual(new Set(["google", "amazon"]));
    });
  });

  describe("FILTERED_JOBS_BY_ORGANIZATION", () => {
    it("identified jobs that are associated with the given organizations", () => {
      const jobStore = useJobsStore();
      const userStore = useUserStore();
      jobStore.jobs = [
        { organization: "google" },
        { organization: "yahoo" },
        { organization: "amazon" },
      ];

      userStore.selectedOrganizations = ["yahoo", "google"];
      const result = jobStore.FILTERED_JOBS_BY_ORGANIZATIONS;

      expect(result).toEqual([
        { organization: "google" },
        { organization: "yahoo" },
      ]);
    });
  });
});
