import React, { useState } from "react";

const CreateArea = (props) => {
  const [taskInput, setTaskInput] = useState("");

  const handleChangeInput = (e) => {
    const taskText = e.target.value;
    setTaskInput(taskText);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    props.onAdd(taskInput);
  };

  return (
    <div className="create_area wrapper">
      <form onSubmit={submitHandler}>
        <div>
          <input
            type="text"
            placeholder="enter task name..."
            onChange={handleChangeInput}
          />
        </div>
        <button>Add Task +</button>
      </form>
    </div>
  );
};

export default CreateArea;
