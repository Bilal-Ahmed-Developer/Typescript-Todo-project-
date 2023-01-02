import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";

figlet("Todo list!!", function (err, data) {
  if (err) {
    console.log("something went wrong")
    console.dir(err)
  }
  console.log(chalk.green(data))
})

let todolist: string[] = [];

// looping mei instemaal hoga
async function Repeatflow() {
  const answer = await inquirer.prompt([{
    name: "repeat",
    type: 'list',
    choices: ["Yes", "No"],
    message: "Do you want to perform another operation"
  }]);
  return (answer.repeat === "Yes") ? true : false;
}
async function TodoList() {
  // for looping ke liye
  let startAgain = true;
  do {

// take the user input
    const answer: { options: string } = await inquirer.prompt([{
      name: "options",
      type: "list",
      choices: ["Add item", "Display", "Remove Items"],
      message: "What you want to do?"
    }]);

    // add item option
    if (answer.options === "Add item") {
      const item = await inquirer.prompt([{
        name: "newItem",
        type: "input",
        message: "Enter your Item"
      }]);
      todolist.push(item.newItem);
      startAgain = await Repeatflow()

    }

    // for display option
    else if (answer.options === "Display") {
      if (todolist.length === 0) {
        console.log(chalk.red("nothing item to show"))
      } else {
        todolist.forEach(element => console.log(element))
        startAgain = await Repeatflow()
      }
    }

    // remove item option
    else if (answer.options === "Remove Items") {
      if (todolist.length == 0) {
        console.log(chalk.red("your list is empty"))
      }
      else{
      const removeItem: { remove: string } = await inquirer.prompt([{
        name: "remove",
        type: "input",
        message: "which item you want to remove"
      }])
      let index = todolist.indexOf(removeItem.remove);
      // console.log(index)
      if(index !== -1){
        todolist.splice(index,1)
      }else{
        todolist.pop();
         todolist.forEach(element => console.log(element))
        startAgain = await Repeatflow()
      }
     }
    }
  } while (startAgain !== false);
}

//for function calling ya setimout is liye lagaya ha taka thora sa dila ho aur pehle heading ai todolist ki
setTimeout(() => {
  TodoList()

}, 100);