import Button from "@/components/libs/Button";
import Modal from "@/components/libs/Modal";
import useJobReport from "@/hooks/dashboardLayout/useJobReport";
import { useState } from "react";
import { FaFlag } from "react-icons/fa";
import OutlinedTextArea from "../libs/OutlinedTextArea";

function JobReport({ open, onOpen, title, jobId, submissionId }) {
  const [value, setValue] = useState("");

  const { error, handleSubmitReport, isLoading } = useJobReport({
    jobId,
    submissionId,
  });

  return (
    <Modal
      open={open}
      setOpen={onOpen}
      title={title}
      className="w-full min-md:w-xl"
    >
      <form
        onSubmit={(e) => handleSubmitReport(e, { value, onOpen })}
        className="space-y-4"
      >
        <OutlinedTextArea
          rows={6}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          error={error}
          placeholder="Type here..."
        />

        <div className="flex justify-center">
          <Button loading={isLoading} variant="warning" type="submit">
            <FaFlag /> Report
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default JobReport;
