import { Container, styled } from "@mui/material";

const ContainerList = styled(Container)(() => ({
  minWidth: "250px",
  minHeight: "10px",
  marginTop: "10px",
  marginBottom: "10px",
  backgroundColor: "gray",
  opacity: "0.8",
  width: "70%",
}));

function Lists() {
  return (
    <>
      <ContainerList />
    </>
  );
}

export default Lists;
