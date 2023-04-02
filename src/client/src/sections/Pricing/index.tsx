import { Box, Typography, Divider, Container, Tabs, Fade, Tab, Button, Paper } from '@mui/material';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightOutlined';
import React, { useState, forwardRef, useEffect } from 'react';
import { CheckoutForm } from '../../lib/components/CheckoutForm/CheckoutForm';
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import './pricing.scss'

export const Pricing = () => {
  const [stripePromise, setStripePromise] = useState<any | null>(null);
  const [clientSecret, setClientSecret] = useState<string | undefined>("")

  useEffect(() => {
    fetch('/config').then(async (r) => {
      const { publishableKey } = await r.json();

      setStripePromise(loadStripe(publishableKey));
    })
  }, [])

  useEffect(() => {
    fetch('/create-payment-intent', {
      method: "POST",
      body: JSON.stringify({}),
    }).then(async (r) => {
      const { clientSecret } = await r.json();

      setClientSecret(clientSecret);
    })
  }, [])

  return (
    <Box sx={{ marginTop: 10 }}>
      <h2>Payment Page</h2>
      <h3>Plato's Peach Socrates Solo Plan = $3.99/month</h3>
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </Box>
  )
}















// type Props = {
//   sessionId: any;
// }

// export const Pricing = () => (
//   <section style={{ marginTop: "70px" }}>
//     <div className="product">
//       <div className="description">
//         <h3>Individual Plan</h3>
//         <h5>$3.99 / month</h5>
//       </div>
//     </div>
//     <form action="/create-checkout-session" method="POST">
//       {/* Add a hidden field with the lookup_key of your Price */}
//       <input type="hidden" name="lookup_key" value="0111" />
//       <button id="checkout-and-portal-button" type="submit">
//         Checkout
//       </button>
//     </form>
//   </section>
// );

// const SuccessDisplay = ({ sessionId }: Props) => {
//   return (
//     <section>
//       <div className="product Box-root">
//         <div className="description Box-root">
//           <h3>Subscription to our individual plan successful!</h3>
//         </div>
//       </div>
//       <form action="/create-portal-session" method="POST">
//         <input
//           type="hidden"
//           id="session-id"
//           name="session_id"
//           value={sessionId}
//         />
//         <button id="checkout-and-portal-button" type="submit">
//           Manage your billing information
//         </button>
//       </form>
//     </section>
//   );
// };

// const Message = ({ message }: any) => (
//   <section>
//     <p>{message}</p>
//   </section>
// );

// export default function Success() {
//   let [message, setMessage] = useState('');
//   let [success, setSuccess] = useState(false);
//   let [sessionId, setSessionId] = useState('');

//   useEffect(() => {
//     // Check to see if this is a redirect back from Checkout
//     const query = new URLSearchParams(window.location.search);

//     if (query.get('success')) {
//       setSuccess(true);
//       console.log("Query Get: ", query.get('session_id'))
//       // setSessionId(query.get('session_id'));
//     }

//     if (query.get('canceled')) {
//       setSuccess(false);
//       setMessage(
//         "Order cancelled -- continue to shop around and checkout when you're ready."
//       );
//     }
//   }, [sessionId]);

//   if (!success && message === '') {
//     return <Pricing />;
//   } else if (success && sessionId !== '') {
//     return <SuccessDisplay sessionId={sessionId} />;
//   } else {
//     return <Message message={message} />;
//   }
// }

