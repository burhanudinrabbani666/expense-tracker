const { program } = require("commander");
const fs = require("fs");
const path = require("path");

const DATE_OPTION = { day: "numeric", month: "short", year: "numeric" };

const pathFile = path.join(__dirname, "expense.json");

if (!fs.existsSync(pathFile)) {
  fs.writeFileSync(pathFile, JSON.stringify([]), (error) => {
    return console.log(error);
  });
}

program
  .option("-d, --description <string>", "description")
  .option("-a, --amount <number>", "amount", parseInt)
  .option("-i, --id <number>", "id", parseInt)
  .option("-m, --month <number>", "month", parseInt)
  .argument("[action]", "action to perform");

program.parse();

const { description, amount, id, month } = program.opts();
const [action] = program.args;

if (action === "add") handleAddExpense(description, amount);
else if (action === "update") handleUpdate(id, amount, description);
else if (action === "delete") handleDelete(id);
else if (action === "list") handleList();
else if (action === "summary") handleSummary(month);
else console.log("Action sould be one of add,edit,list or summary");
// -------------------------------------------------------------------

function getData() {
  const data = fs.readFileSync(pathFile);
  return JSON.parse(data);
}

function handleAddExpense(description, amount) {
  if (!description || !amount) {
    console.log("Please insert descripion with amount");
    return;
  }

  const expenseData = getData();

  const newExpense = {
    id: expenseData.length > 0 ? expenseData[0].id + 1 : 1,
    expenseDescription: description,
    amount,
    createdAt: new Date().toLocaleString("en-US", DATE_OPTION),
    updatedAt: null,
  };

  expenseData.unshift(newExpense);

  try {
    fs.writeFileSync(pathFile, JSON.stringify(expenseData));
  } catch (error) {
    console.log(error);
  }
  return;
}

function handleUpdate(id, amount, description) {
  if (!id) return console.log("edit must be insert id");

  const expenseData = getData();
  const expenseToEdit = expenseData.find((expense) => expense.id === id);

  if (!expenseToEdit) return console.log("Expense not Found!");

  const newExpense = {
    id,
    expenseDescription: description
      ? description
      : expenseToEdit.expenseDescription,
    amount: amount ? amount : expenseToEdit.amount,
    createdAt: expenseToEdit.createdAt,
    updatedAt: new Date().toLocaleString("en-US", DATE_OPTION),
  };

  const newExpenseData = expenseData.map((expense) =>
    expense.id === newExpense.id ? newExpense : expense,
  );

  try {
    fs.writeFileSync(pathFile, JSON.stringify(newExpenseData));
  } catch (error) {
    console.log(error);
  }
  return;
}

function handleDelete(id) {
  if (!id) return console.log("Require id");

  const expenseData = getData();

  if (expenseData.length === 0)
    return console.log("You dont have expense to track!");

  const newExpenseData = expenseData.filter((expense) => expense.id !== id);

  try {
    fs.writeFileSync(pathFile, JSON.stringify(newExpenseData));
  } catch (error) {
    console.log(error);
  }
  return;
}

function handleList() {
  const expenseData = getData();

  if (expenseData.length === 0)
    return console.log("You dont have expense to track!");

  console.table(expenseData);
}

function handleSummary(month) {
  const expenseData = getData();

  if (expenseData.length === 0) return console.log(`You dont have summary yet`);

  const monthArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthForSummary = monthArray[month - 1];
  let summary;

  if (month !== undefined) {
    const summaryOfMonth = expenseData.filter(
      (expense) => new Date(expense.createdAt).getMonth() === month - 1,
    );

    if (summaryOfMonth.length === 0)
      return console.log(`You not have expense in ${monthForSummary}`);

    summary = summaryOfMonth.reduce((acc, curr) => acc + curr.amount, 0);

    return console.log(`You'r summary in ${monthForSummary} is ${summary}`);
  }

  summary = expenseData.reduce((acc, curr) => acc + curr.amount, 0);

  return console.log(`Your Summary is ${summary}`);
}
