import { useUserStore } from "@/stores/user";
import { createPinia, setActivePinia } from "pinia";

describe("state", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("keeps track if user is logged in", () => {
    const store = useUserStore();
    expect(store.isLoggedIn).toBe(false);
  });

  it("stores organizations that the user would like to filter by", () => {
    const store = useUserStore();
    expect(store.selectOrganizations).toEqual([]);
  });
});

describe("actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("loginUSer", () => {
    it("logs user in", () => {
      const store = useUserStore();
      store.loginUser();
      expect(store.isLoggedIn).toBe(true);
    });
  });

  describe("ADD_SELECTED_ORGANIZATIONS", () => {
    it("updates state with selected organizations", () => {
      const store = useUserStore();
      store.ADD_SELECTED_ORGANIZATIONS(["Org1", "Org2"]);
      expect(store.selectOrganizations).toEqual(["Org1", "Org2"]);
    });
  });
});
