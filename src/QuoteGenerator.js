// src/QuoteGenerator.js
import React, { useState } from "react";
import axios from "axios";
import { Button, Container, Typography, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
  },
  paper: {
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#fff",
    maxWidth: "600px",
    margin: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: "20px",
  },
  quote: {
    fontStyle: "italic",
    fontSize: "1.5em",
  },
  author: {
    fontWeight: "bold",
    marginTop: "10px",
  },
});

const QuoteGenerator = () => {
  const classes = useStyles();
  const [quote, setQuote] = useState(
    "Click the button to generate a random quote."
  );
  const [author, setAuthor] = useState("");

  const generateRandomQuote = async () => {
    try {
      const response = await axios.get("https://api.quotable.io/random");
      setQuote(response.data.content);
      setAuthor(response.data.author);
    } catch (error) {
      console.error("Error fetching the quote", error);
      setQuote("Oops! Something went wrong.");
      setAuthor("");
    }
  };

  return (
    <Container className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h4" gutterBottom>
          Random Quote Generator
        </Typography>
        <Typography className={classes.quote}>{quote}</Typography>
        {author && (
          <Typography className={classes.author}>- {author}</Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={generateRandomQuote}
        >
          Generate Quote
        </Button>
      </Paper>
    </Container>
  );
};

export default QuoteGenerator;
