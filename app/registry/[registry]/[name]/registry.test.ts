import { promises as fs } from "fs";
import { NextRequest } from "next/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { generateStaticParams, GET } from "./route";

// Mock the file system module
vi.mock("fs", () => ({
  promises: {
    readFile: vi.fn(),
  },
}));

const registryMock = {
  items: [
    {
      name: "button-story",
      title: "Button Story",
      type: "registry:ui",
      meta: {
        type: "ui",
        story: "ui-button",
      },
      registryDependencies: ["button"],
      dependencies: ["lucide-react"],
      files: [
        {
          path: "registry/button.stories.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "card-story",
      title: "Card Story",
      type: "registry:ui",
      meta: {
        type: "ui",
        story: "ui-card",
      },
      registryDependencies: ["card"],
      files: [
        {
          path: "registry/card.stories.tsx",
          type: "registry:ui",
        },
      ],
    },
    {
      name: "component-no-files",
      title: "Component No Files",
      type: "registry:ui",
      meta: {
        type: "ui",
        story: "ui-nofiles",
      },
      registryDependencies: ["test"],
      files: [],
    },
  ],
};

// Mock registry imports
vi.mock("@/registry.radix.json", () => ({
  default: registryMock,
}));

vi.mock("@/registry.base.json", () => ({
  default: registryMock,
}));

// Mock path module
vi.mock("path", () => ({
  default: {
    join: vi.fn((...args) => args.join("/")),
  },
}));

describe("Registry API", () => {
  const mockedReadFile = vi.mocked(fs.readFile);

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock process.cwd() to return a consistent path
    vi.spyOn(process, "cwd").mockReturnValue("/test/project");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("should return 40X", () => {
    it("when registry is not found", async () => {
      const request = new NextRequest(
        "http://localhost:3000/registry/invalid/button-story",
      );
      const params = Promise.resolve({
        registry: "invalid",
        name: "button-story",
      });

      const response = await GET(request, { params });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data).toEqual({ error: "Registry not found" });
    });

    it("when registry is undefined", async () => {
      const request = new NextRequest(
        "http://localhost:3000/registry/undefined/button-story",
      );
      const params = Promise.resolve({
        registry: undefined as unknown as string,
        name: "button-story",
      });

      const response = await GET(request, { params });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data).toEqual({ error: "Registry not found" });
    });

    it("when component is not found", async () => {
      const request = new NextRequest(
        "http://localhost:3000/registry/radix/nonexistent",
      );
      const params = Promise.resolve({
        registry: "radix",
        name: "nonexistent",
      });

      const response = await GET(request, { params });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data).toEqual({ error: "Component not found" });
    });

    it("when component has no files", async () => {
      const request = new NextRequest(
        "http://localhost:3000/registry/radix/component-no-files",
      );
      const params = Promise.resolve({
        registry: "radix",
        name: "component-no-files",
      });

      const response = await GET(request, { params });
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data).toEqual({ error: "Component has no files" });
    });
    it("when component name is empty", async () => {
      const request = new NextRequest("http://localhost:3000/registry/radix/");
      const params = Promise.resolve({ registry: "radix", name: "" });

      const response = await GET(request, { params });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data).toEqual({ error: "Component not found" });
    });

    it("when component name is undefined", async () => {
      const request = new NextRequest(
        "http://localhost:3000/registry/radix/undefined",
      );
      const params = Promise.resolve({
        registry: "radix",
        name: undefined as unknown as string,
      });

      const response = await GET(request, { params });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data).toEqual({ error: "Component not found" });
    });
  });

  describe("should return 200", () => {
    it("when component exists and has files", async () => {
      const mockFileContent = `import { Button } from "@/bases/radix/components/ui/button";
export default { title: "Example/Button" };`;

      mockedReadFile.mockResolvedValue(mockFileContent);

      const request = new NextRequest(
        "http://localhost:3000/registry/radix/button-story",
      );
      const params = Promise.resolve({
        registry: "radix",
        name: "button-story",
      });

      const response = await GET(request, { params });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({
        name: "button-story",
        title: "Button Story",
        type: "registry:ui",
        meta: {
          type: "ui",
          story: "ui-button",
        },
        registryDependencies: ["button"],
        dependencies: ["lucide-react"],
        files: [
          {
            path: "registry/button.stories.tsx",
            type: "registry:ui",
            content: mockFileContent,
          },
        ],
      });

      expect(mockedReadFile).toHaveBeenCalledWith(
        "/test/project/registry/button.stories.tsx",
        "utf8",
      );
    });

    it("when component has single file", async () => {
      const mockFileContent = `export const Button = () => <button>Click me</button>;`;

      mockedReadFile.mockResolvedValue(mockFileContent);

      const request = new NextRequest(
        "http://localhost:3000/registry/base/button-story",
      );
      const params = Promise.resolve({
        registry: "base",
        name: "button-story",
      });

      const response = await GET(request, { params });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.files).toHaveLength(1);
      expect(data.files[0]).toEqual({
        path: "registry/button.stories.tsx",
        type: "registry:ui",
        content: mockFileContent,
      });
    });

    it("and return valid JSON response when component exists", async () => {
      const mockFileContent = `export const Button = () => <button>Test</button>;`;
      mockedReadFile.mockResolvedValue(mockFileContent);

      const request = new NextRequest(
        "http://localhost:3000/registry/radix/button-story",
      );
      const params = Promise.resolve({
        registry: "radix",
        name: "button-story",
      });

      const response = await GET(request, { params });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(response.headers.get("content-type")).toContain(
        "application/json",
      );
      expect(typeof data).toBe("object");
      expect(data.name).toBe("button-story");
    });

    it("and handle async params resolution correctly", async () => {
      const mockFileContent = `export const Alert = () => <div>Alert</div>;`;
      mockedReadFile.mockResolvedValue(mockFileContent);

      const request = new NextRequest(
        "http://localhost:3000/registry/radix/button-story",
      );

      // Test with async params resolution
      const paramsPromise = new Promise<{ registry: string; name: string }>(
        (resolve) => {
          setTimeout(
            () => resolve({ registry: "radix", name: "button-story" }),
            10,
          );
        },
      );

      const response = await GET(request, { params: paramsPromise });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.name).toBe("button-story");
    });

    it("and construct correct file paths using process.cwd()", async () => {
      const mockFileContent = `export const TestComponent = () => <div>Test</div>;`;
      mockedReadFile.mockResolvedValue(mockFileContent);

      const request = new NextRequest(
        "http://localhost:3000/registry/base/button-story",
      );
      const params = Promise.resolve({
        registry: "base",
        name: "button-story",
      });

      await GET(request, { params });

      expect(mockedReadFile).toHaveBeenCalledWith(
        "/test/project/registry/button.stories.tsx",
        "utf8",
      );
    });

    it("and preserve all component properties when returning response", async () => {
      const mockFileContent = `export const Button = () => <button>Test</button>;`;
      mockedReadFile.mockResolvedValue(mockFileContent);

      const request = new NextRequest(
        "http://localhost:3000/registry/radix/button-story",
      );
      const params = Promise.resolve({
        registry: "radix",
        name: "button-story",
      });

      const response = await GET(request, { params });
      const data = await response.json();

      expect(data).toMatchObject({
        name: "button-story",
        title: "Button Story",
        type: "registry:ui",
        meta: {
          type: "ui",
          story: "ui-button",
        },
        registryDependencies: ["button"],
        dependencies: ["lucide-react"],
      });

      expect(data.files[0]).toMatchObject({
        path: "registry/button.stories.tsx",
        type: "registry:ui",
        content: mockFileContent,
      });
    });
  });

  it("should return 500 when file reading fails", async () => {
    mockedReadFile.mockRejectedValue(new Error("File not found"));

    const request = new NextRequest(
      "http://localhost:3000/registry/radix/button-story",
    );
    const params = Promise.resolve({ registry: "radix", name: "button-story" });

    const response = await GET(request, { params });
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toEqual({ error: "Something went wrong" });
  });

  it("should generate static params for both registries", async () => {
    const params = await generateStaticParams();

    expect(params).toEqual(
      expect.arrayContaining([
        { registry: "radix", name: "button-story" },
        { registry: "base", name: "button-story" },
      ]),
    );
  });
});
