import React, { FormEvent, useState } from "react";
import { Button, TextField, Box, Grid } from "@mui/material"
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
        <Grid container>
          <Grid item xs={12} md={4} lg={4} xl={4}>
            <Box className="contact--copy">
              <h1>Contact Plato's Peach</h1>
              <p>Plato's Peach is a platform for learning, sharing, and growing. We are always looking for ways to improve and would love to hear from you!</p>
              <p>For any questions, comments, or concerns, please feel free to reach out to us using this form</p>
            </Box>
          </Grid>
          <Grid item xs={12} md={8} lg={8} xl={8}>
            <Box className="contact--box">
              {/* <h1>Contact Us</h1> */}
              <label htmlFor="name">Name</label>
              <TextField type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              <label htmlFor="email">Email</label>
              <TextField type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <label htmlFor="message">Message</label>
              <TextField multiline maxRows={25} rows={4} id="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Send product feedback, feature requests, or any other correspondence for the Plato's Peach team!" required />
              <Button variant="contained" className="contact--button" type="submit">Submit</Button>
              {status && <p>Message {status}!</p>}
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};
