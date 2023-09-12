import React, { useEffect, useState } from "react";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import UsersList from "../components/UsersList";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Users = () => {

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
  
    const getUsers = async () => {
      try {
        let data = await sendRequest(process.env.REACT_APP_BACKEND_URL + "/users");
        setLoadedUsers(data.users);
      } catch (err) {}
    };
    getUsers();
  }, [sendRequest ]);
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner />}
      {!loadedUsers ? <p style={{"color": "white"}}>Activating backend server - it goes to sleep after 20mins of inactivity</p> : null}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />};
    </>
  );
};

export default Users;
