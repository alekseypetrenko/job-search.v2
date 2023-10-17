import { defineStore } from "pinia";

const ADD_SELECTED_ORGANIZATIONS = "ADD_SELECTED_ORGANIZATIONS";

export const useUserStore = defineStore("user", {
  state: () => ({
    isLoggedIn: false,
    selectOrganizations: [],
  }),
  actions: {
    loginUser() {
      this.isLoggedIn = true;
    },
    [ADD_SELECTED_ORGANIZATIONS](organizations) {
      this.selectOrganizations = organizations;
    },
  },
});
