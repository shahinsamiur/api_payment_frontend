import Button from "@/components/libs/Button";
import useResponsive from "@/hooks/useResponsive";
import Link from "next/link";

import { useSelector } from "react-redux";

export default function HeaderBalance({
  size,
  className1 = "bg-primary-darker text-white",
  className2 = "bg-primary-dark text-white",
}) {
  const { user } = useSelector((state) => state.user);
  const isMobile = useResponsive("down", "md");

  const LinkComponent = ({ href, children }) =>
    href ? <Link href={href}>{children}</Link> : <>{children}</>;

  return (
    <>
      <LinkComponent href={isMobile ? undefined : "/history/deposit-history"}>
        <Button variant="text" size={size} className={className1}>
          {isMobile ? "Earn" : "Earning"} : $
          {user?.wallet_balance?.earning_balance ?? 0}
        </Button>
      </LinkComponent>

      <LinkComponent href={isMobile ? undefined : "/history/withdraw-history"}>
        <Button variant="text" size={size} className={className2}>
          Deposit: ${user?.wallet_balance?.deposit_balance ?? 0}
        </Button>
      </LinkComponent>
    </>
  );
}
