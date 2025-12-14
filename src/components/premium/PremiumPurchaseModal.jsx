"use client";

import Button from "@/components/libs/Button";
import DropdownMenus from "@/components/libs/DropdownMenus";
import Modal from "@/components/libs/Modal";
import usePurchasePackage from "@/hooks/dashboardLayout/usePurchasePackage";
import Table from "../libs/Table";
import TableContainer from "../libs/TableContainer";
import Typography from "../libs/Typography";

export default function PremiumPurchaseModal({ open, onClose, premiumPkg }) {
  const {
    handleConfirmPurchase,
    isLoading,
    error,
    selectedOption,
    handleOnchange,
  } = usePurchasePackage();

  const options = [
    { value: "earning_balance", label: "Earning Balance" },
    { value: "deposit_balance", label: "Deposit Balance" },
  ];

  return (
    <Modal
      setOpen={onClose}
      open={open}
      title="Purchase premium package"
      className="w-full max-w-lg"
    >
      <div className="space-y-2 dark:text-white">
        <div className="space-y-3">
          <div>
            <label>Select Balance</label>
            <DropdownMenus
              options={options}
              placeholder="Select Balance"
              className="w-full"
              selected={selectedOption}
              setSelected={handleOnchange}
              error={error}
            />
            {error && <Typography variant="error">{error}</Typography>}
          </div>
          <TableContainer>
            <Table>
              <tbody>
                <tr className="bg-gray-200 dark:bg-primary-darker/30">
                  <th className="text-center">Duration</th>
                  <th className="text-center">Cost</th>
                </tr>
                <tr className="!bg-transparent border-t border-border">
                  <td className="text-center">
                    {premiumPkg.duration}{" "}
                    {premiumPkg.duration == 1 ? "Month" : "Months"}
                  </td>
                  <td className="text-center">${premiumPkg.price}</td>
                </tr>
              </tbody>
            </Table>
          </TableContainer>
        </div>

        <div className="flex gap-2 justify-end items-center">
          <Button
            loading={isLoading}
            onClick={() => handleConfirmPurchase(premiumPkg.package_id)}
            variant="contain"
          >
            Yes, Confirm
          </Button>
          <button
            onClick={() => onClose(false)}
            className="bg-error hover:bg-error/80 px-5 text-white py-2 rounded-md text-[0.9rem]"
          >
            No
          </button>
        </div>
      </div>
    </Modal>
  );
}
