import { render } from "@react-email/render";
import { Email } from "../components/Email/slack";

interface props {
  id: string;
  email: string;
}

export const sendWelcome = ({ id, email }: props) => {
  const emailHtml = render(Email({ id: `${id}` }));

  const mail = {
    from: "drew@greadings.com",
    to: `${email}`,
    subject: "Welcome to Plato's Peach!",
    html: emailHtml,
  };

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/contact");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = function () {
    console.log(xhr.responseText);
    if (xhr.responseText === "success") {
      console.log("Email sent successfully")
    } else {
      console.log("Email failed to send")
    }
  };

  xhr.send(JSON.stringify(mail));
};
