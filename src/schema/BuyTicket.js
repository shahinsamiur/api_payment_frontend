import * as yup from "yup";

export const BuyTicketSchema = yup.object({
  ticket_amount: yup
    .number()
    .typeError("Ticket count is required")
    .positive("Must be greater than 0")
    .required("Ticket count is required"),
  balance_type: yup.string().required("Please select a balance type"),
});
