import { Box, IconButton, Modal, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { CloseIcon } from "@/assets/icons";
import theme from "@/styles/muiTheme";
import type { ServiceModalConfig } from "@/types";

interface BaseModalProps extends ServiceModalConfig {
  title?: string;
  width: string;
  children?: React.ReactNode;
}

const BaseModal = ({
  onClose,
  index = 1000,
  width,
  title,
  children,
}: BaseModalProps) => {
  return (
    <Modal
      open
      sx={{
        zIndex: index,
        backdropFilter: "blur(10px)",
        padding: "0px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(80, 95, 111, 0.50)",
          },
        },
      }}
    >
      <Paper
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          padding: "32px",
          width: "100%",
          maxWidth: width,
          borderRadius: "12px",
          backgroundColor: "rgba(80, 95, 111, 1)",
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            width: "20px",
            height: "20px",
            position: "absolute",
            top: "16px",
            right: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CloseIcon
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              svg: {
                width: "10px",
                height: "10px",
              },
            }}
          />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            backgroundColor: "rgba(80, 95, 111, 1)",
          }}
        >
          {title && (
            <Typography
              variant="h4"
              sx={{ pb: 4, color: theme.palette.common.white }}
            >
              {title}
            </Typography>
          )}
          {children}
        </Box>
      </Paper>
    </Modal>
  );
};

export default BaseModal;
