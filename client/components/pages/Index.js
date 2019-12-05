import { html } from "../../../web_modules/htm/preact.js";
import { useReducer } from "../../../web_modules/preact/hooks.js";
import { PropTypes } from "../../../web_modules/prop-types.js";

import ToDo from "./index/ToDo.js";
import ToDoForm from "./index/ToDoForm.js";

const PAGE = "Index";

const ADD_TO_DO = "ADD_TO_DO";
const REMOVE_TO_DO = "REMOVE_TO_DO";

function shoddyUUIDgenerator() {
  return Number(`${Date.now()}${Math.ceil(Math.random() * 1000)}`);
}

function addToDo(text) {
  return { type: ADD_TO_DO, text };
}

function removeToDo(id) {
  return { type: REMOVE_TO_DO, id };
}

function reducer(state, action) {
  switch (action.type) {
    case ADD_TO_DO: {
      const { text } = action;
      const id = shoddyUUIDgenerator();

      return {
        toDos: [...state.toDos, id],
        toDosById: { ...state.toDosById, [id]: { text } }
      };
    }
    case REMOVE_TO_DO: {
      const nextToDos = state.toDos.filter(id => id !== action.id);

      return {
        toDos: nextToDos,
        toDosById: nextToDos.map(id => ({ [id]: state.toDosById[id] }))
      };
    }
    default:
      return state;
  }
}

function ToDoList(props) {
  const [state, dispatch] = useReducer(reducer, props);

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
                    text=${state.toDosById[toDoId].text}
                    removeToDo=${() => {
                      dispatch(removeToDo(toDoId));
                    }}
                  />
                `
            )}
          </ul>
        </div>
      </div>

      <div class="row justify-content-center mt-4">
        <div class="col-12 col-sm-8 col-xl-6">
          <${ToDoForm}
            addToDo=${text => {
              dispatch(addToDo(text));
            }}
          />
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
