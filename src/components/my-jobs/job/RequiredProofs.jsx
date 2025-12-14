import Card from "@/components/libs/Card";
import Typography from "@/components/libs/Typography";
import React from "react";
import { FaFileAlt } from "react-icons/fa";

const RequiredProofs = ({ requiredProofs }) => {
  return (
    <Card>
      <Typography variant="h4" className="mb-4">
        Required Proofs
      </Typography>
      <div className="space-y-3">
        {requiredProofs.map((proof, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-3 bg-border rounded-lg"
          >
            <FaFileAlt
              className="text-gray-400 mt-0.5 flex-shrink-0"
              size={18}
            />
            <div>
              <Typography variant="body2" className="font-medium capitalize">
                {proof.type}
              </Typography>
              <Typography variant="caption" className="mt-1">
                {proof.description}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RequiredProofs;
