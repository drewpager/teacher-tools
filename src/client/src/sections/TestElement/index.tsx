import React from "react";
import image from '../../lib/assets/classroom.jpg';
import { ContactForm } from "../Contact/ContactForm";
import { FeedbackModal } from "../Contact/FeedbackModal";

export const TestElement = () => {
  return (
    <div style={{ marginTop: 150 }}>
      {/* <ContactForm /> */}
      <FeedbackModal />
    </div>
  )
}