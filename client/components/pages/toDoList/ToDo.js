import { html } from "../../../../web_modules/htm/preact.js";
import { PropTypes } from "../../../../web_modules/prop-types.js";

function ToDo(props) {
  const { text, removeToDo } = props;

  return html`
    <li class="ToDo">
      ${text}

      <button onClick=${removeToDo}>
        Done
      </button>
    </li>
  `;
}

ToDo.propTypes = {
  text: PropTypes.string,
  removeToDo: PropTypes.func.isRequired
};

export default ToDo;
