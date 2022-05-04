import React, { useState } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

interface ICustomerAdd {
  stateRefresh: () => void;
}

const CustomerAdd: React.FunctionComponent<ICustomerAdd> = props => {
  //const [file, setFile] = React.useState<File | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [job, setJob] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const handleFormSubmit = (e: React.MouseEvent<HTMLElement>, text: string) => {
    e.preventDefault();
    addCustomer().then((response) => {
      console.log(response.data);
      props.stateRefresh();
    });

    setUserName("");
    setBirthday("");
    setGender("");
    setJob("");
    setOpen(false);
  };

  //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setFile(e.target.files ? e.target.files[0] : null);
  //     setFileName(e.target.value);
  //   };

  const addCustomer = () => {
    const url = "/api/customers";
    const formData = new FormData();
    //formData.append("image", file);
    formData.append("name", userName);
    formData.append("birthday", birthday);
    formData.append("gender", gender);
    formData.append("job", job);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    return axios.post(url, formData, config);
  };

  const handleClickOpen=()=> {
    setOpen(true);
  }

  const handleClose=()=> {
    setUserName("");
    setBirthday("");
    setGender("");
    setJob("");
    setOpen(false);
  }

  return (
    <div>
    <Button variant="contained" color="primary" onClick={handleClickOpen}>
      고객 추가하기
    </Button>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>고객 추가</DialogTitle>
      <DialogContent>
        {/* <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} />
        <label htmlFor="raised-button-file">
          <Button variant="contained" color="primary" component="span" name="file">
            {this.state.fileName === ''? "프로필 이미지 선택" : fileName}
          </Button>
        </label><br/> */}
        <TextField label="이름" type="text" name="userName" value={userName} onChange={(e)=>{ 
           setUserName(e.target.value);
        }} /><br/>
        <TextField label="생년월일" type="text" name="birthday" value={birthday} onChange={(e)=>{ 
           setBirthday(e.target.value);
        }} /><br/>
        <TextField label="성별" type="text" name="gender" value={gender} onChange={(e)=>{ 
           setGender(e.target.value);
        }} /><br/>
        <TextField label="직업" type="text" name="job" value={job} onChange={(e)=>{ 
           setJob(e.target.value);
        }} /><br/>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={(e) => handleFormSubmit(e, "clicked")}>추가</Button>
        <Button variant="outlined" color="primary" onClick={handleClose}>닫기</Button>
      </DialogActions>
    </Dialog>
  </div>
  );
}

export default CustomerAdd;
