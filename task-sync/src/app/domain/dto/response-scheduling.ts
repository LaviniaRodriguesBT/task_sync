import { Task } from "../model/task.model";
import { User } from "../model/user.model";
import { Event } from "../model/event.model";
export interface ResponseScheduling {
    id: string;
    event: Event,
    user: User,
    task: Task,
    value: string,
    start_time: string,
    end_time: string,
    date: string,
    status: string,
}