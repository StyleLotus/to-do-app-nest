import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from 'src/dtos/createTask.dto';
import { UpdateTaskDto } from 'src/dtos/updateTask.dto';
import { Task } from 'src/entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
  ) {}

  async getAllTasks(): Promise<Task[]> {
    try {
      return await this.taskRepository.find();
    } catch (err) {
      throw new BadRequestException('No se encontraron tareas que mostrar');
    }
  }

  async getTaskById(id): Promise<Task> {
    try {
      return await this.taskRepository.findOne({ where: { id } });
    } catch (err) {
      throw new BadRequestException(`Error al buscar la tarea con el id ${id}`);
    }
  }

  async createNewTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      const { name, description } = createTaskDto;

      if (!name || !description)
        throw new BadRequestException(
          'No se paso alguno de los datos requeridos',
        );

      const taskExist = await this.taskRepository.findOne({ where: { name } });

      if (taskExist)
        throw new BadRequestException(
          'Esa tarea ya existe en la base de datos',
        );

      return await this.taskRepository.save(createTaskDto);
    } catch (err) {
      throw new BadRequestException('Error al guardar la tarea', err);
    }
  }

  async deleteTask(id) {
    try {
      const task = await this.taskRepository.findOne({ where: { id } });
      return await this.taskRepository.delete(task);
    } catch (err) {
      throw new BadRequestException('Error al borrar la tarea');
    }
  }

  async updateTask(id: string, updateData: UpdateTaskDto): Promise<Task> {
    try {
      const { name, description } = updateData;

      if (!name && !description)
        throw new BadRequestException('No se envio ni name ni descripcion ');

      const task = await this.taskRepository.findOne({ where: { id } });

      if (!task)
        throw new BadRequestException(
          `No se encontro la tarea con el id ${id}`,
        );

      Object.assign(task, updateData);

      return await this.taskRepository.save(task);
    } catch (err) {
      throw new BadRequestException(
        'No se pudo actualizar los datos de la tarea',
      );
    }
  }
}
