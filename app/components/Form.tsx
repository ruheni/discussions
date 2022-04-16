import React, { forwardRef } from "react";
import type { FormProps as RemixFormProps } from "@remix-run/react";
import { Form as RemixForm, useActionData } from "@remix-run/react";
import type { InputProps } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";

import type { ActionData } from "~/lib/form";

interface FormFieldProps extends InputProps {
  name: string;
  label: string;
  input?: React.ReactElement;
}

//@ts-ignore
export const Form = forwardRef(function _Form(
  props: RemixFormProps,
  ref: React.RefObject<HTMLFormElement>
) {
  return (
    <RemixForm ref={ref} {...props}>
      {props.children}
    </RemixForm>
  );
});

export function FormField({ label, input, ...props }: FormFieldProps) {
  const form = useActionData<ActionData<any>>();
  const clonedInput =
    input &&
    React.cloneElement(input, {
      defaultValue: form?.data[props.name] || "",
      id: props.name,
      ...props,
    });

  return (
    <FormControl
      isRequired={props.isRequired}
      isInvalid={!!form?.fieldErrors?.[props.name]}
    >
      <FormLabel htmlFor={form?.data.id}>{label}</FormLabel>
      {clonedInput || (
        <Input
          defaultValue={form?.data?.[props.name] || ""}
          id={props.name}
          {...props}
        />
      )}
      <FormErrorMessage>
        {form?.fieldErrors?.[props.name]?.[0]}
      </FormErrorMessage>
    </FormControl>
  );
}

export function FormError() {
  const form = useActionData<ActionData<any>>();

  if (!form?.formError) return null;
  return (
    <FormControl isInvalid={!!form?.formError}>
      <FormErrorMessage>{form?.formError}</FormErrorMessage>
    </FormControl>
  );
}
