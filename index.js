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
if (action === "update") handleUpdate(id, amount, description);
if (action === "delete") handleDelete(id);
if (action === "view") handleView();
if (action === "summary") handleSummary(month);

function handleAddExpense(description, amount) {
  if (!description || !amount) {
    console.log("Please insert descripion with amount");
    return;
  }

  const data = fs.readFileSync(pathFile);
  const expenseData = JSON.parse(data);

  const newExpense = {
    id: expenseData.length > 0 ? expenseData.at(-1).id + 1 : 1,
    expenseDescrption: description,
    amount,
    createdAt: new Date().toLocaleString("en-US", DATE_OPTION),
    updatedAt: null,
  };

  const newExpenseData = [newExpense, ...expenseData];

  fs.writeFileSync(pathFile, JSON.stringify(newExpenseData), (error) => {
    if (error) return console.log(error);
  });

  return;
}

function handleUpdate(id, amount, description) {
  console.log(id, amount, description);
}

function handleDelete(id) {
  console.log(id);
}

function handleView() {
  const data = fs.readFileSync(pathFile);
  const expenseData = JSON.parse(data);

  if (expenseData.length < 0)
    return console.log("You dont have expense to track!");

  console.table(expenseData);
}

function handleSummary(month) {
  console.log(month);
}
