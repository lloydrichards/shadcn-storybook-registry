type RegistryPreviewItem = {
  name: string;
  categories: readonly string[];
};

const storyIds: Record<string, string> = {
  "alert-dialog-story": "alertdialog",
  "aspect-ratio-story": "aspectratio",
  "button-group-story": "buttongroup",
  "context-menu-story": "contextmenu",
  "data-table-story": "datatable",
  "date-picker-story": "datepicker",
  "dropdown-menu-story": "dropdownmenu",
  "form-react-hook-story": "form-react-hook-form",
  "form-tanstack-story": "form-tanstack-form",
  "hover-card-story": "hovercard",
  "input-group-story": "inputgroup",
  "input-otp-story": "inputotp",
  "message-scroller-story": "messagescroller",
  "navigation-menu-story": "navigationmenu",
  "radio-group-story": "radiogroup",
  "resizable-story": "resizablepanelgroup",
  "scroll-area-story": "scrollarea",
  "toggle-group-story": "togglegroup",
};

export function getRegistryPreviewPath(
  item: RegistryPreviewItem,
  registry: "base" | "radix",
): string {
  if (item.categories.includes("collection")) return "/storybook/";

  const category = item.categories.includes("design") ? "design" : "ui";
  const storyId = storyIds[item.name] ?? item.name.replace(/-story$/, "");
  return `/storybook/?path=/docs/${category}-${registry}-${storyId}--docs`;
}
