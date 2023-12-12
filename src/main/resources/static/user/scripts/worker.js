
document.addEventListener("DOMContentLoaded", function () {
    const taskList = document.getElementById("taskList");
    const newTaskTextElement = document.getElementById("newTaskText");

    function createTaskElement(taskText, isChecked) {
        const taskElement = document.createElement("li");
        taskElement.className = "task";
        taskElement.innerHTML = `
                <input type="checkbox" ${isChecked ? 'checked' : ''}>
                <span>${taskText}</span>
                <button onclick="editTask(this)">Edit</button>
                <button onclick="deleteTask(this)">Delete</button>
            `;
        return taskElement;
    }

    window.addTask = async function () {
        const newTaskText = newTaskTextElement.value.trim();
        if (newTaskText !== "") {
            const isChecked = false; // Новая задача всегда не выполнена
            const taskElement = createTaskElement(newTaskText, isChecked);
            taskList.appendChild(taskElement);
            newTaskTextElement.value = "";

            // отправляем содержимое task на сервер
            try {
                const currentUrl = window.location.href;
                const newUrl = `${currentUrl}/new-task`;

                const response = await fetch(newUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded', // изменено на форму
                    },
                    body: `taskContent=${encodeURIComponent(newTaskText)}`, // изменено на форму
                });

                if (response.ok) {
                    // Ваш код обработки успешного ответа (если необходимо)
                    console.log("OK post");
                } else {
                    // Ваш код обработки ошибки
                    console.error('Failed to add task');
                }
            } catch (error) {
                console.error('Error during POST request:', error);
            }
        }
    };

    window.editTask = async function (button) {
        const taskElement = button.parentElement;
        const taskText = taskElement.querySelector("span").innerText;
        const newText = prompt("Edit task:", taskText);
        if (newText !== null) {
            taskElement.querySelector("span").innerText = newText;

            // запрос на сервер для изменения таски
            try {
                const currentUrl = window.location.href;

                const updateUrl = `${currentUrl}/edit-task`;
                console.log(updateUrl);

                const formData = new FormData();
                formData.append('taskNewContent', newText);
                formData.append('taskOldContent', taskText);

                const response = await fetch(updateUrl, {
                    method: 'PATCH',
                    body: formData,
                });

                if (response.ok) {
                    // Your code for a successful update
                    console.log("OK patch");
                } else {
                    // Your code for handling errors
                    console.error('Failed to update task');
                }
            } catch (error) {
                console.error('Error during PATCH request:', error);
            }
        }
    };

    window.deleteTask = async function (button) {
        const taskElement = button.parentElement;
        const taskText = taskElement.querySelector("span").innerText;
        taskList.removeChild(taskElement);
        // запрос на сервер для изменения таски
        try {
            const currentUrl = window.location.href;

            const updateUrl = `${currentUrl}/delete-task/${taskText}`;
            console.log(updateUrl);

            const response = await fetch(updateUrl, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Your code for a successful delete
                console.log("OK delete");
            } else {
                // Your code for handling errors
                console.error('Failed to delete task');
            }
        } catch (error) {
            console.error('Error during DELETE request:', error);
        }
    };
});


function redirectToSignIn() {
    // Получаем текущий путь
    var currentPath = window.location.pathname;
    console.log(currentPath);
    // Добавляем "/signup" к текущему пути и переносимся на уровень вверх (..)
    var loginPath = currentPath.replace(/\/user\/\d+/, "/login");
    console.log(loginPath);
    // Перенаправляем пользователя
    window.location.href =loginPath;
}


