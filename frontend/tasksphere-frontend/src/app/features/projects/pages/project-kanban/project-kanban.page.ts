import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'project-kanban-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-kanban.page.html',
  styleUrl: './project-kanban.page.scss',
})
export class ProjectKanbanPage implements OnInit {
  ngOnInit(): void {
    console.log('project kanban page works');
  }
}
