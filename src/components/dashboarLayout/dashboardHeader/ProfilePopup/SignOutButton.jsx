import Button from "@/components/libs/Button";
import React from "react";
import { IoLogOut } from "react-icons/io5";

const SignOutButton = ({ onSignOut }) => {
  return (
    <div>
      <Button
        className="text-error w-full justify-start"
        onClick={onSignOut}
        variant="text"
      >
        <IoLogOut className="text-lg" />
        <span>Logout</span>
      </Button>
    </div>
  );
};

export default SignOutButton;
