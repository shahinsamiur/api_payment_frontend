"use client";

import { useGetProfileQuery } from "@/store/features/auth";
import {
  useGetAllCostQuery,
  useGetGeneralDataQuery,
} from "@/store/features/generalData";
import { setToken } from "@/store/slices/user";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function AuthGuard({ children }) {
  const { data: session } = useSession();
  useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (session) {
      dispatch(setToken(session?.accessToken));
    }
  }, [session]);

  useGetProfileQuery(undefined, {
    skip: !session,
  });
  useGetAllCostQuery(undefined, {
    skip: !session,
  });
  useGetGeneralDataQuery();

  return children;
}

export default AuthGuard;
