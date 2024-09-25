import Box from "@mui/material/Box";
import type { WithSx } from "@/types";

type DatePickerCalendarIconProps = WithSx<{}>;

const DatePickerCalendarIcon = (props: DatePickerCalendarIconProps) => {
  return (
    <Box {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M14 6.66927H2M10.6667 1.33594V4.0026M5.33333 1.33594V4.0026M5.2 14.6693H10.8C11.9201 14.6693 12.4802 14.6693 12.908 14.4513C13.2843 14.2595 13.5903 13.9536 13.782 13.5773C14 13.1494 14 12.5894 14 11.4693V5.86927C14 4.74917 14 4.18911 13.782 3.76129C13.5903 3.38497 13.2843 3.079 12.908 2.88726C12.4802 2.66927 11.9201 2.66927 10.8 2.66927H5.2C4.0799 2.66927 3.51984 2.66927 3.09202 2.88726C2.71569 3.079 2.40973 3.38497 2.21799 3.76129C2 4.18911 2 4.74917 2 5.86927V11.4693C2 12.5894 2 13.1494 2.21799 13.5773C2.40973 13.9536 2.71569 14.2595 3.09202 14.4513C3.51984 14.6693 4.0799 14.6693 5.2 14.6693Z"
          stroke="#D0D5DD"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Box>
  );
};

export default DatePickerCalendarIcon;
