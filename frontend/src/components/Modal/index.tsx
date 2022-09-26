import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Breakpoint, Typography } from "@mui/material";

export interface IModalProps {
  maxWidth: Breakpoint;
  title?: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal(props: IModalProps) {
  const { title, maxWidth, children, onClose, isOpen } = props;

  return (
    <React.Fragment>
      <Dialog maxWidth={maxWidth} open={isOpen} onClose={onClose}  >
        {title && (
          <DialogTitle>
            <Typography
              variant="h3"
              component="h3"
              sx={{
                fontWeight: 900,
                color: "inherit",
                fontFamily: "monospace",
              }}
            >
              {title}
            </Typography>
          </DialogTitle>
        )}
        <DialogContent>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "fit-content",
            }}
          >
            {children}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
