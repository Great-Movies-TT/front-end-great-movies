import { Button, ButtonProps, SxProps, Theme, useTheme } from "@mui/material";

type SubmitButtonProps = ButtonProps & {
  sx?: SxProps<Theme>;
};

const SubmitButtonModal = ({ children, sx, ...props }: SubmitButtonProps) => {
  const theme = useTheme();
  return (
    <Button
      variant="contained"
      size="medium"
      type="submit"
      sx={{
        width: "160px",
        mr: "16px",
        borderRadius: "8px",
        boxShadow: "none",
        fontSize: "16px",
        lineHeight: "24px",
        fontWeight: 600,
        padding: "10px 22px",
        textTransform: "none",
        display: "flex",
        whiteSpace: "nowrap",
        "&.Mui-disabled": {
          backgroundColor: theme.palette.action.disabled,
          color: theme.palette.common.white,
          border: `1px solid ${theme.palette.action.disabled}`,
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default SubmitButtonModal;
