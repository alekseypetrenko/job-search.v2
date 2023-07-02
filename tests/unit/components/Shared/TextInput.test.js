import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import TextInput from "@/components/Shared/TextInput.vue";

describe("TextInput.vue", () => {
  it("emmits text input", async () => {
    const { emitted } = render(TextInput, {
      props: {
        modelValue: "",
      },
    });

    const input = screen.getByRole("textbox");
    await userEvent.type(input, "R");
    await userEvent.type(input, "A");
    await userEvent.type(input, "V");
    const messages = emitted()["update:modelValue"];
    expect(messages).toEqual([["R"], ["RA"], ["RAV"]]);
  });
});
