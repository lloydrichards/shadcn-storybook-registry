import { zodResolver } from "@hookform/resolvers/zod";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { ComponentProps } from "react";
import { Controller, useForm } from "react-hook-form";
import { action } from "storybook/actions";
import { expect, userEvent } from "storybook/test";
import * as z from "zod";

import { Button } from "@/bases/base/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/bases/base/components/ui/field";
import { Input } from "@/bases/base/components/ui/input";

const formSchema = z.object({
  username: z.string().min(6, {
    message: "Username must be at least 6 characters.",
  }),
});

type ProfileFormValues = z.infer<typeof formSchema>;

function ReactHookFormProfileForm(props: ComponentProps<"form">) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });
  function onSubmit(values: ProfileFormValues) {
    action("onSubmit")(values);
  }
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-8"
      {...props}
    >
      <FieldGroup>
        <Controller
          control={form.control}
          name="username"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-username">Username</FieldLabel>
              <Input
                id="form-rhf-username"
                placeholder="username"
                aria-invalid={fieldState.invalid}
                {...field}
              />
              <FieldDescription>
                This is your public display name.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Button type="submit">Submit</Button>
    </form>
  );
}

/**
 * Building forms with React Hook Form and Zod.
 */
const meta: Meta<typeof ReactHookFormProfileForm> = {
  title: "ui/base/Form (React Hook Form)",
  component: ReactHookFormProfileForm,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ReactHookFormProfileForm>;

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
