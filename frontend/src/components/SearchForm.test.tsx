import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { backend } from "../services/backend";
import { server } from "../setupTests";
import SearchForm from "./SearchForm";
import { rest } from "msw";
import { doctorData } from "../confTests";

enum LABELS {
  CITY = "City",
  FACILITY = "Facility",
  EXPERTISE = "Field of expertise",
}

describe("Test search form component", () => {
  it("renders all 3 input fields", async () => {
    render(<SearchForm />);
    expect(await screen.findByLabelText(LABELS.CITY)).toBeInTheDocument();
    expect(await screen.findByLabelText(LABELS.FACILITY)).toBeInTheDocument();
    expect(await screen.findByLabelText(LABELS.EXPERTISE)).toBeInTheDocument();
  });

  it("is possible to perform a search", async () => {
    render(<SearchForm />);
    const getDoctors = jest.spyOn(backend, "getDoctors"),
      inputCity = await screen.findByLabelText(LABELS.CITY),
      inputFacility = await screen.findByLabelText(LABELS.FACILITY),
      inputExpertise = await screen.findByLabelText(LABELS.EXPERTISE),
      submitBtn = await screen.findByText(/search/i);

    userEvent.type(inputCity, "test city");
    userEvent.type(inputFacility, "facility");
    userEvent.type(inputExpertise, "expertise");
    await waitFor(() => {
      submitBtn.click();
    });

    await waitFor(() => expect(getDoctors).toBeCalledTimes(1));
    const searchParams = new URLSearchParams();
    searchParams.set("search", "test city,facility,expertise");
    expect(getDoctors).toBeCalledWith(searchParams);
  });

  it("doesn't show information about no results found, if no search was performed", async () => {
    render(<SearchForm />);
    expect(screen.queryByText(/no results found/i)).not.toBeInTheDocument();
  });

  it("shows information about no results found", async () => {
    server.use(
      rest.get("/doctors/", (_req, res, ctx) =>
        res.once(ctx.json({ results: [] }))
      )
    );
    render(<SearchForm />);
    const submitBtn = await screen.findByText(/search/i);

    await waitFor(() => submitBtn.click());

    await waitFor(() =>
      expect(screen.getByText(/no results found/i)).toBeInTheDocument()
    );
  });

  it("shows card with results if search was performed", async () => {
    const { id, ...expectedData } = doctorData;
    render(<SearchForm />);
    const submitBtn = await screen.findByText(/search/i);

    expect(screen.queryByText(/john doe/i)).not.toBeInTheDocument();
    await waitFor(() => submitBtn.click());

    for (const value of Object.values(expectedData))
      expect(
        await screen.findByText(value, { exact: false })
      ).toBeInTheDocument();
  });
});
