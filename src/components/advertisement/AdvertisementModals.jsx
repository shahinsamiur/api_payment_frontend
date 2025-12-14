import UpdateAdvertisement from "@/components/advertisement/UpdateAdvertisement";
import DeleteModal from "@/components/libs/DeleteModal";
import { useDeleteAdvertisementMutation } from "@/store/features/advertisement";
import { toast } from "react-toastify";

export default function AdvertisementModals({
  showUpdatModal,
  setShowUpdateModal,
  updateModalData,
  showDeleteModal,
  setShowDeleteModal,
}) {
  const [deleteAds, { isLoading: isDeleting }] =
    useDeleteAdvertisementMutation();

  async function handleDelete() {
    try {
      const id = showDeleteModal;
      await deleteAds(id).unwrap();
      toast.success("Deleted successfully");
      setShowDeleteModal(false);
    } catch (error) {
      toast.error(error.data?.message || "Something went wrong");
    }
  }

  return (
    <>
      {showUpdatModal && (
        <UpdateAdvertisement
          data={updateModalData}
          open={showUpdatModal}
          onClose={() => setShowUpdateModal(false)}
        />
      )}

      {!!showDeleteModal && (
        <DeleteModal
          isLoading={isDeleting}
          open={showDeleteModal}
          setOpen={setShowDeleteModal}
          onDelete={handleDelete}
          title="Advertisement"
        />
      )}
    </>
  );
}
