// import stripe from "stripe";
require("dotenv").config();

const client = require("stripe")(process.env.S_SECRET_KEY);

// const client = new stripe(`${process.env.S_SECRET_KEY}`);

export const Stripe = {
  connect: async (code: string) => {
    const response = await client.oauth.token({
      grant_type: "authorization_code",
      code,
    });

    return response.stripe_user_id;
  },
};
