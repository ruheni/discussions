import type { z } from "zod";

export type FieldErrors<T> = {
  [Property in keyof T]: string[];
};

export type ActionData<T> = {
  formError?: string;
  fieldErrors?: FieldErrors<T>;
  data?: T;
};

type ValidForm<Schema extends z.ZodType<any>> = {
  data: z.infer<Schema>;
  fieldErrors?: FieldErrors<Schema>;
};

export async function validateFormData<Schema extends z.ZodType<any>>(
  schema: Schema,
  formData: FormData
): Promise<ValidForm<Schema>> {
  const data = Object.fromEntries(formData);
  const validations = schema.safeParse(data);

  if (!validations.success) {
    const fieldErrors = validations.error.flatten().fieldErrors as {
      [Property in keyof z.infer<Schema>]: string[];
    };
    return { data, fieldErrors };
  }
  return { data: validations.data };
}
