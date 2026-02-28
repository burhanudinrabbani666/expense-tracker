# Expense Tracker CLI

Challenge for: https://roadmap.sh/projects/expense-tracker

A lightweight command-line tool for managing and tracking personal expenses. All data is stored locally in a JSON file in the project directory.

---

## Getting Started

```bash
# clone repository
git clone https://github.com/burhanudinrabbani666/expense-tracker.git

cd expense-tracker

# install depedency
npm install

# run index.js
node index.js list

```

---

## Commands

### Add an Expense

Record a new expense with a description and amount.

```bash
node index.js add -d <description> -a <amount>
```

**Example:**

```bash
node index.js add -d "Groceries" -a 50
```

---

### Update an Expense

Modify the description or amount of an existing expense by its ID.

```bash
node index.js update -i <id> [-d <description>] [-a <amount>]
```

**Example:**

```bash
node index.js update -i 3 -a 75
node index.js update -i 3 -d "Weekly groceries" -a 75
```

---

### Delete an Expense

Remove an expense from the record by its ID.

```bash
node index.js delete -i <id>
```

**Example:**

```bash
node index.js delete -i 3
```

---

### List All Expenses

Display all recorded expenses in a table.

```bash
node index.js list
```

---

### Summary

View the total amount of all expenses, or filter by a specific month.

```bash
# Total summary
node index.js summary

# Summary for a specific month (1-12)
node index.js summary -m <month>
```

**Example:**

```bash
node index.js summary -m 2
```

---

## Options Reference

| Option          | Alias | Type   | Description                            |
| --------------- | ----- | ------ | -------------------------------------- |
| `--description` | `-d`  | string | Expense description                    |
| `--amount`      | `-a`  | number | Expense amount                         |
| `--id`          | `-i`  | number | Expense ID                             |
| `--month`       | `-m`  | number | Month number (1-12) for summary filter |

---

## Data Storage

All expenses are saved to `expense.json` in the project directory. The file is created automatically on first use. Each expense record contains the following fields:

- `id` - unique identifier
- `expenseDescription` - description of the expense
- `amount` - expense amount
- `createdAt` - date the record was created
- `updatedAt` - date the record was last updated (null if never updated)

## Thanks
