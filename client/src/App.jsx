import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [isTitleSaved, setIsTitleSaved] = useState(false);
  const [taskInput, setTaskInput] = useState("");
  const [tasksTodo, setTasksTodo] = useState([]);
  const [tasksDone, setTasksDone] = useState([]);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const storedLists = JSON.parse(localStorage.getItem("taskLists")) || [];
    setLists(storedLists);

    // Envoi des données au backend
    const sendDataToBackend = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/task`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(storedLists),
          }
        );

        if (!response.ok) {
          throw new Error("Erreur lors de l'envoi des données au serveur");
        }

        console.info("Données envoyées avec succès au serveur.");
      } catch (error) {
        console.error(
          "Erreur lors de l'envoi des données au serveur:",
          error.message
        );
      }
    };

    sendDataToBackend();
  }, []);

  function handleInputChangeTitle(e) {
    setTitle(e.target.value);
  }

  function handleInputChangeTask(e) {
    setTaskInput(e.target.value);
  }

  function handleSaveTitle() {
    setIsTitleSaved(true);
  }

  function handleAddTask(e) {
    e.preventDefault();
    if (taskInput.trim() !== "") {
      setTasksTodo([...tasksTodo, { id: Date.now(), text: taskInput.trim() }]);
      setTaskInput("");
    }
  }

  function moveToDone(taskId) {
    const taskToMove = tasksTodo.find((task) => task.id === taskId);
    if (taskToMove) {
      setTasksDone([...tasksDone, taskToMove]);
      setTasksTodo(tasksTodo.filter((task) => task.id !== taskId));
    }
  }

  function saveTaskZone() {
    const newTaskZone = {
      id: Date.now(),
      title,
      tasksTodo,
      tasksDone,
    };

    const updatedLists = [...lists, newTaskZone];
    setLists(updatedLists);
    localStorage.setItem("taskLists", JSON.stringify(updatedLists));

    // Reset task zone
    setTitle("");
    setIsTitleSaved(false);
    setTasksTodo([]);
    setTasksDone([]);
  }

  function deleteList(listId) {
    const updatedLists = lists.filter((list) => list.id !== listId);
    setLists(updatedLists);
    localStorage.setItem("taskLists", JSON.stringify(updatedLists));
  }

  return (
    <main className="container">
      <header>
        <h1 className="logo">My to do list</h1>
      </header>

      <section>
        <div className="priorité">
          <p className="court-terme">Court</p>
          <p className="moyen-terme">Moyen</p>
          <p className="long-terme">Long</p>
          <p className="terme">terme</p>
        </div>
        <div className="task-zone">
          <form>
            <h3>Titre:</h3>
            {isTitleSaved ? (
              <h2>{title}</h2>
            ) : (
              <input
                type="text"
                placeholder="Titre :"
                value={title}
                onChange={handleInputChangeTitle}
              />
            )}
            {!isTitleSaved && (
              <button type="button" onClick={handleSaveTitle}>
                Enregistrer Titre
              </button>
            )}
          </form>
          <div>
            <h3>A faire :</h3>
            <ul>
              {tasksTodo.map((task) => (
                <li key={task.id}>
                  {task.text}
                  <button type="button" onClick={() => moveToDone(task.id)}>
                    Déplacer vers Fait
                  </button>
                </li>
              ))}
            </ul>
            <form onSubmit={handleAddTask}>
              <input
                type="text"
                placeholder="Nouvelle tâche"
                value={taskInput}
                onChange={handleInputChangeTask}
              />
              <button type="submit">Ajouter Tâche</button>
            </form>
            <div className="list-zone">
              <h3>Fait :</h3>
              <ul>
                {tasksDone.map((task) => (
                  <li key={task.id}>{task.text}</li>
                ))}
              </ul>
            </div>
          </div>
          <button type="button" onClick={saveTaskZone}>
            Enregistrer Liste
          </button>
        </div>
      </section>

      <section>
        <h2>Listes enregistrées :</h2>
        {lists.map((list) => (
          <div key={list.id} className="task-zone">
            <h3>{list.title}</h3>
            <h4>A faire :</h4>
            <ul>
              {list.tasksTodo.map((task) => (
                <li key={task.id}>{task.text}</li>
              ))}
            </ul>
            <h4>Fait :</h4>
            <ul>
              {list.tasksDone.map((task) => (
                <li key={task.id}>{task.text}</li>
              ))}
            </ul>
            <button type="button" onClick={() => deleteList(list.id)}>
              Supprimer Liste
            </button>
          </div>
        ))}
      </section>
    </main>
  );
}

export default App;
