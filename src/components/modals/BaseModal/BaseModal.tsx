import { Box, IconButton, Modal, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { ServiceModalConfig } from "@/types";
import { CloseIcon } from "@/assets/icons";

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
            backgroundColor: "white",
          }}
        >
          {title && (
            <Typography variant="h4" sx={{ pb: 4 }}>
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
