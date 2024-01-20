import { render } from "@react-email/render";
import { Email } from "../components/Email/slack";
import { useUserQuery } from "../../graphql/generated";

interface props {
  id: string;
  email: string;
}

export const sendWelcome = ({ id, email }: props) => {
  // const { data, loading, error } = useUserQuery({
  //   variables: {
  //     id: `${id}`,
  //     lessonsPage: 1,
  //     playlistsPage: 1,
  //     quizzesPage: 1,
  //     articlesPage: 1,
  //     limit: 1
  //   }
  // });

  // if (loading) {
  //   console.log("loading user email");
  // }

  // if (error) {
  //   console.log("Loading User Error: ", error);
  // }

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
