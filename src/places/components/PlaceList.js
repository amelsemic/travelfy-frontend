import React from "react";

import Card from "../../shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";
import Button from "../../shared/components/FormElements/Button";
import "./PlaceList.css";
import { AuthContext } from "../../shared/context/auth-context";
import { useContext } from "react";
import { useParams } from "react-router-dom";

const PlaceList = (props) => {
  const auth = useContext(AuthContext);
  let userId = useParams().userId;

  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found. </h2>
          {auth.userId === userId  && <h2>Maybe create one?</h2>}
          {auth.userId === userId  && <Button to="/places/new">Share Place</Button>}
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
          reloadPlaces={props.reloadPlaces}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
