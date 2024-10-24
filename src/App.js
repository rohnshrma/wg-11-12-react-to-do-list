// Importing the necessary features from React: useEffect and useState hooks
import React, { useEffect, useState } from "react";

// Importing the Header, Footer, CreateArea, and Task components from their respective locations
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import CreateArea from "./Components/CreateArea";
import Task from "./Components/Task";

// Defining the main App component, which will contain all our app's logic
function App() {
  // useState is used to create a state variable called 'tasks' to hold our list of tasks.
  // setTasks is the function that we'll use to update the 'tasks' list.
  // Initially, 'tasks' is an empty array because there are no tasks at the start.
  const [tasks, setTasks] = useState([]);

  // useEffect is a hook that runs when the component first renders (mounts).
  // We use it to perform side effects, like fetching data from a server.
  useEffect(() => {
    console.log("Fetching tasks from Firebase..."); // Logs that we're fetching tasks

    // Declaring an asynchronous function to fetch tasks from Firebase
    const fetchTasks = async () => {
      try {
        // Sending a GET request to Firebase's Realtime Database to get tasks
        const response = await fetch(
          "https://webigeeks-56786-default-rtdb.firebaseio.com/tasks.json"
        );

        // Parsing the response into a JSON object (turning the data into something JavaScript can work with)
        const data = await response.json();
        console.log(data); // Logs the data that we got from Firebase

        // Creating an empty array to store the tasks we're fetching
        const loadedTasks = [];

        // Looping through each task we get from Firebase (data is an object with unique IDs as keys)
        for (var key in data) {
          // Each task is stored in the loadedTasks array as an object with an id and a taskName
          loadedTasks.push({
            id: key, // The unique ID given to each task by Firebase
            taskName: data[key].taskName, // The actual task name from Firebase
          });
        }

        // Now we update the tasks state with the loaded tasks from Firebase
        setTasks(loadedTasks);
      } catch (err) {
        // If something goes wrong, we log the error
        console.log("Error fetching tasks : ", err);
      }
    };

    // Calling the fetchTasks function to actually fetch the data
    fetchTasks();
  }, []); // The empty array means this only runs once when the component mounts

  // Function to handle adding a new task
  const addTaskHandler = async (newTask) => {
    try {
      // Sending a POST request to Firebase to add a new task
      // 'POST' requests are used to send data to the server (in this case, adding a new task)
      const response = await fetch(
        "https://webigeeks-56786-default-rtdb.firebaseio.com/tasks.json",
        {
          method: "POST", // Specifies that we're making a POST request
          body: JSON.stringify({ taskName: newTask }), // Converts the new task into JSON format to send it to Firebase
          headers: {
            "Content-Type": "application/json", // Tells Firebase we're sending JSON data
          },
        }
      );

      // Checking if the POST request was successful
      if (response.ok) {
        // Parsing the response from Firebase, which contains the new task's ID
        const responseData = await response.json();
        console.log(responseData); // Logs the response from Firebase (contains the new task's ID)

        // Updating the state to add the new task at the top of the task list
        setTasks((prevTasks) => {
          // Adding the new task with its ID and name to the existing tasks array
          return [{ id: responseData.name, taskName: newTask }, ...prevTasks]; // Adds new task to the beginning of the list
        });
      } else {
        // Logs if the POST request fails
        console.log("Failed to add task");
      }
    } catch (err) {
      // Logs any errors that happen during the POST request
      console.log("Error Adding task :", err);
    }
  };

  // Function to handle deleting a task
  const deleteTaskHandler = (id) => {
    // We use the filter method to remove the task with the given ID
    setTasks((prevTasks) => {
      // The filter function goes through each task and removes the one with the matching ID
      return prevTasks.filter((task, index) => index !== id);
    });
  };

  // The return statement is what defines what the user will see (the UI)
  return (
    <div className="App">
      {/* Renders the Header component at the top of the page */}
      <Header />

      {/* The main section contains the task input area and task list */}
      <main>
        {/* The CreateArea component is where users add new tasks. We pass the addTaskHandler function to it as a prop */}
        <CreateArea onAdd={addTaskHandler} />

        {/* This div will contain all the tasks */}
        <div className="tasks">
          {/* We map over the tasks array, and for each task, we render a Task component */}
          {tasks.map((taskObj) => {
            return (
              <Task
                key={taskObj.id} // Every child in a list needs a unique key. Here it's the task's Firebase ID.
                id={taskObj.id} // We pass the task ID to the Task component
                task={taskObj.taskName} // We pass the task name to the Task component
                onDelete={deleteTaskHandler} // We pass the deleteTaskHandler function to the Task component
              />
            );
          })}
        </div>
      </main>

      {/* Renders the Footer component at the bottom of the page */}
      <Footer />
    </div>
  );
}

// Exporting the App component so it can be used in other files
export default App;
