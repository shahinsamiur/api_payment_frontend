import Button from "./Button";
import Modal from "./Modal";
import Typography from "./Typography";

function DeleteModal({ open, setOpen, onDelete, title, isLoading }) {
  return (
    <Modal
      title={`Delete ${title}`}
      className="w-full min-md:w-md"
      open={open}
      setOpen={setOpen}
    >
      <div>
        <Typography align="center">
          Are you sure you want to delete this {title}?
        </Typography>

        <div className="flex items-center justify-end gap-3 mt-8">
          <Button onClick={() => setOpen(false)} variant="outline">
            Cancel
          </Button>
          <Button onClick={onDelete} loading={isLoading} variant="error">
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteModal;
