import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Fade,
  IconButton,
  Typography,
  alpha,
} from "@mui/material";
import React, { forwardRef } from "react";
import { CgClose } from "react-icons/cg";

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />;
});

type modal = {
  closeDialog: any;
  children: ReactNode;
  open: boolean;
  title: string;
  size?: false | Breakpoint | undefined;
  scroll?: "body" | "paper" | undefined;
  id?: string;
  fullScreen?: boolean;
};

function Modal(props: modal) {
  // ** props
  const { closeDialog, children, open, title, size, scroll, id, fullScreen } =
    props;

  return (
    <Dialog
      fullWidth
      fullScreen={fullScreen || false}
      open={open}
      maxWidth={size || "sm"}
      scroll={scroll || "body"}
      onClose={closeDialog}
      onBackdropClick={closeDialog}
      TransitionComponent={Transition}
      id={id || "custom_modal"}
    >
      <Box className="modal__titlediv" sx={{ background: "#0066FF" }}>
        <Typography
          variant="h6"
          color="white"
          sx={{ display: "flex", alignItems: "center" }}
        >
          {title}
        </Typography>
        <IconButton size="small" onClick={closeDialog}>
          <CgClose className="text-white" />
        </IconButton>
      </Box>

      <DialogContent
        sx={{
          px: { xs: 4, sm: 6 },
          py: { xs: 3, sm: 4 },
          position: "relative",
        }}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default Modal;
