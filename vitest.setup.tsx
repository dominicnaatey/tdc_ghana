import "@testing-library/jest-dom";

// Provide a minimal router context for Next.js hooks used in components
import { vi } from "vitest";

vi.mock("next/navigation", () => {
  return {
    usePathname: () => "/",
  };
});

// Optional: mock next/link to render anchors in test
vi.mock("next/link", () => {
  return {
    default: ({ href, children, ...props }: any) => (
      <a href={href} {...props}>
        {children}
      </a>
    ),
  };
});

// Polyfill window.matchMedia for jsdom environment
if (typeof window !== "undefined" && !window.matchMedia) {
  // @ts-ignore
  window.matchMedia = (query: string) => {
    const mql: any = {
      matches: false,
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      onchange: null,
      dispatchEvent: () => false,
    };
    return mql;
  };
}