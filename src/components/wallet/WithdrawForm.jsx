import { config } from "@/config";
import useGetCostFromCostCenter from "@/hooks/useGetCostFromCostCenter";
import useGetSingleGateWay from "@/hooks/useGetSingleGateWay";
import {
  useApayWithdrawMutation,
  useGetCurrencyConversationDataQuery,
  useWithdrawWithPassimpayMutation,
} from "@/store/features/payment";
import { Controller, useForm } from "react-hook-form";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { toast } from "react-toastify";
import LoadingIndicator from "../common/LoadingIndicator";
import PaymentInfoCard from "../deposit/PaymentInfoCard";
import Button from "../libs/Button";
import DropdownMenus from "../libs/DropdownMenus";
import OutlinedInput from "../libs/OutlinedInput";
import Typography from "../libs/Typography";

const WithdrawForm = ({ setPaymentMethod, paymentMethodId, type }) => {
  const [apayWithdraw, { isLoading: apayWithdrawLoading }] =
    useApayWithdrawMutation();
  const [passimpayWithdraw, { isLoading: passimpayWithdrawLoading }] =
    useWithdrawWithPassimpayMutation();
  const { data: currencyData } = useGetCurrencyConversationDataQuery();
  const withdrawFee = useGetCostFromCostCenter(
    "withdrawal_fee_gateway_percentage"
  );
  const { data, isLoading } = useGetSingleGateWay({
    id: paymentMethodId,
    type,
  });

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  async function handleApayWithdraw(payload) {
    payload.payment_system = data?.data?.name;
    payload.data = payload.data || {};
    payload.data.return_url = config.paymentPageUrl;
    await apayWithdraw(payload).unwrap();
  }

  async function handlePassimpayWithdraw(payload) {
    payload.paymentId = data?.data?.gateway_id;
    await passimpayWithdraw(payload).unwrap();
  }

  const onSubmit = async (payload) => {
    try {
      if (type === "apay") {
        await handleApayWithdraw(payload);
      } else if (type === "passimpay") {
        await handlePassimpayWithdraw(payload);
      }
      toast.success(
        "Withdraw request submitted successfully. You will be notified once it is processed."
      );
    } catch (error) {
      toast.error(error.data?.message || "Internal Server Error");
    }
  };

  if (isLoading) {
    return (
      <section>
        <div className="flex justify-between items-center mb-6">
          <Typography variant="h5">Withdraw</Typography>
          <Button onClick={() => setPaymentMethod(null)} variant="outline">
            <MdKeyboardArrowLeft className="mr-1" />
            Go back
          </Button>
        </div>
        <LoadingIndicator />
      </section>
    );
  }

  if (!data?.data) {
    return (
      <section>
        <div className="flex justify-between items-center mb-6">
          <Typography variant="h5">Withdraw</Typography>
          <Button onClick={() => setPaymentMethod(null)} variant="outline">
            <MdKeyboardArrowLeft className="mr-1" />
            Go back
          </Button>
        </div>
        <div className="text-center py-8">
          <Typography variant="caption">No withdrawal method found</Typography>
        </div>
      </section>
    );
  }

  const paymentMethod = data.data;
  const form =
    data.data?.withdrawal_frontend_data &&
    typeof data.data?.withdrawal_frontend_data === "string"
      ? JSON.parse(data.data.withdrawal_frontend_data)
      : data.data.withdrawal_frontend_data;
  const currency =
    paymentMethod.type === "apay" ? paymentMethod.currency : "USD";

  const conversionRate = currencyData?.find(
    (c) => c.to_currency === currency
  )?.rate;

  const amount = watch("amount") || 0;
  const equivalentUSD =
    currency === "USD"
      ? amount
      : conversionRate
      ? (parseFloat(amount) / parseFloat(conversionRate)).toFixed(4)
      : 0;
  const networkFee = data?.data?.fee_network ?? 0;

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h5">{data.data.description}</Typography>
        <Button onClick={() => setPaymentMethod(null)} variant="outline">
          <MdKeyboardArrowLeft className="mr-1" />
          Go back
        </Button>
      </div>

      {/* Payment Method Info Card */}
      <PaymentInfoCard
        conversionRate={conversionRate}
        currency={currency}
        data={data}
        networkFee={networkFee}
        fee={withdrawFee.cost}
        paymentMethod={paymentMethod}
        type={type}
        formType="Withdrawal"
      />

      {/* Payment Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {/* Amount Field */}
        <div>
          <OutlinedInput
            label={`Amount (${currency})`}
            {...register("amount", {
              required: "Amount is required",
              min: {
                value: paymentMethod.min_deposit,
                message: `Minimum withdrawal amount is ${paymentMethod.min_withdrawals}`,
              },
              max: {
                value: paymentMethod.max_deposit,
                message: `Maximum withdrawal amount is ${paymentMethod.max_withdrawals}`,
              },
            })}
            type="number"
            placeholder="Enter amount"
            error={errors.amount?.message}
          />

          {type === "apay" && (
            <Typography variant="body2">
              Equivalent amount:{" "}
              <span className="text-warning">{equivalentUSD}$</span>
            </Typography>
          )}
        </div>

        {type === "passimpay" && (
          <OutlinedInput
            label="Your Wallet ID"
            {...register("addressTo", {
              required: "Wallet ID is required",
            })}
            placeholder="Enter your Wallet ID"
            error={errors.addressTo?.message}
          />
        )}

        {form?.form_fields?.map((field) => {
          if (!field?.key) return null;
          return (
            <div key={field.key}>
              <label>{field.label}</label>
              {field.type === "select" ? (
                <Controller
                  name={`data.${field.key}`}
                  control={control}
                  rules={field.validation}
                  render={({ field: fieldItem }) => (
                    <DropdownMenus
                      placeholder={field.placeholder}
                      options={field.options}
                      selected={fieldItem.value}
                      setSelected={fieldItem.onChange}
                      error={errors.data && errors.data[field.key]}
                    />
                  )}
                />
              ) : (
                <input
                  {...register(`data.${field.key}`, field.validation)}
                  type={field.type}
                  placeholder={field.placeholder}
                  className={` ${
                    errors.data && errors?.data[field.key]
                      ? "!border-error placeholder:text-error"
                      : ""
                  }`}
                />
              )}
              {errors.data && errors?.data[field.key] && (
                <Typography variant="error">
                  {errors.data[field.key].message}
                </Typography>
              )}
            </div>
          );
        })}

        <div className="flex justify-end">
          <Typography variant="body2" className="font-medium">
            Withdrawal amount:{" "}
            <span className="text-warning">
              {(
                equivalentUSD -
                (equivalentUSD * networkFee) / 100 -
                (equivalentUSD * withdrawFee.cost) / 100
              ).toFixed(4)}
              $
            </span>
          </Typography>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            loading={apayWithdrawLoading || passimpayWithdrawLoading}
            type="submit"
          >
            Withdraw
          </Button>
        </div>
      </form>
    </section>
  );
};

export default WithdrawForm;
