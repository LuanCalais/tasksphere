import { TaskStatus } from '@core/models/task/enums';

export const HOME_PAGE_BANNERS = Object.freeze([
  { src: 'core-images/banners/banner-1.png', alt: 'Banner 1' },
  { src: 'core-images/banners/banner-2.png', alt: 'Banner 2' },
  { src: 'core-images/banners/banner-3.png', alt: 'Banner 3' },
]);

export const AVATAR_DEFAULT_IMAGE = Object.freeze({
  src: 'core-images/profile/avatar-default.png',
});

export const DEFAULT_COLORS = Object.freeze([
  '#3B82F6',
  '#10B981',
  '#F59E0B',
  '#EF4444',
  '#8B5CF6',
  '#EC4899',
  '#06B6D4',
  '#F97316',
]);

export const TASK_STATUS_DEFINITION = Object.freeze({
  [TaskStatus.TODO]: {
    label: 'Não iniciado',
    value: 'TODO',
    class: 'task-todo',
  },
  [TaskStatus.IN_PROGRESS]: {
    label: 'Em progresso',
    value: 'IN_PROGRESS',
    class: 'task-in-progress',
    color: 'var(--color-information)',
    background: 'var(--color-information-variant)',
  },
  [TaskStatus.DONE]: {
    label: 'Concluído',
    value: 'DONE',
    class: 'task-done',
  },
});
