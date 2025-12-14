import Card from "../libs/Card";
import Typography from "../libs/Typography";

const AccountInformationCard = ({ user, payment }) => {
  return (
    <Card className="!space-y-4">
      <Typography variant="h4">Account information</Typography>

      <div>
        <Typography variant="body1">Account holder</Typography>
        <Typography variant="body2">{user.name}</Typography>
      </div>

      <div>
        <Typography variant="body1">Email</Typography>
        <Typography variant="body2">{user.email}</Typography>
      </div>

      <hr />

      <div className="flex items-center justify-between flex-wrap">
        <div>
          <Typography variant="body1">Current deposit balance</Typography>
          <Typography variant="h4">{user.deposit_balance}$</Typography>
        </div>
        {payment.status === "success" && (
          <div>
            <Typography align="right" variant="body1" className="text-sm">
              Amount Added
            </Typography>
            <Typography align="right" variant="h4" color="success">
              +{payment.deposit_in_wallet}$
            </Typography>
          </div>
        )}
      </div>
    </Card>
  );
};

export default AccountInformationCard;
