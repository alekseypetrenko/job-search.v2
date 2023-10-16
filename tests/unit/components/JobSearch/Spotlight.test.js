import { render, screen } from "@testing-library/vue";
import axios from "axios";
import Spotlight from "@/components/JobSearch/Spotlight.vue";
import { vi } from "vitest";

vi.mock("axios");

describe("Spotlight", () => {
  const mockResponse = (spotlight = {}) => {
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          img: "Some image",
          title: "Some title",
          description: "Some description",
          ...spotlight,
        },
      ],
    });
  };

  it("provides image to parent component", async () => {
    const spotlightObj = { img: "First image" };
    mockResponse(spotlightObj);
    render(Spotlight, {
      slots: {
        default: `<template v-slot:default="slotProps">
        <h1>{{slotProps.img}}</h1>
        </template>
        `,
      },
    });

    const img = await screen.findByText(spotlightObj.img);
    expect(img).toBeInTheDocument();
  });

  it("provides title to parent component", async () => {
    const spotlightObj = { title: "My Title" };
    mockResponse(spotlightObj);
    render(Spotlight, {
      slots: {
        default: `<template v-slot:default="slotProps">
        <h1>{{slotProps.title}}</h1>
        </template>
        `,
      },
    });

    const title = await screen.findByText(spotlightObj.title);
    expect(title).toBeInTheDocument();
  });

  it("provides description to parent component", async () => {
    const spotlightObj = { description: "Desc" };
    mockResponse(spotlightObj);

    render(Spotlight, {
      slots: {
        default: `<template v-slot:default="slotProps">
        <h1>{{slotProps.description}}</h1>
        </template>
        `,
      },
    });

    const description = await screen.findByText(spotlightObj.description);
    expect(description).toBeInTheDocument();
  });
});
