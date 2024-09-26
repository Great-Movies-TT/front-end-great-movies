import {
  Controller,
  Control,
  RegisterOptions,
  FieldValues,
  Path,
} from "react-hook-form";
import { Dropdown } from "@/components/Form";
import type { SxProps } from "@mui/system";

interface FormDropdownProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  rules?: RegisterOptions<TFieldValues>;
  label: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  options: string[];
  sx?: SxProps;
}

export const FormDropdown = <TFieldValues extends FieldValues>({
  name,
  control,
  rules,
  label,
  placeholder,
  required,
  options,
  sx,
}: FormDropdownProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        return (
          <Dropdown
            name={name}
            label={label}
            error={error?.message}
            placeholder={placeholder}
            onChange={onChange}
            required={required}
            value={value}
            options={options}
            sx={sx}
          />
        );
      }}
    />
  );
};
