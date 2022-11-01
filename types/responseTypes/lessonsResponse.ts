type LessonsResData = {
  type: 'all' | 'count' | 'single' | 'lesson' | 'error';
  data: string | number | string[];
}

export default LessonsResData