// import HeroPricing from 'docs/src/components/pricing/HeroPricing';
// import PricingTable from 'docs/src/components/pricing/PricingTable';
// import PricingList from 'docs/src/components/pricing/PricingList';
// import EarlyBird from 'docs/src/components/pricing/EarlyBird';
// import Testimonials from 'docs/src/components/home/Testimonials';
// import WhatToExpect from 'docs/src/components/pricing/WhatToExpect';
// import FAQ from 'docs/src/components/pricing/FAQ';
// import HeroEnd from 'docs/src/components/home/HeroEnd';
// const Plan = forwardRef<
//   HTMLDivElement,
//   {
//     plan: 'community' | 'pro' | 'premium';
//     benefits?: Array<string>;
//     unavailable?: boolean;
//   } & PaperProps
// >(function Plan({ plan, benefits, unavailable, sx, ...props }, ref) {
//   const globalTheme = useTheme();
//   const mode = globalTheme.palette.mode;
//   return (
//     <Paper
//       ref={ref}
//       variant="outlined"
//       sx={{ p: 2, ...(unavailable && { '& .MuiTypography-root': { opacity: 0.5 } }), ...sx }}
//       {...props}
//     >
//       <PlanName plan={plan} />
//       <Box {...(plan === 'community' && { my: 2 })} {...(plan === 'premium' && { mb: 2 })}>
//         <PlanPrice plan={plan} />
//       </Box>
//       {unavailable ? (
//         <Button
//           variant="outlined"
//           disabled
//           fullWidth
//           sx={{ py: 1, '&.Mui-disabled': { color: 'text.disabled' } }}
//         >
//           In progress!
//         </Button>
//       ) : (
//         <Button
//           variant={plan.match(/(pro|premium)/) ? 'contained' : 'outlined'}
//           fullWidth
//           component={Link}
//           noLinkStyle
//           href={
//             {
//               community: '/material-ui/getting-started/usage/',
//               pro: 'https://mui.com/store/items/mui-x-pro/',
//               premium: 'https://mui.com/store/items/mui-x-premium/',
//             }[plan]
//           }
//           endIcon={<KeyboardArrowRightRounded />}
//           sx={{ py: 1 }}
//         >
//           {plan.match(/(pro|premium)/) ? 'Buy now' : 'Get started'}
//         </Button>
//       )}
//       {benefits &&
//         benefits.map((text) => (
//           <Box key={text} sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
//             <img src={`/static/branding/pricing/yes-${mode}.svg`} alt="" />
//             <Typography
//               variant="body2"
//               color="text.secondary"
//               fontWeight="extraBold"
//               sx={{ ml: 1 }}
//             >
//               {text}
//             </Typography>
//           </Box>
//         ))}
//     </Paper>
//   );
// });

// export const Pricing = () => {
//   const [planIndex, setPlanIndex] = useState(0);
//   return (
//     <Box sx={{ mt: 10 }}>
//       <Container>
//         <Box
//           sx={{
//             height: '32vh',
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}
//         >
//           <Typography
//             variant="inherit"
//             className='pricing--font'
//           >
//             Pricing
//           </Typography>
//           <Typography variant="h2" sx={{ my: 1 }}>
//             Start using Plato's Peach for free!
//           </Typography>
//           <Typography color="text.secondary" textAlign="center" sx={{ maxWidth: 500 }}>
//             Switch to a commercial plan to access advanced features & technical support.
//           </Typography>
//         </Box>
//         <Divider />
//       </Container>
//       <Container sx={{ pb: 2, mt: '-1px', display: { xs: 'block', md: 'none' } }}>
//       <Tabs
//         value={planIndex}
//         variant="fullWidth"
//         onChange={(event, value) => setPlanIndex(value)}
//         sx={[
//           {
//             mb: 2,
//             position: 'sticky',
//             top: 55,
//             bgcolor: 'background.paper',
//             zIndex: 1,
//             mx: { xs: -2, sm: -3 },
//             borderTop: '1px solid',
//             borderColor: 'divider',
//             '& .MuiTab-root': {
//               borderBottom: '1px solid',
//               borderColor: 'divider',
//               '&.Mui-selected': {
//                 bgcolor: 'grey.50',
//               },
//             },
//           },
//         ]}
//       >
//         <Tab label="Community" />
//         <Tab
//           label="Pro"
//           sx={{ borderWidth: '0 1px 0 1px', borderStyle: 'solid', borderColor: 'divider' }}
//         />
//         <Tab label="Premium" />
//       </Tabs>
//       {planIndex === 0 && (
//         <Fade in>
//           <div>
//             <Plan plan="community" />
//             <PricingTable columnHeaderHidden plans={['community']} />
//           </div>
//         </Fade>
//       )}
//       {planIndex === 1 && (
//         <Fade in>
//           <div>
//             <Plan plan="pro" />
//             <PricingTable columnHeaderHidden plans={['pro']} />
//           </div>
//         </Fade>
//       )}
//       {planIndex === 2 && (
//         <Fade in>
//           <div>
//             <Plan plan="premium" />
//             <PricingTable columnHeaderHidden plans={['premium']} />
//           </div>
//         </Fade>
//       )}
//     </Container>
//     </Box >
//   )
// }