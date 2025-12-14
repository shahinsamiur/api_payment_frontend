import Card from "../libs/Card";
import Typography from "../libs/Typography";

function VerificationPending() {
  return (
    <Card>
      <Typography variant="h5" className="mb-2">
        Manually account verification
      </Typography>

      <div className="space-y-2">
        <Typography variant="body2" color="warning" className="font-medium">
          Attention Please
        </Typography>
        <ul className="list-disc list-inside space-y-1 dark:text-white">
          <li>
            <strong>Images section</strong> - Don't use copy images.
          </li>
          <li>
            <strong>Document section</strong> - Don't upload fake or edited
            documents.
          </li>
          <li>
            <strong>Verification Documents</strong> - Always use real and clear
            images for verification.
          </li>
          <li>
            <strong>Ban Warning</strong> - If you upload fake or edited
            documents, your account will be permanently banned without any
            warning.
          </li>
        </ul>
      </div>

      <div className="mt-6 bg-success text-white p-3 rounded-md font-medium">
        <Typography variant="body2">
          Please wait 1 - 6 Hours. We are reviewing
        </Typography>
      </div>

      <div className="flex justify-end">
        <Typography variant="body2" className="font-medium" color="warning">
          How to Verify?
        </Typography>
      </div>
    </Card>
  );
}

export default VerificationPending;
