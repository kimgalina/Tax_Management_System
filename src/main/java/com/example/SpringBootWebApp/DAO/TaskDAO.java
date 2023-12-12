package com.example.SpringBootWebApp.DAO;

import com.example.SpringBootWebApp.Models.Task;
import com.example.SpringBootWebApp.Models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;

import java.util.ArrayList;
import java.util.List;

@Component
public class TaskDAO {
    private static final List<Task> db = new ArrayList<>();
    @Autowired
    private UserDAO userDAO;
    public void addTask(Task task) {
        db.add(task);
        System.out.println("added task to " + userDAO.getUserDB().get(task.getUserId()).getFirstName());
    }

    // метод возвращает все таски конкретного пользователя
    public static List<Task> getTasksByUser(int userId) {
        List<Task> usersTask = new ArrayList<>();
        for(Task task : db) {
            if(task.getUserId() == userId) {
                usersTask.add(task);
            }
        }
        return usersTask;
    }
    public void editTaskContentByUser(int userId, String oldTaskContent, String newTaskContent) {
        List<Task> usersTask = getTasksByUser(userId);
        for(Task task : usersTask) {
            if(task.getTaskContent().equals(oldTaskContent)) {
                task.setTaskContent(newTaskContent);
            }
        }
    }

    public void deleteUserTask(int userId, String taskContent) {
        for(Task task : db) {
            if(task.getTaskContent().equals(taskContent) && task.getUserId() == userId) {
                db.remove(task);
                break;
            }
        }
    }


}
