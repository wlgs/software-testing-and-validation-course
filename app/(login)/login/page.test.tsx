import { act, fireEvent, render, screen } from "@testing-library/react";
import Page from "./page";
import { validateRequest } from "@/auth/validate-request";
import { redirect } from "next/navigation";

jest.mock("next/navigation");

jest.mock("./signin-action", () => ({
    login: jest.fn().mockResolvedValue({ error: "invalid" }),
}));

jest.mock("@/auth/validate-request", () => ({
    validateRequest: jest.fn().mockResolvedValue({ user: null }),
}));

describe("Login Page unauthenticated", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeEach(async () => {
        (validateRequest as jest.Mock).mockResolvedValue({ user: null });
        render(await Page());
    });

    it("renders form correctly", () => {
        expect(screen.getByTestId("signin-form")).toBeInTheDocument();
    });

    it("renders sign in text", () => {
        expect(screen.getByTestId("signin-text")).toBeInTheDocument();
    });

    it("renders login input ", () => {
        expect(screen.getByTestId("signin-form-login")).toBeInTheDocument();
    });
    it("renders password input ", () => {
        expect(screen.getByTestId("signin-form-password")).toBeInTheDocument();
    });
    it("renders submit button", () => {
        expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
    });
    it("calls login function on submit", async () => {
        const username = "username";
        const password = "password";
        const loginInput = screen.getByTestId("signin-form-login") as HTMLInputElement;
        const passwordInput = screen.getByTestId("signin-form-password") as HTMLInputElement;
        const submitButton = screen.getByRole("button", { name: /sign in/i });
        const form = screen.getByTestId("signin-form");

        act(() => {
            fireEvent.change(loginInput, { target: { value: username } });
            fireEvent.change(passwordInput, { target: { value: password } });
            fireEvent.click(submitButton);
        });

        expect(form).toHaveFormValues({
            login: username,
            password,
        });
    });
});

describe("Login Page authenticated", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeEach(async () => {
        (validateRequest as jest.Mock).mockResolvedValue({ user: "user", session: "ijasdfoijasdf" });
        render(await Page());
    });

    it("redirects to /list", () => {
        expect(redirect).toHaveBeenCalledWith("/list");
    });
});
