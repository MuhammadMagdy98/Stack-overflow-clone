export default function pluralize(noun, count) {
  if (count < 0) {
    throw new Error(`count should be nonnegative found count = ${count}`);
  }
  return `${count} ${count === 1 ? noun : noun + "s"}`;
}