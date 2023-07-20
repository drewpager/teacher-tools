import React from "react";
import image from '../../lib/assets/classroom.jpg';
import { ContactForm } from "../Contact/ContactForm";
import { FeedbackModal } from "../Contact/FeedbackModal";
import { Box } from "@mui/material";
import { HomeInfoSkeleton } from "../../lib/components";

export const TestElement = () => {
  return (
    <Box sx={{ marginTop: 15 }}>
      <HomeInfoSkeleton />
    </Box>
  )
}