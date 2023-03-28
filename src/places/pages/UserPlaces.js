import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import PlaceList from "../components/PlaceList";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const UserPlaces = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  console.log(error, clearError);
  const [requestSent, setRequestSent] = useState(false);
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const [reloadPage, setReloadPage] = useState(0);
  const userId = useParams().userId;

  useEffect(() => {
    const getPlaces = async () => {
      try {
        let data = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/places/user/${userId}`
        );
        setLoadedPlaces(data.places);
      } catch (err) {
        setLoadedPlaces([]);
      }
    };

    getPlaces();
    setRequestSent(true);
  }, [sendRequest, userId, reloadPage]);

  const reloadPlacesHandler = () => {
    setReloadPage((prev) => prev + 5);
  };

  return (
    <>
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && loadedPlaces && requestSent && (
        <PlaceList items={loadedPlaces} reloadPlaces={reloadPlacesHandler} />
      )}
      ;
    </>
  );
};

export default UserPlaces;
