import { styled } from "@mui/material/styles";
import { InputBase } from "@mui/material";
import { useFormik } from "formik";
import { SearchFormValues } from "../components/types";

const Search = styled("form")(({ theme }) => ({
  position: "relative",
  borderRadius: "2px",
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "178px",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 1),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  border: "2px solid black",
  borderRadius: "10px",
}));

function SearchBar() {
  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (values: SearchFormValues) => {
      console.log(values);
    },
  });
  return (
    <>
      <Search onSubmit={formik.handleSubmit}>
        <StyledInputBase
          id="query"
          name="search"
          onChange={formik.handleChange}
          value={formik.values.search}
        />
      </Search>
    </>
  );
}

export default SearchBar;
