import React, { FormEvent, useState } from "react";
import { Button, TextField, Box } from "@mui/material"
import './contact.scss';

export const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    const mail = {
      from: email,
      to: 'drew@greadings.com',
      subject: 'User Message from Plato\'s Peach',
      html: `<p>Name: ${name}</p>
      <p>Email: ${email}</p>
      <p>Message: ${message}</p>`,
    }

    let xhr = new XMLHttpRequest();
    xhr.open('POST', "/contact");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
      console.log(xhr.responseText)
      if (xhr.responseText == 'success') {
        setStatus("Sent");
      } else {
        setStatus("Not Sent, try again or send an email drew@greadings.com");
      }
    }

    xhr.send(JSON.stringify(mail))
  };

  return (
    <Box>
      <form onSubmit={onSubmit}>
        <Box className="contact--box">
          <h1>Contact Us</h1>
          <label htmlFor="name">Name</label>
          <TextField type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          <label htmlFor="email">Email</label>
          <TextField type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <label htmlFor="message">Message</label>
          <TextField multiline maxRows={25} id="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Send product feedback, feature requests, or any other correspondence for the Plato's Peach team!" required />
          <Button variant="contained" className="contact--button" type="submit">Submit</Button>
          {status && <p>Message {status}!</p>}
        </Box>
      </form>
    </Box>
  );
};
