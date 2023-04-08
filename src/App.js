import { render } from "react-dom";
import "./styles.css";
import React from "react";

let id = 0;

const ToDo = (props) => (
  <li>
    <input
      type="checkbox"
      onChange={props.toggle}
      checked={props.toDo.checked}
    />
    <span>{props.toDo.text} </span>
    <button onClick={props.onDelete}>Delete</button>
  </li>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
  }

  addToDo(toDo) {
    const text = prompt("What is the todo?");
    this.setState({
      todos: [...this.state.todos, { id: id++, text: text, checked: false }]
    });
  }

  removeToDo(id) {
    this.setState({
      todos: this.state.todos.filter((toDo) => toDo.id !== id)
    });
  }

  toggleToDo(id) {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id !== id) {
          return todo;
        }
        return { id: todo.id, text: todo.text, checked: !todo.checked };
      })
    });
  }

  render() {
    return (
      <div>
        <span>Total items: {this.state.todos.length}</span>
        <br />
        <span>
          Not done:{" "}
          {this.state.todos.filter((toDo) => toDo.checked === false).length}
        </span>
        <br />
        <br />
        <button onClick={() => this.addToDo()}>Add ToDo</button>
        <ul>
          {this.state.todos.map((toDo) => (
            <ToDo
              toggle={() => this.toggleToDo(toDo.id)}
              onDelete={() => this.removeToDo(toDo.id)}
              toDo={toDo}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
