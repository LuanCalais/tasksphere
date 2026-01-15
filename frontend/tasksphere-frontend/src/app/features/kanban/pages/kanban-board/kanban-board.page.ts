import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kanban-board-page',
  standalone: true,
  templateUrl: './kanban-board.page.html',
  styleUrl: './kanban-board.page.scss',
  imports: [],
})
export class KanbanBoardPage implements OnInit {
  ngOnInit(): void {
    console.log('Kanban Board Page Initialized');
  }
}
