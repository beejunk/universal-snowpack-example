const MOCK_DATA = {
  toDos: [1, 2, 3, 4],
  toDosById: {
    1: { text: "Groceries" },
    2: { text: "Garbage" },
    3: { text: "Dishes" },
    4: { text: "Mop" },
  },
};

const db = {
  getTodos() {
    return Promise.resolve(MOCK_DATA);
  },
};

export default db;
