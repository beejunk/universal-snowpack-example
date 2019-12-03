import { html } from "../../../web_modules/htm/preact.js";
import { useState } from "../../../web_modules/preact/hooks.js";
import { PropTypes } from "../../../web_modules/prop-types.js";

import ToDo from "./toDoList/ToDo.js";

const PAGE = "ToDoList";

function ToDoList(props) {
  const { toDos, toDosById } = props;
  const [state, setState] = useState({ toDos, toDosById });

  function removeToDo(id) {
    setState({
      toDos: state.toDos.filter(toDoId => toDoId !== id),
      toDosById: state.toDos.reduce((nextToDosById, toDoId) => {
        if (toDoId !== id) {
          nextToDosById[id] = state.toDosById[id]; // eslint-disable-line
        }

        return nextToDosById;
      }, {})
    });
  }

  return html`
    <main id=${PAGE} class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-12 col-sm-8 col-xl-6">
          <h1 class="text-center">To-Do with Pika!</h1>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-12 col-sm-8 col-xl-6">
          <ul class="list-group">
            ${state.toDos.map(
              toDoId =>
                html`
                  <${ToDo}
                    key=${toDoId}
                    text=${toDosById[toDoId].text}
                    removeToDo=${() => {
                      removeToDo(toDoId);
                    }}
                  />
                `
            )}
          </ul>
        </div>
      </div>
    </main>
  `;
}

ToDoList.Head = html`
  <title>To-Do with Pika!</title>
`;

ToDoList.pageName = PAGE;

ToDoList.defaultProps = {
  toDos: [],
  toDosById: {}
};

ToDoList.propTypes = {
  toDos: PropTypes.arrayOf(PropTypes.number),
  toDosById: PropTypes.objectOf(
    PropTypes.shape({
      text: PropTypes.string
    })
  )
};

export default ToDoList;
