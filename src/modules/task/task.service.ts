import { Body, Injectable } from "@nestjs/common";
import { CreateTaskDto } from "src/dtos/createTask.dto";

@Injectable()
export class TaskService{

    async getAllTasks() {

    }

    async getTaskById(id){
        
    }

    async createNewTask(@Body() createTaskDto: CreateTaskDto){

    }

    async deleteTask(id){

    }

    async updateTask(id){
        
    }
}