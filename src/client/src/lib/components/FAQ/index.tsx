import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface QuestionAnswer {
  question: string;
  answer: string;
}

type Props = {
  questionAnswers: Array<QuestionAnswer>;
}

export const FAQ = ({ questionAnswers }: Props) => {
  return (
    <div>
      {questionAnswers.map((item, index) => (
        <Accordion sx={{ margin: "0.5em 0" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}a-content`}
            id={`panel${index}a-header`}
          >
            <Typography>{item.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {item.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}