const createTodo = document.querySelector("#createTodo");
const todoList = document.querySelector(".tasks__list");
const tasksCounter = document.querySelector(".items-ammount");
const tasksListPanel = document.querySelector(".list__panel");
const tasksNavigation = document.querySelector(".tasks__navigation");

const addedTasks = [];
const completedTasks = [];
const unCompletedTasks = [];
let allTasks;

createTodo.addEventListener("keydown", (e) => {
  if (e.keyCode === 13 && createTodo.value.trim() !== "") {
    tasksListPanel.classList.remove("hidden");
    tasksNavigation.classList.remove("hidden");

    const createdTodo = document.createElement("li");

    const checkImg = `<span class="todo__check"><img src="./images/icon-check.svg" alt="check" class="check"></span>`;
    const deleteTodo = document.createElement("span");
    deleteTodo.classList.add("todo__delete-container");
    deleteTodo.innerHTML = `<img src="./images/icon-cross.svg" alt="cross" class="delete__img">`;

    createdTodo.innerHTML = `${checkImg}${createTodo.value}`;
    createdTodo.appendChild(deleteTodo);
    createdTodo.classList.remove("done-todo");

    if (theme === 1) {
      createdTodo.classList.add(
        "created-todo",
        "uncompleted",
        "change-task-theme"
      );
    } else {
      createdTodo.classList.add("created-todo", "uncompleted");
    }

    if (addedTasks.includes(createdTodo.textContent.trim()) === false) {
      addedTasks.push(createTodo);
      unCompletedTasks.push(createdTodo);

      todoList.appendChild(createdTodo);
    }
    createTodo.value = "";

    allTasks = unCompletedTasks.length + completedTasks.length;
    tasksCounter.textContent = allTasks;

    // Styling with classess

    // Done todo
    createdTodo.addEventListener("click", () => {
      if (!createdTodo.classList.contains("done-todo")) {
        completedTasks.push(createdTodo);
        createdTodo.firstChild.firstChild.classList.add("show-check");
      } else {
        completedTasks.pop(createdTodo);
        createdTodo.firstChild.firstChild.classList.remove("show-check");
      }

      if (!createdTodo.classList.contains("uncompleted")) {
        unCompletedTasks.push(createdTodo);
      } else {
        unCompletedTasks.pop(createdTodo);
      }

      createdTodo.classList.toggle("uncompleted");

      if (theme === 1) {
        createdTodo.classList.toggle("done-todo");
        createdTodo.classList.toggle("done-todo-change-theme");
      } else {
        createdTodo.classList.toggle("done-todo");
        createdTodo.classList.toggle("done-todo-change-theme");
      }

      createdTodo.firstElementChild.classList.toggle("fill");
    });

    // Deleted todo
    deleteTodo.addEventListener("click", () => {
      addedTasks.pop(createdTodo);

      createdTodo.classList.add("deleted-task");

      setTimeout(() => {
        tasksCounter.textContent = addedTasks.length;
        createdTodo.classList.add("hidden");

        setTimeout(() => {
          createdTodo.remove();
        }, 1500);
      }, 400);

      setTimeout(() => {
        if (addedTasks.length <= 0) {
          tasksListPanel.classList.add("hidden");
          tasksNavigation.classList.add("hidden");
        }
      }, 750);
    });
  }
});

// Clearing completed tasks
let flag = 0;

const clearCompleted = document.querySelector(".clear-completed");
clearCompleted.addEventListener("click", () => {
  flag = 1;

  document.querySelectorAll(".done-todo").forEach((todo) => {
    completedTasks.splice(todo, 1);
    todo.classList.add("change-visiblity");

    if (flag2 === 1) {
      completedTasks.length = 0;
      tasksCounter.textContent = completedTasks.length;
    }

    setTimeout(() => {
      tasksCounter.textContent = unCompletedTasks.length;
      if (flag2 === 1) {
        tasksCounter.textContent = completedTasks.length;
      }
      todoList.removeChild(todo);
    }, 300);
  });
});

