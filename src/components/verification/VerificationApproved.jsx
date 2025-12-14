import { FaCheckCircle } from "react-icons/fa";
import Card from "../libs/Card";
import Typography from "../libs/Typography";

function VerificationApproved() {
  return (
    <Card>
      <div className="flex flex-col items-center justify-center gap-3">
        <FaCheckCircle className="text-success text-8xl" />

        <Typography variant="h4" color="success">
          Your Application is approved and your are verified now
        </Typography>
      </div>
    </Card>
  );
}

export default VerificationApproved;
