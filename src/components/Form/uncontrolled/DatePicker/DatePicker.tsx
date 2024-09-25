import { forwardRef, useState, useEffect } from "react";
import type { Ref, FocusEvent } from "react";
import type { WithSx } from "@/types";
import { InputText } from "@/components/Form/uncontrolled/InputText";
import {
  Box,
  FormHelperText,
  IconButton,
  InputAdornment,
  Theme,
  Typography,
} from "@mui/material";
import { DatePicker as CustomDatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useTheme } from "@mui/material/styles";
import { format, isValid, parse } from "date-fns";
import DatePickerCalendarIcon from "@/assets/icons/DatePickerCalendar";

interface DatePickerProps extends WithSx {
  name: string;
  label: string;
  value: Date | string | null;
  maxDate?: Date | string;
  minDate?: Date | string;
  disablePast?: boolean;
  disableFuture?: boolean;
  error?: string;
  inputRef: Ref<HTMLInputElement>;
  onChange?: (date: string | null) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      name,
      label,
      disablePast,
      disableFuture,
      minDate,
      maxDate,
      value,
      error,
      onChange,
      required,
      inputRef,
      ...rest
    },
    ref
  ) => {
    const theme = useTheme();
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [openDatePicker, setOpenDatePicker] = useState(false);

    useEffect(() => {
      if (typeof value === "string") {
        const date = parse(value, "dd/MM/yyyy", new Date());
        if (!isNaN(date.getTime())) {
          setSelectedDate(date);
        } else {
          console.error("Invalid date string format", value);
        }
      } else if (value instanceof Date) {
        setSelectedDate(value);
      } else {
        setSelectedDate(null);
      }
    }, [value]);

    const handleDateChange = (date: Date | null) => {
      if (date && isValid(date)) {
        setSelectedDate(date);
        const formattedDate = format(date, "dd MMM yyyy", {
          useAdditionalDayOfYearTokens: true,
          useAdditionalWeekYearTokens: true,
        });
        onChange?.(formattedDate);
      } else {
        setSelectedDate(null);
        onChange?.(null);
      }
      setOpenDatePicker(false);
    };

    const toggleDatePicker = () => {
      setOpenDatePicker(!openDatePicker);
    };

    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box sx={{ width: "320px", marginBottom: "0px" }}>
          <CustomDatePicker
            name={name}
            inputRef={inputRef}
            value={selectedDate}
            open={openDatePicker}
            onClose={() => setOpenDatePicker(false)}
            onChange={handleDateChange}
            dayOfWeekFormatter={(weekday: Date) => `${format(weekday, "eee")}`}
            fixedWeekNumber={6}
            minDate={minDate ? new Date(minDate) : undefined}
            maxDate={maxDate ? new Date(maxDate) : undefined}
            disablePast={disablePast}
            disableFuture={disableFuture}
            showDaysOutsideCurrentMonth
            format="dd/MM/yyyy"
            slots={{
              textField: InputText,
            }}
            slotProps={{
              textField: {
                size: "small",
                variant: "outlined",
                label: label,
                error: !!error,
                placeholder: "DD/MM/YYYY",
                helperText: "",
                required: required,
                InputProps: {
                  endAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={toggleDatePicker}
                        sx={{ width: "32px", height: "32px" }}
                      >
                        <DatePickerCalendarIcon
                          sx={{
                            width: "16px",
                            height: "16px",
                            path: {
                              stroke: error
                                ? theme.palette.error.main
                                : theme.palette.text.secondary,
                            },
                          }}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              },
              day: {
                sx: (theme: Theme) => ({
                  "&.MuiPickersDay-root:not(.Mui-selected)": {
                    fontSize: "14px",
                    fontWeight: "400",
                    lineHeight: "20px",
                  },
                  "&.MuiPickersDay-dayOutsideMonth": {
                    color: theme.palette.common.black,
                  },
                  "&.Mui-selected": {
                    backgroundColor: theme.palette.primary.main,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.dark,
                    },
                  },
                }),
              },
            }}
          />

          {error && (
            <FormHelperText>
              <Typography
                variant="subtitle2"
                sx={{
                  color: theme.palette.error.main,
                  fontWeight: theme.typography.fontWeightRegular,
                }}
              >
                {error}
              </Typography>
            </FormHelperText>
          )}
        </Box>
      </LocalizationProvider>
    );
  }
);
