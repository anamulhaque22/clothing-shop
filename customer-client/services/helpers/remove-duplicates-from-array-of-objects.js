function removeDuplicatesFromArrayObjects(array, key) {
  const lookup = new Set();

  return array.filter(
    (value) => !lookup.has(value[key]) && lookup.add(value[key])
  );
}

export default removeDuplicatesFromArrayObjects;
