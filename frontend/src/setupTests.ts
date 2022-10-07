import "@testing-library/jest-dom";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { doctorData } from "./confTests";

export const server = setupServer(
  rest.get("/doctors/", (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ results: [doctorData] }));
  })
);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  jest.restoreAllMocks();
});

afterAll(() => {
  server.close();
});
