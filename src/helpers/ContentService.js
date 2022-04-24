import store from '../store'

class ContentService {
  
  findCourseById(courseId) {
    try {
      let courses   = store.state['UserState'].courses;
      if(courses) {
        let course  = courses.find(course => course.id == courseId);
        if(course) {
          return course;
        }
      }
         
      courses = store.state['ContentState'].courses;
      if(courses) {
        return courses.find(course => course.id == courseId);
      }

      return null;
    } catch(err) {
      console.warn(err);
      return null;
    }
  }

  findCourseAreaById(courseAreaId) {
    try {
      let courses = store.state['UserState'].courses;
      if(!courses) {
        courses = store.state['ContentState'].courses;
      }

      for(let index = 0; index < courses.length; index++) {
        const course = courses[index];
        return course.active_areas_with_active_lessons.find(courseArea => courseArea.id == courseAreaId);
      }
    } catch(err) {
      console.warn(err);
      return {};
    }
  }

  findLessonById(lessonId) {
    try {
      let courses = store.state['UserState'].courses;
      if(!courses) {
        courses = store.state['ContentState'].courses;
      }

      for(let courseIndex = 0; courseIndex < courses.length; courseIndex++) {
        const course = courses[courseIndex];
  
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

  countTotalCourseAreaDuration(courseAreaId) {
    try {
      const courseArea = this.findCourseAreaById(courseAreaId);
      return courseArea.active_lessons.reduce(
        (previousValue, currentValue) => {
          return previousValue + currentValue.video.video_length;
        }, 0
      );
    } catch(err) {
      console.warn(err);
      return 0;
    }
  }

  countTotalCourseDuration(courseId) {
    try {
      const course = this.findCourseById(courseId);
      let totalDuration = 0;
      course.active_areas_with_active_lessons.forEach(courseArea => {
        totalDuration += this.countTotalCourseAreaDuration(courseArea.id);
      });

      return totalDuration;
    } catch(err) {
      console.warn(err);
      return 0;
    }
  }

  getTimeTextBySeconds(seconds) {
    const minutes = Math.floor(seconds / 60);
    if(minutes < 1) {
        return seconds + ' שניות';
    }

    const hours = Math.floor(minutes / 60);
    if(hours < 1) {
        return minutes + ' דקות'
    }

    let leftMinutes = Math.floor(minutes - (hours * 60));
    if(String(leftMinutes).length === 1) {
        console.log('leftMinutes');
        leftMinutes = '0' + leftMinutes
    }
    return `${hours}:${leftMinutes} שעות`;
  }
}

export default new ContentService();
