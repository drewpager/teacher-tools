import { useEffect } from 'react';
import {
  Card,
  Typography,
  Avatar,
  Box,
  Button,
  Divider,
  Chip,
  Alert,
  LinearProgress
} from '@mui/material';
import { User, useAddPaymentMutation } from '../../../../graphql/generated';
import './userProfile.scss';
import { DisplayError } from '../../../../lib/utils';
import { FeedbackModal } from '../../../Contact/FeedbackModal';
import { Helmet } from 'react-helmet';
import {
  getStatusCategory,
  getStatusMessage,
  getStatusAction,
  isSubscriptionActive,
  isSubscriptionInTrial,
  needsPaymentAction,
} from '../../../../lib/stripeStatus';

interface Props {
  user: User;
  viewerIsUser: boolean;
}

const formatStripeAmount = (amount: number | undefined | null) => {
  if (amount !== undefined && !!amount) {
    return `$${(amount / 100).toFixed(2)}`;
  }
  return "$0.00";
}

const formatStripeDate = (date: number | undefined | null) => {
  if (date !== undefined && !!date) {
    return new Date(date * 1000).toLocaleDateString();
  }
  return "N/A";
}

const getDaysUntilTrialEnd = (trialEnd: number | undefined | null): number | null => {
  if (!trialEnd) return null;
  const now = new Date().getTime() / 1000;
  const daysLeft = Math.ceil((trialEnd - now) / (24 * 60 * 60));
  return daysLeft > 0 ? daysLeft : 0;
};

const StatusChip = ({ status }: { status: string | undefined | null }) => {
  const category = getStatusCategory(status);
  const colorMap = {
    active: 'success',
    warning: 'warning',
    error: 'error',
    inactive: 'default'
  } as const;

  return (
    <Chip
      label={status || 'Unknown'}
      color={colorMap[category]}
      size="small"
      variant={category === 'active' ? 'filled' : 'outlined'}
    />
  );
};

const TrialProgressBar = ({ trialEnd }: { trialEnd: number | undefined | null }) => {
  const daysLeft = getDaysUntilTrialEnd(trialEnd);
  if (!daysLeft || daysLeft <= 0) return null;

  // Assuming a 14-day trial period
  const totalTrialDays = 14;
  const progress = ((totalTrialDays - daysLeft) / totalTrialDays) * 100;

  return (
    <Box sx={{ mt: 1 }}>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Trial ends in {daysLeft} day{daysLeft !== 1 ? 's' : ''}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={progress}
        color={daysLeft <= 3 ? 'warning' : 'primary'}
        sx={{ height: 6, borderRadius: 3 }}
      />
    </Box>
  );
};

export const ImprovedUserProfile = ({ user, viewerIsUser }: Props) => {
  const [addPayment, { data, loading, error }] = useAddPaymentMutation({
    variables: {
      id: user.id,
    }
  });

  useEffect(() => {
    addPayment({
      variables: {
        id: `${user.id}`,
      }
    });
  }, [user, addPayment]);

  if (loading) {
    console.log("loading");
  }

  if (error) {
    console.log("Error: ", error);
  }

  const stripeError = new URL(window.location.href).searchParams.get("stripe_error");
  const status = user.package?.status;
  const statusCategory = getStatusCategory(status);
  const statusMessage = getStatusMessage(status, user.package?.trialEnd);
  const statusAction = getStatusAction(status);
  const isActive = isSubscriptionActive(status);
  const isTrial = isSubscriptionInTrial(status);
  const needsAction = needsPaymentAction(status);

  const additionalDetailsSection = viewerIsUser ? (
    <>
      <Divider sx={{ margin: 1 }} />
      <Typography variant="h5" className="user--text-details">Additional Details</Typography>
      <Typography variant='body1' className="user--text-details">
        Ready to bring engaging lesson plans to the classroom? Sign up now!
      </Typography>
      <Button className='stripe--button' variant="contained" href="/donate">
        Donate Now
      </Button>
      <Typography variant='body1' className="user--text-details">
        We use <a href="https://stripe.com/en-US/connect" target="_blank" rel="noopener noreferrer">Stripe</a> to make payments seamless and secure.
      </Typography>
    </>
  ) : null;

  const subscriberSection = (
    <>
      <Divider sx={{ margin: 1 }} />
      <Typography variant="h5" className="user--text-details">Donor Details</Typography>

      {/* Status Alert */}
      {needsAction && (
        <Alert severity={statusCategory === 'warning' ? 'warning' : 'error'} sx={{ mb: 2 }}>
          {statusMessage}
        </Alert>
      )}

      {/* Amount and Cadence */}
      {isActive && (
        <Typography variant='body1' className="user--text-details">
          {formatStripeAmount(user.package?.amount)} per {user.package?.cadence}
        </Typography>
      )}

      {/* Status Display */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, my: 1 }}>
        <Typography variant='body1' className="user--text-details">
          Status:
        </Typography>
        <StatusChip status={status} />
      </Box>

      {/* Trial Progress */}
      {isTrial && <TrialProgressBar trialEnd={user.package?.trialEnd} />}

      {/* Since Date */}
      {isActive && user.package?.since && (
        <Typography variant='body1' className="user--text-details">
          Thank you for being a donor since {formatStripeDate(user.package?.since)}!
        </Typography>
      )}

      {/* Action Button */}
      <Button
        className='stripe--button'
        variant={statusAction.variant}
        color={statusAction.color}
        href={statusAction.href}
        sx={{ mt: 2 }}
      >
        {statusAction.text}
      </Button>

      {/* Additional Info for Inactive Users */}
      {!isActive && (
        <Typography variant='body2' color="text.secondary" sx={{ mt: 1 }}>
          Start donating to unlock premium features and support our mission!
        </Typography>
      )}
    </>
  );

  return (
    <>
      <Box className="user--text">
        <Helmet>
          <title>{`${user.name}'s Profile | Plato's Peach`}</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <FeedbackModal />
        <h1>User Profile</h1>
        <Card className="user-profile--card">
          <Avatar src={user.avatar} sx={{ width: 56, height: 56, marginLeft: "40%" }} />
          <Divider sx={{ margin: 1 }} />
          <Typography variant="h5" className="user--text-details">Details</Typography>
          <Typography className="user--text-details">Name: {user.name}</Typography>
          <Typography className="user--text-details">Email: {user.contact}</Typography>

          {/* Conditional Section Rendering */}
          {(user.paymentId !== "undefined") ? subscriberSection : additionalDetailsSection}

          {stripeError && <DisplayError title="Failed to connect to stripe! Please try again" />}
        </Card>
      </Box>
    </>
  );
};
