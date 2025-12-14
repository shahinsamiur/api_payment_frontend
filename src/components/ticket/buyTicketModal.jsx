"use client";
import Button from "@/components/libs/Button";
import DropdownMenus from "@/components/libs/DropdownMenus";
import { BuyTicketSchema } from "@/schema/BuyTicket";
import { useBuyticketMutation } from "@/store/features/ticket";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { FaRocket } from "react-icons/fa";
import { toast } from "react-toastify";
import Modal from "../libs/Modal";
import OutlinedInput from "../libs/OutlinedInput";
import Typography from "../libs/Typography";

export default function BuyTicketModal({ unitPrice, open, onClose }) {
  const [buyTicket, { isLoading: buyLoading }] = useBuyticketMutation();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(BuyTicketSchema),
    defaultValues: {
      ticket_amount: "",
      balance_type: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await buyTicket(data).unwrap();
      toast.success("Tickets purchased successfully!");
      onClose();
    } catch (err) {
      toast.error(err.data.error);
    }
  };

  const ticketCount = watch("ticket_amount");

  const optionForDropDown = [
    { label: "Earning Balance", value: "earning_balance" },
    { label: "Deposit Balance", value: "deposit_balance" },
  ];

  return (
    <Modal
      open={open}
      setOpen={onClose}
      title="Buy new ticket"
      className="w-full min-md:w-md"
    >
      <Typography variant="h5" align="center" className="mb-4">
        Ticket unit price: ${unitPrice}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        {/* Dropdown */}
        <div>
          <Typography variant="body1">Select balance type</Typography>
          <Controller
            name="balance_type"
            control={control}
            render={({ field }) => (
              <DropdownMenus
                options={optionForDropDown}
                selected={field.value}
                setSelected={field.onChange}
                placeholder="Select balance type"
                error={errors.balance_type}
              />
            )}
          />
          {errors.balance_type && (
            <Typography variant="error">
              {errors.balance_type.message}
            </Typography>
          )}
        </div>

        <div>
          <OutlinedInput
            label="How many ticket you want"
            type="number"
            placeholder="Enter ticket count"
            {...register("ticket_amount", { required: true })}
            error={errors.ticket_amount?.message}
          />

          <Typography variant="body2">
            Your ticket total price: $
            {(parseInt(ticketCount || 0) * unitPrice).toFixed(4)}
          </Typography>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center items-center">
          <Button
            type="submit"
            variant="contain"
            className="mt-5"
            loading={buyLoading ? buyLoading : null}
          >
            <FaRocket /> Confirm your buy
          </Button>
        </div>
      </form>
    </Modal>
  );
}
