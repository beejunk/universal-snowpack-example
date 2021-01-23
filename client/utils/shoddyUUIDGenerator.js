/**
 * The name says it all.
 */
export default function shoddyUUIDGenerator() {
  return Number(`${Date.now()}${Math.ceil(Math.random() * 1000)}`);
}
