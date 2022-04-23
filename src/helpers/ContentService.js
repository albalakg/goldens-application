import store from '../store'

class ContentService {
  
  findCourseById(courseId) {
    return store.state['UserState'].courses.find(course => course.id == courseId);
  }

  findCourseAreaById(courseAreaId) {
    try {
      for(let index = 0; index < store.state['UserState'].courses.length; index++) {
        const course = store.state['UserState'].courses[index];
        return course.active_areas_with_active_lessons.find(courseArea => courseArea.id == courseAreaId);
      }
    } catch(err) {
      console.warn(err);
      return {};
    }
  }

  findLessonById(lessonId) {
    try {
      for(let courseIndex = 0; courseIndex < store.state['UserState'].courses.length; courseIndex++) {
        const course = store.state['UserState'].courses[courseIndex];
  
        for(let courseAreaIndex = 0; courseAreaIndex < course.active_areas_with_active_lessons.length; courseAreaIndex++) {
          const courseArea = course.active_areas_with_active_lessons[courseAreaIndex];
          return courseArea.active_lessons.find(lesson => lesson.id == lessonId);
        }
      }
    } catch(err) {
      console.warn(err);
      return {};
    }
  }

  getLessonsByCourseAreaId(courseAreaId) {
    try {
      const courseArea = this.findCourseAreaById(courseAreaId);
      return courseArea.active_lessons;
    } catch(err) {
      console.warn(err);
      return [];
    }
  }
  
  getLessonsByCourseId(courseId) {
    try {
      const course = this.findCourseById(courseId);
      let lessons = [];
      course.active_areas_with_active_lessons.forEach(courseArea => {
        lessons = lessons.concat(courseArea.active_lessons);
      });

      return lessons;
    } catch(err) {
      console.warn(err);
      return [];
    }
  }

  countTotalLessonsByCourseId(courseId) {
    try {
      const course = this.findCourseById(courseId);
      return course.active_areas_with_active_lessons.reduce(
        (previousValue, currentValue) => {
          return previousValue + currentValue.active_lessons.length;
        }, 0
      )
    } catch(err) {
      console.warn(err);
      return 0;
    }
  }

  countTotalCourseAreasByCourseId(courseId) {
    try {
      const course = this.findCourseById(courseId);
      return course.active_areas_with_active_lessons.length;
    } catch(err) {
      console.warn(err);
      return 0;
    }
  }
}

export default new ContentService();
