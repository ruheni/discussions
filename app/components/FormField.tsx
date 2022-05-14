import { HTMLInputTypeAttribute } from "react";

type FormFieldProps = any;

const FormField = (props: FormFieldProps) => {
  return (
    <div>
      {props.type}
      <input type={props.type} />
    </div>
  );
};

export default FormField;
