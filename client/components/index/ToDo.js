import { html } from "../../../web_modules/htm/preact.js";
import { PropTypes } from "../../../web_modules/prop-types.js";

function ToDo(props) {
  const { text, removeToDo } = props;

  return html`
    <li class="ToDo list-group-item">
      <div class="row justify-content-between align-items-center">
        <div class="col-8 col-xl-9">
          ${text}
        </div>

        <div class="col-4 col-xl-3">
          <button
            type="button"
            class="btn btn-block btn-success"
            onClick=${removeToDo}
          >
            Done
          </button>
        </div>
      </div>
    </li>
  `;
}

ToDo.propTypes = {
  text: PropTypes.string,
  removeToDo: PropTypes.func.isRequired,
};

export default ToDo;
