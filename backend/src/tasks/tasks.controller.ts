// tasks/tasks.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './update-task.dto';

@Controller('tasks')
export class TasksController {
 constructor(private readonly tasksService: TasksService) {}

 @Post()
 create(@Body() createTaskDto: CreateTaskDto) {
   return this.tasksService.create(createTaskDto);
 }

 @Get()
 findAll() {
   return this.tasksService.findAll();
 }

 @Get(':id')
 findOne(@Param('id') id: string) {
   return this.tasksService.findOne(id);
 }

 @Put(':id')
 update(@Param('id') id, @Body() updateTaskDto: UpdateTaskDto) {
   return this.tasksService.update(id, updateTaskDto);
 }

 @Delete(':id')
 delete(@Param('id') id) {
   return this.tasksService.delete(id);
 }
}
