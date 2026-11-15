import { zodResolver } from "@hookform/resolvers/zod";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Controller, useForm } from "react-hook-form";
import { action } from "storybook/actions";
import { expect, fn, userEvent, waitFor } from "storybook/test";
import * as z from "zod";

import { Button } from "@/bases/aria/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/bases/aria/components/ui/field";
import { Input } from "@/bases/aria/components/ui/input";

const formSchema = z.object({
  username: z.string().min(6, {
    message: "Username must be at least 6 characters.",
  }),
});

type ProfileFormValues = z.infer<typeof formSchema>;

function ReactHookFormProfileForm({
  onSave,
}: {
  onSave: (values: ProfileFormValues) => void;
}) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });
  return (
    <form
      onSubmit={form.handleSubmit((values) => onSave(values))}
      className="space-y-8"
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
const meta = {
  id: "ui-aria-form-react-hook-form",
  title: "ui/Form (React Hook Form)",
  component: ReactHookFormProfileForm,
  tags: ["autodocs"],
  args: { onSave: fn(action("onSubmit")) },
} satisfies Meta<typeof ReactHookFormProfileForm>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the form.
 */
export const Default: Story = {};

export const ShouldSucceedWhenValidInput: Story = {
  name: "Submit the validated username",
  tags: ["!dev", "!autodocs"],
  play: async ({ args, canvas, step }) => {
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
      await waitFor(() =>
        expect(args.onSave).toHaveBeenCalledWith({ username: "mockuser" }),
      );
    });
  },
};

export const ShouldShowErrorWhenInvalidInput: Story = {
  name: "when typing a short username, should show an error message",
  tags: ["!dev", "!autodocs"],
  play: async ({ args, canvas, step }) => {
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
        await canvas.findByText(/username must be at least 6 characters/i, {
          exact: true,
        }),
      ).toBeVisible();
      expect(args.onSave).not.toHaveBeenCalled();
    });
  },
};
