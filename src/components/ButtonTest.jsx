import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";

function ButtonTest() {
  return (
    <div style={{ display: "flex", gap: "12px" }}>
      <Button
        variant="contained"
        color="error"
        startIcon={<DeleteIcon />}
      >
        Delete
      </Button>

      <Button
        variant="contained"
        color="success"
        startIcon={<SendIcon />}
      >
        Submit
      </Button>

      <Button variant="outlined" disabled>
        Disabled Button
      </Button>
    </div>
  );
}

export default ButtonTest;
