import type { SxProps } from "@mui/system";
import { DatePicker } from "@/components/Form";
import { Controller, Control, RegisterOptions } from "react-hook-form";

interface FormDatePickerProps {
  name: string;
  control: Control<any>;
  label: string;
  maxDate?: string;
  minDate?: string;
  disablePast?: boolean;
  disableFuture?: boolean;
  required?: boolean;
  rules?: RegisterOptions;
  error?: string;
  sx?: SxProps;
}

export const FormDatePicker = ({
  name,
  control,
  label,
  disablePast,
  disableFuture,
  minDate,
  maxDate,
  required,
  error,
  rules,
  sx,
}: FormDatePickerProps) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
        <DatePicker
          name={name}
          label={label}
          minDate={minDate}
          maxDate={maxDate}
          disablePast={disablePast}
          disableFuture={disableFuture}
          value={value || null}
          onChange={(formattedDate: string | null) => {
            onChange(formattedDate);
          }}
          inputRef={ref}
          error={error?.message}
          placeholder="DD.MM.YYYY"
          required={required}
          sx={sx}
        />
      )}
    />
  );
};
