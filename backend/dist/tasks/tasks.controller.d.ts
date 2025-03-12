import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './update-task.dto';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    create(createTaskDto: CreateTaskDto): Promise<import("./schemas/task.schema").Task>;
    findAll(): Promise<import("./schemas/task.schema").Task[]>;
    findOne(id: string): Promise<import("./schemas/task.schema").Task>;
    update(id: any, updateTaskDto: UpdateTaskDto): Promise<import("./schemas/task.schema").Task>;
    delete(id: any): Promise<void>;
}
