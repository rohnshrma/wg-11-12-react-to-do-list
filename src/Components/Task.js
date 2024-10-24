// import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

const Task = (props) => {
  const clickHandler = () => {
    props.onDelete(props.id);
  };

  return (
    <div className="task">
      <h3>{props.task}</h3>

      <button onClick={clickHandler}>
        <FaTrash />
      </button>
    </div>
  );
};

export default Task;
