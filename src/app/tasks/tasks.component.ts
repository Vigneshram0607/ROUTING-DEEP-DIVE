import { Component, computed, inject, input, OnInit } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent,RouterLink],
})
export class TasksComponent implements OnInit{
  userId = input.required<string>();
  order = input<'asc' | 'desc'>(); //extracting query params via signals
  private taskService = inject(TasksService);
  userTasks = computed(()=>this.taskService.allTasks().filter((task)=> task.userId === this.userId()).sort((a,b)=>{
    if(this.order() == 'desc'){
      return a.id > b.id ? -1 :1;
    }else{
      return a.id > b.id ? 1 :-1;
    }
  }))

  private activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    console.log('ACTIVATED-ROUTE: ',this.activatedRoute)
    console.log('ACTIVATED-ROUTE-SNAPSHOT: ',this.activatedRoute.snapshot);
    
  }
}

export const resolveUserTasks: ResolveFn<any> = (activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot)=>{
  const tasksService = inject(TasksService);
  return  tasksService.allTasks();
}
