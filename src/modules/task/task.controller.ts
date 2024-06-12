import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from 'src/dtos/createTask.dto';
import { UpdateTaskDto } from 'src/dtos/updateTask.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getAllTasks() {
    return this.taskService.getAllTasks();
  }

  @Get(':id')
  getTaskById(@Param('id') id: string) {
    return this.taskService.getTaskById(id);
  }

  @Post()
  createNewTask(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.createNewTask(createTaskDto);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }

  @Put(':id')
  updateTask(@Param('id') id: string, @Body() updateData: UpdateTaskDto) {
    return this.taskService.updateTask(id, updateData);
  }
}
