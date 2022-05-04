import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";

interface ICustomerDelete {
  stateRefresh: () => void;
  id: number;
  open: boolean;
}

const CustomerDelete: React.FunctionComponent<ICustomerDelete> = (props) => {
  const [open, setOpen] = useState<boolean>(false);
  const deleteCustomer = (id: number) => {
    const url = "/api/customers/delete/" + id;
    fetch(url, {
      method: "DELETE",
    });
    props.stateRefresh();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (
    e: React.MouseEvent<HTMLButtonElement>,
    text: string
  ) => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        삭제
      </Button>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>삭제 경고</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>선택한 고객 정보가 삭제됩니다.</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              deleteCustomer(props.id);
            }}
          >
            삭제
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={(e) => handleClose(e, "clicked")}
          >
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CustomerDelete;
