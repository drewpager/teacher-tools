import React, { FormEvent, useState } from "react";
import { Button, TextField, Box } from "@mui/material"
import './contact.scss';
import { DisplaySuccess } from "../../lib/utils";

export const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();


    // let messageObject = {
    //   name: name,
    //   email: email,
    //   message: message,
    // }

    const mail = {
      from: name,
      to: 'drew@greadings.com',
      subject: 'User Message from Plato\'s Peach',
      html: `<p>Name: ${name}</p>
      <p>Email: ${email}</p>
      <p>Message: ${message}</p>`,
    }

    // contactEmail.sendMail(mail, (error: any) => {
    //   if (error) {
    //     throw new Error("Failed to send message")
    //   } else {
    //     return (<DisplaySuccess title="Message sent successfully!" />)
    //   }
    // })
    if (!mail) {
      setStatus("Not Sent: Contact Form Will Be Active Soon!");
    } else {
      setStatus("Not Sent: Contact Form Will Be Active Soon!");
    }

    console.log(mail);
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
          {status && <p>Message {status}!</p>}
        </Box>
      </form>
    </Box>
  );
};
