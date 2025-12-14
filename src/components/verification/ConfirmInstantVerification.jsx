import Button from "../libs/Button";
import Modal from "../libs/Modal";
import Typography from "../libs/Typography";

const ConfirmInstantVerification = ({
  open,
  onClose,
  onConfirm,
  cost,
  isLoading,
}) => {
  return (
    <Modal open={open} setOpen={onClose} title="Instant Verification">
      <Typography className="text-center">
        Are you sure you want to verify your identity instantly for{" "}
        <span className="font-semibold">${cost}</span>?
      </Typography>

      <div className="flex justify-center items-center gap-3 mt-8">
        <Button variant="outline" onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button variant="contain" onClick={onConfirm} loading={isLoading}>
          Confirm
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmInstantVerification;
