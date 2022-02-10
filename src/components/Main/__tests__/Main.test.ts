import "@testing-library/jest-dom";
import { render } from "@testing-library/svelte";
import Main from "../Main.svelte";

describe("Load test", () => {
    test("vCard component is loaded", () => {
        const { getByText } = render(Main);
        expect(getByText("vCard QR Code")).toBeInTheDocument();
    });
});