"use client";
import { useUpdateAccountDeleteMutation } from "@/store/features/auth";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Button from "../libs/Button";
import Card from "../libs/Card";
import Typography from "../libs/Typography";
import DeleteAccountModal from "./DeleteAccountModal";

export default function AccountDeactivationManager() {
  const { user } = useSelector((state) => state.user);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [cancelDelete, { isLoading: isCanceling }] =
    useUpdateAccountDeleteMutation();

  async function handleCancelDeleteAccount() {
    try {
      await cancelDelete({ status: "CANCEL" }).unwrap();
      toast.success("Account delete request cancelled successfully");
    } catch (error) {
      toast.error(error.data?.message || "Internal Server Error");
    }
  }

  return (
    <Card>
      {(!user?.deactivation || user?.deactivation?.status === "CANCEL") && (
        <div className="flex justify-center md:justify-between items-center flex-wrap gap-4">
          <Button
            onClick={() => setShowDeleteModal(true)}
            type="button"
            variant="error"
          >
            <MdDelete className="text-lg" />
            Delete Account
          </Button>
        </div>
      )}

      {user?.deactivation && user?.deactivation?.status !== "CANCEL" && (
        <div>
          <Typography variant="body2">
            Your account is{" "}
            <span className="text-warning">{user.deactivation.status}</span> for
            deactivation
          </Typography>
          <Typography
            variant="body2"
            className="bg-border/70 border border-border px-3 py-1 rounded-md"
          >
            {user.deactivation.reason_for_deactivation}
          </Typography>
          <Typography variant="caption">
            Requested At:{" "}
            {new Date(user.deactivation.created_at).toLocaleDateString(
              "en-GB",
              { day: "numeric", month: "long", year: "numeric" }
            )}
          </Typography>
          {user.deactivation.status === "REJECT" && (
            <div className="bg-error border border-error px-3 py-1 rounded-md mt-2">
              <Typography>
                Rejected reason: {user.deactivation.admin_comment}
              </Typography>
            </div>
          )}
          <div className="flex items-center gap-2 mt-3">
            <Button
              onClick={handleCancelDeleteAccount}
              loading={isCanceling}
              variant="error"
            >
              <IoMdClose size={20} /> Cencel Deactivation
            </Button>
            <Button onClick={() => setShowDeleteModal(true)}>
              <FaEdit /> Edit
            </Button>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <DeleteAccountModal
          open={showDeleteModal}
          setOpen={setShowDeleteModal}
        />
      )}
    </Card>
  );
}
