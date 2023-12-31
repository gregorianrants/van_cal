import React from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { handleRedirectThunk } from "./authSlice";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function Auth() {
  let query = useQuery();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const history = useHistory();

  React.useEffect(() => {
    const code = query.get("code");
    const state = query.get("state");
    console.log("state your conde", code, state);

    if (code && state) {
      dispatch(handleRedirectThunk({ code, state }));
    }
  }, [dispatch,query]);//added these as per error message

  React.useEffect(() => {
    if (isAuthenticated) history.push("/calendar");
  }, [isAuthenticated,history]);

  return <p>hello from auth</p>;
}
