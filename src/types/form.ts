import {
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

export type RegisterType<FormValues extends FieldValues> = {
  register: UseFormRegister<FormValues>;
  registerName: Path<FormValues>;
  registerRules?: RegisterOptions;
  errors?: FieldError;
};
