import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';
import { DUMMY_USERS } from '../../../dummy-users';
import { UsersService } from '../users.service';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterOutlet, RouterStateSnapshot } from '@angular/router';
import { User } from '../user/user.model';
import { TasksService } from '../../tasks/tasks.service';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent  {
  userName = input.required<string>();
  // userName = computed(() => this.userService.users.find(u => u.id === this.userId())?.name);

  message = input.required<string>();

}

export const resolveUserName:ResolveFn<string> = (activatedRoute: ActivatedRouteSnapshot,routerState: RouterStateSnapshot)=>{
  const usersService = inject(UsersService);
  const userName = usersService.users.find((u)=>u.id === activatedRoute.paramMap.get('userId'))?.name || ''
  return userName;
};

export const resolveTitle: ResolveFn<string> = (activatedRoute, routerState) =>{
  return resolveUserName(activatedRoute, routerState)+'\'s Tasks'
}