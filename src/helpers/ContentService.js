import store from '../store'

const MAX_LESSON_CONTENT_CHARS = 120;

class ContentService {

  findMyActiveCourse() {
    try {
      const courses = store.state['UserState'].courses;
      if(!courses) {
        return null;
      }
      
      return courses[0];
    } catch(err) {
      error(err);
      return null;
    }
  }
  
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
      error(err);
      return null;
    }
  }

  findCourseAreaById(courseAreaId) {
    try {
      let courses = store.state['UserState'].courses;
      if(!courses || !courses.length) {
        courses = store.state['ContentState'].courses;
      }

      for(let index = 0; index < courses.length; index++) {
        const course = courses[index];
        return course.active_areas_with_active_lessons.find(courseArea => courseArea.id == courseAreaId);
      }
    } catch(err) {
      error(err);
      return {};
    }
  }

  findLessonById(lessonId) {
    try {
      let courses = store.state['UserState'].courses;
      let foundLesson  = null;

      if(!courses) {
        courses = store.state['ContentState'].courses;
      }

      for(let courseIndex = 0; courseIndex < courses.length; courseIndex++) {
        const course = courses[courseIndex];
  
        for(let courseAreaIndex = 0; courseAreaIndex < course.active_areas_with_active_lessons.length; courseAreaIndex++) {
          if(foundLesson) {
            break;
          }

          const courseArea = course.active_areas_with_active_lessons[courseAreaIndex];
          foundLesson = courseArea.active_lessons.find(lesson => lesson.id == lessonId);
        }
      }
      
      
      if(foundLesson) {
        foundLesson.progress = this.findLessonProgressById(foundLesson.id)
      }

      return foundLesson;
    } catch(err) {
      error(err);
      return null;
    }
  }

  findLessonProgressById(lessonId) {
    try {
      let userCourses = store.state['UserState'].progress;
      for(let courseIndex = 0; courseIndex < userCourses.length; courseIndex++) {
        const userCourse = userCourses[courseIndex];
        return userCourse.lessons_progress.find(lesson => lesson.course_lesson_id == lessonId);
      }
    } catch (err) {
      error(err);
      return null;
    }
  }

  getCourseAreasByCourseId(courseId) {
    try {
      const course = this.findCourseById(courseId);
      return course.active_areas_with_active_lessons;
    } catch(err) {
      error(err);
      return [];
    }
  }
  

  getLessonsByCourseAreaId(courseAreaId) {
    try {
      const courseArea = this.findCourseAreaById(courseAreaId);
      courseArea.active_lessons.forEach(lesson => {
        lesson.progress = this.findLessonProgressById(lesson.id)
      });
      return courseArea.active_lessons
    } catch(err) {
      error(err);
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
      error(err);
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
      error(err);
      return 0;
    }
  }

  countTotalCourseAreasByCourseId(courseId) {
    try {
      const course = this.findCourseById(courseId);
      return course.active_areas_with_active_lessons.length;
    } catch(err) {
      error(err);
      return 0;
    }
  }

  countTotalCourseAreaDuration(courseAreaId) {
    try {
      const courseArea = this.findCourseAreaById(courseAreaId);
      return courseArea.active_lessons.reduce(
        (previousValue, currentValue) => {
          return Number(previousValue) + Number(currentValue.video.video_length);
        }, 0
      );
    } catch(err) {
      error(err);
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
      error(err);
      return 0;
    }
  }

  getLessonShortDescription(lesson, maxChars = MAX_LESSON_CONTENT_CHARS) {
    return lesson.content.length < maxChars ? lesson.content : lesson.content.slice(0, maxChars) + '...';
  }

  isLessonCompleted(lessonId) {
    try {
      const userCourses = store.getters['UserState/progress'];

      for(let courseIndex = 0; courseIndex < userCourses.length; courseIndex++) {
        const userCourse = userCourses[courseIndex];

        for(let lessonIndex = 0; lessonIndex < userCourse.lessons_progress.length; lessonIndex++) {
          const userLesson = userCourse.lessons_progress[lessonIndex];
          if(userLesson.course_lesson_id === lessonId) {
            return userLesson.progress === 100;
          }
        }
      }

      return false;
    } catch(err) {
      error(err);
      return false;
    }
  }

  isLessonFavorite(lessonId) {
    const userFavoriteLessons = store.getters['UserState/favorites'];
    return userFavoriteLessons.findIndex(lesson => lesson.id === lessonId) !== -1; 
  }

  getTimeTextBySeconds(seconds, withText = true) {
    try {
      seconds = Number(seconds);
      const minutes = Math.floor(seconds / 60);
      if(minutes < 1) {
        return Math.floor(seconds) + (withText ? ' שניות' : '');
      }

      const hours = Math.floor(minutes / 60);
      if(hours < 1) {
        return minutes + (withText ? ' דקות' : '');
      }

      let leftMinutes = Math.floor(minutes - (hours * 60));
      if(String(leftMinutes).length === 1) {
        leftMinutes = '0' + leftMinutes
      }
      return `${hours}:${leftMinutes}` +  (withText ? ' שעות' : '');
    } catch(err) {
      error(err);
      return 0 + (withText ? ' שניות' : '');
    }
  }

  getLessonTimeFormat(seconds) {
    try {
      seconds = Number(seconds);
      let minutes     = Math.floor(seconds / 60);
      let leftSeconds = Math.floor(seconds - (minutes * 60));

      if(String(minutes).length === 1) {
        minutes = '0' + minutes
      }

      if(String(leftSeconds).length === 1) {
        leftSeconds = '0' + leftSeconds
      }

      return `${minutes}:${leftSeconds}`
    } catch(err) {
      error(err);
      return '00:00';
    }
  }
}

export default new ContentService();