// Tasks Navigation

const tasksLinks = document.querySelectorAll(".task__link");

for (let link of tasksLinks) {
  link.addEventListener("click", () => {
    for (let link of tasksLinks) {
      link.classList.remove("is-active");
    }
  });
}
let flag2 = 0;
tasksLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    let currItem = e.target.value;
    e.target.classList.toggle("is-active");

    switch (currItem) {
      case "all":
        flag2 = 0;

        document.querySelectorAll(".done-todo").forEach((todo) => {
          todo.style.display = "flex";
          todo.classList.remove("change-visiblity");
        });

        document.querySelectorAll(".uncompleted").forEach((todo) => {
          todo.style.display = "flex";
          todo.classList.remove("change-visiblity");
        });

        tasksCounter.textContent = allTasks;

        if (flag === 1) {
          tasksCounter.textContent = unCompletedTasks.length;
        }

        break;

      case "active":
        flag2 = 0;

        tasksCounter.textContent = unCompletedTasks.length;

        document.querySelectorAll(".uncompleted").forEach((todo) => {
          todo.classList.remove("change-visiblity");

          setTimeout(() => {
            todo.style.display = "flex";
          }, 300);
        });

        document.querySelectorAll(".done-todo").forEach((todo) => {
          todo.classList.add("change-visiblity");

          setTimeout(() => {
            todo.style.display = "none";
          }, 300);
        });

        break;

      case "completed":
        flag2 = 1;

        tasksCounter.textContent = completedTasks.length;

        document.querySelectorAll(".done-todo").forEach((todo) => {
          todo.classList.remove("change-visiblity");

          setTimeout(() => {
            todo.style.display = "flex";
          }, 300);
        });

        document.querySelectorAll(".uncompleted").forEach((todo) => {
          todo.classList.add("change-visiblity");

          setTimeout(() => {
            todo.style.display = "none";
          }, 300);
        });

        break;

      default:
        break;
    }
  });
});

// Changing theme

const themeSwitchContainer = document.querySelectorAll(".header__theme-switch");
const moonImg = document.querySelector(".btn--moon");
const sunImg = document.querySelector(".btn--sun");

let theme = 0;
for (btn of themeSwitchContainer) {
  btn.addEventListener("click", (e) => {
    let elName = e.target.name;

    switch (elName) {
      case "moon":
        theme = 1;

        addClass();
        toggleClass();
        break;
      case "sun":
        theme = 0;

        removeClass();
        toggleClass();
        break;

      default:
        break;
    }
  });

  function toggleClass() {
    moonImg.classList.toggle("hidden");
    sunImg.classList.toggle("hidden");
  }

  function addClass() {
    // body
    document.body.classList.add("change-body-theme");

    // header
    document.querySelector(".header__img").classList.add("change-background");

    // input
    createTodo.classList.add("change-input-text-color");
    document
      .querySelector(".tasks__input-container")
      .classList.add("changeInputTheme");

    // tasks
    document.querySelectorAll(".created-todo").forEach((todo) => {
      todo.classList.add("change-task-theme");
    });

    // list panel
    document.querySelector(".list__panel").classList.add("change-panel-theme");

    // navigation
    document
      .querySelector(".tasks__navigation")
      .classList.add("change-nav-theme");
  }

  function removeClass() {
    document.body.classList.remove("change-body-theme");
    document
      .querySelector(".header__img")
      .classList.remove("change-background");
    createTodo.classList.remove("change-input-text-color");
    document
      .querySelector(".tasks__input-container")
      .classList.remove("changeInputTheme");
    document.querySelectorAll(".created-todo").forEach((todo) => {
      todo.classList.remove("change-task-theme");
    });
    document
      .querySelector(".list__panel")
      .classList.remove("change-panel-theme");
    document
      .querySelector(".tasks__navigation")
      .classList.remove("change-nav-theme");
  }
}
