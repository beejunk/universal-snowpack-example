import { useReducer } from "preact/hooks";
import PropTypes from "prop-types";

import { html, hydrate, render } from "../utils/preact.js";
import shoddyUUIDGenerator from "../utils/shoddyUUIDGenerator.js";
import Layout from "../components/shared/Layout.js";
import ToDo from "../components/index/ToDo.js";
import ToDoForm from "../components/index/ToDoForm.js";

const PAGE = "Index";

const ADD_TO_DO = "ADD_TO_DO";
const REMOVE_TO_DO = "REMOVE_TO_DO";

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
      const id = shoddyUUIDGenerator();

      return {
        toDos: [...state.toDos, id],
        toDosById: { ...state.toDosById, [id]: { text } },
      };
    }
    case REMOVE_TO_DO: {
      const nextToDos = state.toDos.filter((id) => id !== action.id);

      return {
        toDos: nextToDos,
        toDosById: nextToDos.reduce(
          (nextToDosById, id) => ({
            ...nextToDosById,
            [id]: state.toDosById[id],
          }),
          {}
        ),
      };
    }
    default:
      return state;
  }
}

function Index(props) {
  const [state, dispatch] = useReducer(reducer, props);

  return html`
    <${Layout}>
      <main id=${PAGE}>
        <div class="row justify-content-center">
          <div class="col-12 col-sm-8 col-xl-6">
            <ul class="list-group">
              ${state.toDos.map(
                (toDoId) => html`
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
              addToDo=${(text) => {
                dispatch(addToDo(text));
              }}
            />
          </div>
        </div>
      </main>
    <//>
  `;
}

Index.defaultProps = {
  toDos: [],
  toDosById: {},
};

Index.propTypes = {
  toDos: PropTypes.arrayOf(PropTypes.number),
  toDosById: PropTypes.objectOf(
    PropTypes.shape({
      text: PropTypes.string,
    })
  ),
};

export const Head = html`<title>To-Do with Snowpack!</title>`;

export async function getServerProps({ ctx }) {
  const { db } = ctx;

  const props = await db.getTodos();

  return props;
}

Index.initPage = function initPage(props) {
  let pageNode = html`<${Index} ...${props} />`;

  hydrate(pageNode, document.body);

  if (import.meta.hot) {
    import.meta.hot.accept(({ module }) => {
      pageNode = html`<${module.default} ...${props} />`;
      render(pageNode, document.body);
    });
  }
};

export default Index;
