import { html } from "../../../web_modules/htm/preact.js";
import { useState } from "../../../web_modules/preact/hooks.js";
import { PropTypes } from "../../../web_modules/prop-types.js";

function ToDoForm(props) {
  const { addToDo } = props;
  const [state, setState] = useState("");

  return html`
    <form>
      <div class="form-group">
        <div class="row">
          <label class="col h2 text-center" for="create-to-do-form">
            Create ToDo
          </label>
        </div>

        <input
          class="form-control"
          id="create-to-do-form"
          value=${state}
          onInput=${e => {
            setState(e.target.value);
          }}
        />
      </div>

      <div class="row justify-content-end">
        <div class="col-4 col-xl-3">
          <button
            type="submit"
            class="btn btn-block btn-primary"
            onClick=${e => {
              e.preventDefault();
              addToDo(state);
              setState("");
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  `;
}

ToDoForm.propTypes = {
  addToDo: PropTypes.func
};

export default ToDoForm;
