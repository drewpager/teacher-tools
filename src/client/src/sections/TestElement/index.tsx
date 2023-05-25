// import React from 'react';
// // import './pricing.css';

// // Define the pricing plan options
// const pricingPlans = [{
//   name: 'Basic', price: '$9.99/month', features: ['5 GB of storage', '10 email accounts', '24/7 support',],
// },
// {
//   name: 'Standard',
//   price: '$19.99/month',
//   features: [
//     '10 GB of storage',
//     '20 email accounts',
//     '24/7 support',
//     'Priority customer support',
//   ],
// },
// {
//   name: 'Premium',
//   price: '$49.99/month',
//   features: [
//     '50 GB of storage',
//     'Unlimited email accounts',
//     '24/7 support',
//     'Priority customer support',
//     'Dedicated account manager',
//   ],
// },
// ];

// // Define the FAQ items
// // const faqItems = [  {    question: 'What is your refund policy?',    answer: 'We offer a 30-day money-back guarantee for all our plans.',  },  {    question: 'Can I switch plans at any time?',    answer: 'Yes, you can switch plans at any time. Your new plan will take effect immediately.',  },  {    question: 'Do you offer custom plans for large organizations?',    answer: 'Yes, we offer custom plans for organizations with specific needs. Please contact us for more information.',  },];

// // Pricing component
// export const TestElement = () => {
//   return (
//     <div className="pricing">
//       <h1>Choose Your Plan</h1>
//       <div className="pricing-plans">
//         {pricingPlans.map(plan => (
//           <div className="pricing-plan" key={plan.name}>
//             <h2>{plan.name}</h2>
//             <p className="price">{plan.price}</p>
//             <ul className="features">
//               {plan.features.map(feature => (
//                 <li key={feature}>{feature}</li>
//               ))}
//             </ul>
//             <button className="btn">Sign Up</button>
//           </div>
//         ))}
//       </div>
//       <h2>Product Comparison</h2>
//       <table className="comparison">
//         <thead>
//           <tr>
//             <th></th>
//             <th>Basic</th>
//             <th>Standard</th>
//             <th>Premium</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>Price</td>
//             <td>$9.99/month</td>
//             <td>$19.99/month</td>
//             <td>$49.99/month</td>
//           </tr>
//           <tr>
//             <td>Storage</td>
//             <td>5 GB</td>
//             <td>10 GB</td>
//             <td>50 GB</td>
//           </tr>
//           <tr>
//             <td>Email Accounts</td>
//             <td>10</td>
//             <td>20</td>
//             <td>Unlimited</td>
//           </tr>
//           <tr>
//             <td>Support</td>
//             <td>24/7</td>
//             <td>24/7</td>
//             <td>24/7</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   )
// }

import React from "react";
import image from '../../lib/assets/classroom.jpg';

export const TestElement = () => {
  return (
    <div style={{ marginTop: 150 }}>
      <h1>Hi There</h1>
    </div>
  )
}