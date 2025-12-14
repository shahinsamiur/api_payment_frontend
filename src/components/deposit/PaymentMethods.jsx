import { config } from "@/config";
import { useGetPaymentSystemsQuery } from "@/store/features/payment";
import clsx from "clsx";
import Image from "next/image";
import { RiArrowRightSLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import LoadingIndicator from "../common/LoadingIndicator";
import Button from "../libs/Button";
import Typography from "../libs/Typography";

function filterByCountry({ data, type, crypto, currency }) {
  const dev = false;
  if (!Array.isArray(data)) return [];

  if (dev) return data.filter((item) => item?.[type]);

  if (crypto) {
    return data.filter((item) => item.type === "passimpay" && item?.[type]);
  }

  return data.filter((item) => {
    if (item.type === "apay") {
      return item?.currency === currency && item?.[type];
    } else {
      return false;
    }
  });
}

const PaymentMethods = ({
  setPaymentMethod,
  title,
  type,
  setGatewayType,
  crypto,
  setCrypto,
}) => {
  const { data, isLoading } = useGetPaymentSystemsQuery();
  const { user } = useSelector((state) => state.user);

  const filteredData = filterByCountry({
    data,
    type,
    crypto,
    currency: user?.country?.currency,
  });

  return (
    <section>
      <div className="flex justify-center items-center bg-primary-darker rounded-md max-w-xs mx-auto mb-3">
        <Button
          variant={!crypto ? "contain" : "outline"}
          onClick={() => setCrypto(false)}
          className={clsx("grow text-white", { "!bg-primary-dark": !crypto })}
        >
          E-wallet
        </Button>
        <Button
          variant={crypto ? "contain" : "outline"}
          onClick={() => setCrypto(true)}
          className={clsx("grow text-white", { "!bg-primary-dark": crypto })}
        >
          Crypto
        </Button>
      </div>

      <Typography variant="h5" className="mb-4">
        Choose payment method {title}
      </Typography>
      {isLoading ? (
        <LoadingIndicator />
      ) : filteredData.length > 0 ? (
        filteredData.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 border border-border rounded-lg mb-4 hover:translate-x-2 transition-all duration-300 hover:bg-border/30 cursor-pointer"
            onClick={() => {
              setPaymentMethod(item.id);
              setGatewayType(item.type);
            }}
          >
            <div className="flex items-center gap-4">
              {item.image_url ? (
                <Image
                  width={150}
                  height={60}
                  src={config.fileBaseUrl + item.image_url}
                  alt={item.name}
                  className="size-12 object-contain bg-border dark:bg-white p-1 rounded-md"
                />
              ) : (
                <div className="size-12 bg-border dark:bg-white flex items-center justify-center text-primary-dark rounded-md">
                  <Typography
                    variant="body1"
                    className="uppercase font-semibold"
                    color="black"
                  >
                    {item.name.slice(0, 2)}
                  </Typography>
                </div>
              )}
              <div>
                <Typography variant="body1" className="font-medium capitalize">
                  {item.name.split("_")[0]} ({item.currency})
                </Typography>
                <Typography variant="body2">{item.network}</Typography>
                <div className="flex items-center gap-2">
                  {type === "deposit" ? (
                    <>
                      <Typography variant="body2">
                        Min: {item.min_deposit}
                      </Typography>
                      <Typography variant="body2">
                        Max: {item.max_deposit}
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Typography variant="body2">
                        Min: {item.min_withdrawals}
                      </Typography>
                      <Typography variant="body2">
                        Max: {item.max_withdrawals}
                      </Typography>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div>
              <RiArrowRightSLine className="text-2xl dark:text-white" />
            </div>
          </div>
        ))
      ) : (
        <Typography variant="caption">No payment methods found.</Typography>
      )}
    </section>
  );
};

export default PaymentMethods;
