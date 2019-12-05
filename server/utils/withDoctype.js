/**
 * Preface the provided string with a DOCTYPE tag.
 *
 * @param {string} str
 * @returns {string}
 */
export default function withDoctype(str) {
  return `<!DOCTYPE html>${str}`;
}
