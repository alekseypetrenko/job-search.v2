import { useJobsStore } from "@/stores/jobs";
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
