import React from "react";

export default () => {
  return (
    <div>
      <h1 className="display-4">About Contact Manager</h1>
      <p>
        Simple demo app to manage contacts using React's context API and
        JSONPlaceholder to provide some user information.<br />You are able to
        add contacts but since the data does not persist, you are only able to
        edit the original contacts provided.
      </p>
      <p className="text-secondary">Version 1.0.0</p>
    </div>
  );
};
