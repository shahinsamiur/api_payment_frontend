import {
  useAccountDeleteMutation,
  useUpdateAccountDeleteMutation,
} from "@/store/features/auth";
import { useForm } from "react-hook-form";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Button from "../libs/Button";
import Modal from "../libs/Modal";
import OutlinedTextArea from "../libs/OutlinedTextArea";

const DeleteAccountModal = ({ setOpen, open }) => {
  const [deleteAccount, { isLoading }] = useAccountDeleteMutation();
  const [updateDelete, { isLoading: updating }] =
    useUpdateAccountDeleteMutation();
  const { user } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      reason_for_deactivation:
        user?.deactivation?.status !== "CANCEL"
          ? user?.deactivation?.reason_for_deactivation
          : "",
    },
  });

  async function onSubmit(data) {
    try {
      if (
        user?.deactivation?.reason_for_deactivation &&
        user?.deactivation?.status !== "CANCEL"
      ) {
        await updateDelete(data).unwrap();
      } else {
        await deleteAccount(data).unwrap();
      }
      toast.success("Account delete request sent successfully");
      setOpen(false);
    } catch (error) {
      toast.error(error.data?.message || "Internal Server Error");
    }
  }
  return (
    <Modal
      className="w-full max-w-md"
      open={open}
      setOpen={setOpen}
      title="Delete Account"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 mt-3">
        <OutlinedTextArea
          label="Why do you want to delete your account?"
          rows={4}
          {...register("reason_for_deactivation", {
            required: "Reason is required",
          })}
          type="text"
          placeholder="Enter reason"
          error={errors.reason_for_deactivation?.message}
        />

        <Button
          loading={isLoading || updating}
          className="mx-auto"
          variant="error"
        >
          <MdDelete className="text-lg" />
          {user?.deactivation?.reason_for_deactivation
            ? "Submit"
            : "Delete Account"}
        </Button>
      </form>
    </Modal>
  );
};

export default DeleteAccountModal;
