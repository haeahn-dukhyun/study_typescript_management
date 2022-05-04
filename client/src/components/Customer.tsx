import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import CustomerDelete from "./CustomerDelete";

interface ICustomer {
  stateRefresh: () => void;
  id: number;
  image: string;
  name: string;
  birthday: string;
  gender: string;
  job: string;
  open: boolean;
}

class Customer extends React.Component<ICustomer> {
  render() {
    return (
      <TableRow>
        <TableCell>{this.props.id}</TableCell>
        <TableCell>
          <img src={this.props.image} alt="profile" />
        </TableCell>
        <TableCell>{this.props.name}</TableCell>
        <TableCell>{this.props.birthday}</TableCell>
        <TableCell>{this.props.gender}</TableCell>
        <TableCell>{this.props.job}</TableCell>
        <TableCell>
          <CustomerDelete
            stateRefresh={this.props.stateRefresh}
            id={this.props.id}
            open={this.props.open}
          />
        </TableCell>
      </TableRow>
    );
  }
}

export default Customer;
