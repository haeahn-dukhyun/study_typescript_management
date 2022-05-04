import React, { useState, useEffect } from "react";
import Customer from "./components/Customer";
import "./App.css";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { createTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import CircularProgress from "@mui/material/CircularProgress";
import CustomerAdd from "./components/CustomerAdd";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      contrastText: "white",
    },
  },
  spacing: 2,
});

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginTop: customTheme.spacing(3),
    overflowX: "auto",
  },
  menu: {
    marginTop: 15,
    marginBottom: 15,
    display: "flex",
    justifyContent: "center",
  },
  paper: {
    marginLeft: 18,
    marginRight: 18,
  },
  progress: {
    margin: customTheme.spacing(3),
  },
  grow: {
    flexGrow: 1,
  },
  tableHead: {
    fontSize: "1.0rem",
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: "none",
    [customTheme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: customTheme.shape.borderRadius,
    marginLeft: 0,
    width: "100%",
    [customTheme.breakpoints.up("sm")]: {
      marginLeft: customTheme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    width: customTheme.spacing(3),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    paddingTop: customTheme.spacing(3),
    paddingRight: customTheme.spacing(3),
    paddingBottom: customTheme.spacing(3),
    paddingLeft: customTheme.spacing(10),
    width: "100%",
    [customTheme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200,
      },
    },
  },
});

type AppProps = {
  key: number;
  id: number;
  image: string;
  name: string;
  birthday: string;
  gender: string;
  job: string;
  open: boolean;
};

function App() {
  const [customers, setCustomers] = useState<AppProps[]>([]);
  const [progress, setProgress] = React.useState(0);
  const [searchKeyword, setSearchKeyword] = React.useState("");

  const stateRefresh = () => {
    setCustomers([]);
    setProgress(0);
    setSearchKeyword("");
    fetchData();
  };

  const fetchData = async () => {
    await fetch("/api/customers")
      .then((data) => data.json())
      .then((data) => setCustomers(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 800);

    fetchData();

    return () => {
      clearInterval(timer);
    };
  }, []);

  const classes = useStyles();
  const cellList = [
    "번호",
    "프로필 이미지",
    "이름",
    "생년월일",
    "성별",
    "직업",
    "설정",
  ];

  const filteredComponents = (data: AppProps[]) => {
    data = data.filter((c: AppProps) => {
      return c.name.indexOf(searchKeyword) > -1;
    });
    return data.map((c: AppProps) => {
      return (
        <Customer
          stateRefresh={stateRefresh}
          key={c.id}
          id={c.id}
          image={c.image}
          name={c.name}
          birthday={c.birthday}
          gender={c.gender}
          job={c.job}
          open={c.open}
        />
      );
    });
  };

  return (
    <div>
      {" "}
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            className={classes.title}
            variant="h6"
            color="inherit"
            noWrap
          >
            고객 관리 시스템
          </Typography>
          <div className={classes.grow} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="검색하기"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              name="searchKeyword"
              value={searchKeyword}
              onChange={(e) => {
                setSearchKeyword(e.target.value);
              }}
            />
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.menu}>
        <CustomerAdd stateRefresh={stateRefresh} />
      </div>
      <Paper className={classes.paper}>
        <Table>
          <TableHead>
            <TableRow>
              {cellList.map((c) => {
                return <TableCell className={classes.tableHead}>{c}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {customers ? (
              filteredComponents(customers)
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress
                    className={classes.progress}
                    variant="determinate"
                    value={progress}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

export default App;
