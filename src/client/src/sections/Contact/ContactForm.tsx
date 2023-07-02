import React, { FormEvent, useState } from "react";
import { Button, TextField, Box } from "@mui/material"
import './contact.scss';

export const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    let messageObject = {
      name: name,
      email: email,
      message: message,
    }

    console.log(messageObject);
    // Send the form data to your server
  };

  return (
    <Box>
      <form onSubmit={onSubmit}>
        <Box className="contact--box">
          <h1>Contact Us</h1>
          <label htmlFor="name">Name</label>
          <TextField type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          <label htmlFor="email">Email</label>
          <TextField type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label htmlFor="message">Message</label>
          <TextField multiline rows={3} maxRows={25} id="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Send product feedback, feature requests, or any other correspondence for the Plato's Peach team!" />
          <Button variant="contained" className="contact--button" type="submit">Submit</Button>
        </Box>
      </form>
    </Box>
  );
};
