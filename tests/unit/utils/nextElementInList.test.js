import nextElementInList from "@/utils/nextElementInList";

describe("nextElementInList", () => {
  it("locates the next element in the list and return the next element in it", () => {
    const list = ["a", "b", "c", "d"];

    const value = "c";
    const result = nextElementInList(list, value);
    expect(result).toBe("d");
  });

  describe("when element is at the end of the list", () => {
    it("locates the next elemtn at start", () => {
      const list = ["a", "b", "c", "d", "e"];

      const value = "e";
      const result = nextElementInList(list, value);
      expect(result).toBe("a");
    });
  });
});
