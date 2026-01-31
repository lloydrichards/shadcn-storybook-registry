import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useForm as useTanstackForm } from "@tanstack/react-form";
import type { ComponentProps } from "react";
import { action } from "storybook/actions";
import { expect, userEvent } from "storybook/test";
import * as z from "zod";

import { Button } from "@/bases/radix/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/bases/radix/components/ui/field";
import { Input } from "@/bases/radix/components/ui/input";

const formSchema = z.object({
  username: z.string().min(6, {
    message: "Username must be at least 6 characters.",
  }),
});

type ProfileFormValues = z.infer<typeof formSchema>;

function TanStackFormProfileForm(props: ComponentProps<"form">) {
  const form = useTanstackForm({
    defaultValues: {
      username: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      action("onSubmit")(value as ProfileFormValues);
    },
  });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-8"
      {...props}
    >
      <FieldGroup>
        <form.Field name="username">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor="form-tanstack-username">
                  Username
                </FieldLabel>
                <Input
                  id="form-tanstack-username"
                  name={field.name}
                  placeholder="username"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  aria-invalid={isInvalid}
                />
                <FieldDescription>
                  This is your public display name.
                </FieldDescription>
                {isInvalid && (
                  <FieldError
                    errors={field.state.meta.errors.map((error) =>
                      typeof error === "string" ? { message: error } : error,
                    )}
                  />
                )}
              </Field>
            );
          }}
        </form.Field>
      </FieldGroup>
      <Button type="submit">Submit</Button>
    </form>
  );
}

/**
 * Building forms with TanStack Form and Zod.
 */
const meta: Meta<typeof TanStackFormProfileForm> = {
  title: "ui/Form (TanStack Form)",
  component: TanStackFormProfileForm,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof TanStackFormProfileForm>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the form.
 */
export const Default: Story = {};

export const ShouldSucceedWhenValidInput: Story = {
  name: "when typing a valid username, should not show an error message",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvas, step }) => {
    await step("Type a valid username", async () => {
      await userEvent.type(
        await canvas.findByRole("textbox", { name: /username/i }),
        "mockuser",
      );
    });

    await step("Click the submit button", async () => {
      await userEvent.click(
        await canvas.findByRole("button", { name: /submit/i }),
      );
      expect(
        await canvas.queryByText(/username must be at least 6 characters/i, {
          exact: true,
        }),
      ).toBeNull();
    });
  },
};

export const ShouldShowErrorWhenInvalidInput: Story = {
  name: "when typing a short username, should show an error message",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvas, step }) => {
    await step("Type a short username", async () => {
      await userEvent.type(
        await canvas.findByRole("textbox", { name: /username/i }),
        "fail",
      );
    });

    await step("Click the submit button", async () => {
      await userEvent.click(
        await canvas.findByRole("button", { name: /submit/i }),
      );
      expect(
        await canvas.queryByText(/username must be at least 6 characters/i, {
          exact: true,
        }),
      ).toBeVisible();
    });
  },
};
