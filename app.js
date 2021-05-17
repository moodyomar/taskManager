window.onload = () => {
     init();
}
// declarations n EventListeners
const init = () => {
     const tskName = document.querySelector('#taskNameInput');
     const tskTime = document.querySelector('#taskTimeInput');
     const addTskBtn = document.querySelector('#addTaskBtn');
     const clearBtn = document.querySelector('#clearBtn');
     const delTsksBtn = document.querySelector('#deleteTasksBtn');
     const showCompleted = document.querySelector('#completedTasks');
     const tsksList = document.querySelector('#tasksList');
     const storedTasks = localStorage.getItem('task')
     // Even Listeners
     addTskBtn.addEventListener('click', (e) => {
          e.preventDefault();
          checkValidation(tskName, tskTime, tsksList, storedTasks);
     })
     delTsksBtn.addEventListener('click', (e) => {
          e.preventDefault();
          deleteTasks(tsksList);
     })
     clearBtn.addEventListener('click', (e) => {
          e.preventDefault();
          clearTasks(tskName, tskTime);
     })
     showCompleted.addEventListener('click', (e) => {
          e.preventDefault();
          showCompletedTasks(tsksList);
     })

     if (storedTasks) {
          tsksList.innerHTML = storedTasks
          let tsksListChildren = tsksList.children;
          for (let child of tsksListChildren) {
               if (child.classList.contains('done')) {
                    child.style.visibility = 'hidden'
               }
          }
     }
}

// functions
const checkValidation = (task, time, tasksList) => {
     if (task.value == '' || time.value === '') {
          alert('Please fill in a Task and Time before adding !')
     } else {
          addTask(task, time, tasksList)
     }
}

const addTask = (task, time, tasksList) => {
     let tpp = 'this.parentNode.parentNode'
     let taskNtime = `
     <div class="row row-cols-3 tsk">
     <div class="col-md-6">
          <h2>${task.value}</h2>
          </div>
          <div class="col-md-3">
          <h2>${time.value}</h2>
          </div>
          <div class="col-md-3">
          <button class="btnX btn btn-danger " onclick="deleteSelectedTask(${tpp})"><i class="fas fa-trash"></i></button>
          <button class="btnV btn btn-success " onclick="markDoneSelectedTask(${tpp})"><i class="fas fa-check"></i></button>
          </div>
     </div>
     </div>
     `;
     tasksList.innerHTML += taskNtime;
     saveToLocalStorage(tasksList.innerHTML);
     task
     task.value = ''
     time.value = ''
     task.focus()
}

const saveToLocalStorage = tasksListHtml => {
     localStorage.setItem('task', tasksListHtml)
}

const clearTasks = (task, time) => {
     task.value = '';
     time.value = '';
     task.focus();
}

const deleteTasks = tasks => {
     tasks.innerHTML = '';
     // if I want to delete the stored data aswell
     localStorage.setItem('task', '')
}

const deleteSelectedTask = selectedTasktoDelete => {
     selectedTasktoDelete.classList.add('fall')
     setTimeout(() => {
          selectedTasktoDelete.remove();
     }, 300);
     let taskNtime = selectedTasktoDelete.parentNode.innerHTML;
     saveToLocalStorage(taskNtime)
}

const markDoneSelectedTask = selectedTasktoDone => {
     selectedTasktoDone.classList.toggle('done')
     setTimeout(() => {
          selectedTasktoDone.style.visibility = 'hidden';
     }, 300)
     let taskNtime = selectedTasktoDone.parentNode.innerHTML;
     saveToLocalStorage(taskNtime)
}

const showCompletedTasks = tasksList => {
     let completedTasks = tasksList.children;
     for (let eachTask of completedTasks) {
          if (eachTask.classList.contains('done')) {
               eachTask.style.visibility = 'visible';
          }
     }
}