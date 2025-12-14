import { useUpdateProfileMutation } from "@/store/features/auth";
import { BiSolidError } from "react-icons/bi";
import { toast } from "react-toastify";
import Button from "../libs/Button";
import Card from "../libs/Card";
import Typography from "../libs/Typography";

function VerificationRejected() {
  const [updateProfile] = useUpdateProfileMutation();

  async function handleReapply() {
    try {
      const payload = {
        verification_status: null,
      };
      await updateProfile(payload).unwrap();
    } catch (error) {
      toast.error(error.data.message);
    }
  }

  return (
    <Card>
      <Typography variant="h5" className="mb-2">
        Manually account verification
      </Typography>

      <div className="space-y-2 ">
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

      <div className="mt-6 bg-error p-3 rounded-md">
        <Typography
          variant="body2"
          color="white"
          className="flex items-center gap-1"
        >
          <BiSolidError />
          Your application is Rejected, Try another
        </Typography>
      </div>
      <Button onClick={handleReapply} variant="contain">
        Re apply
      </Button>

      <div className="flex justify-end">
        <Typography variant="body2" className="font-medium" color="warning">
          How to Verify?
        </Typography>
      </div>
    </Card>
  );
}

export default VerificationRejected;
