import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
  	<div>
  	<p></p>
    <button onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out of Twitter
    </button>
    </div>
  );
};

export default LogoutButton;