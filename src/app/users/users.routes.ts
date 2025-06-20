import { Routes } from "@angular/router";
import { resolveUserTasks, TasksComponent } from "../tasks/tasks.component";
import { canLeaveEditPage, NewTaskComponent } from "../tasks/new-task/new-task.component";


export const routes:Routes = [
        {
            path:'',
            redirectTo:'tasks',
            pathMatch: 'full'
        },
        { 
            path:'tasks', // <domain>/users/:userId/ tasks
            component:TasksComponent,
            runGuardsAndResolvers: 'paramsOrQueryParamsChange',
            resolve: {
                userTasks : resolveUserTasks
            }
        },
        { 
            path:'tasks/new', // <domain>/users/:userId/ tasks/new
            component:NewTaskComponent,
            canDeactivate:[canLeaveEditPage]
        },
    ]