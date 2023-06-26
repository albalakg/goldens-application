import store from "../store";

const MAX_LESSON_CONTENT_CHARS          = 120;
export const SCHEDULE_LESSON_TYPE_ID    = 1;
export const SCHEDULE_TRAINING_TYPE_ID  = 2;

class ContentService {
  findMyActiveCourse() {
    try {
      const courses = store.state["UserState"].courses;
      if (!courses) {
        return null;
      }

      return courses[0];
    } catch (err) {
      error(err);
      return null;
    }
  }

  findCourseById(courseId) {
    try {
      let courses = store.state["UserState"].courses;
      if (courses && store.getters["UserState/hasActiveCourse"]) {
        let course = courses.find((course) => course.id == courseId);
        if (course) {
          return course;
        }
      }

      courses = store.state["ContentState"].courses;
      if (courses) {
        return courses.find((course) => course.id == courseId);
      }

      return null;
    } catch (err) {
      error(err);
      return null;
    }
  }

  findCourseAreaById(courseAreaId) {
    try {
      let courses = store.state["UserState"].courses;
      if (!courses || !courses.length) {
        courses = store.state["ContentState"].courses;
      }

      for (let index = 0; index < courses.length; index++) {
        const course = courses[index];
        return course.active_areas_with_active_lessons.find(
          (courseArea) => courseArea.id == courseAreaId
        );
      }
    } catch (err) {
      error(err);
      return {};
    }
  }

  findTrainerByCourseAreaId(courseAreaId) {
    try {
      const courseArea = this.findCourseAreaById(courseAreaId);
      if (!courseArea) {
        return {};
      }

      return courseArea.trainer;
    } catch (err) {
      error(err);
      return {};
    }
  }

  findLessonById(lessonId) {
    try {
      let courses = store.state["UserState"].courses;
      let foundLesson = null;

      if (!courses) {
        courses = store.state["ContentState"].courses;
      }

      if (!courses) {
        return null;
      }

      for (let courseIndex = 0; courseIndex < courses.length; courseIndex++) {
        const course = courses[courseIndex];

        for (
          let courseAreaIndex = 0;
          courseAreaIndex < course.active_areas_with_active_lessons.length;
          courseAreaIndex++
        ) {
          if (foundLesson) {
            break;
          }

          const courseArea = course.active_areas_with_active_lessons[courseAreaIndex];
          foundLesson = courseArea.active_lessons.find(
            (lesson) => lesson.id == lessonId
          );
        }
      }

      if (foundLesson) {
        foundLesson.progress = this.getLessonProgressById(foundLesson.id);
      }

      return foundLesson;
    } catch (err) {
      error(err);
      return null;
    }
  }

  getLessonProgressById(lessonId) {
    try {
      let userCourses = store.state["UserState"].progress;
      if (!userCourses) {
        return null;
      }

      for (
        let courseIndex = 0;
        courseIndex < userCourses.length;
        courseIndex++
      ) {
        const userCourse = userCourses[courseIndex];
        return userCourse.lessons_progress.find(
          (lesson) => lesson.course_lesson_id == lessonId
        );
      }
    } catch (err) {
      error(err);
      return null;
    }
  }

  getCourseAreaProgressById(courseAreaId) {
    try {
      const lessons = this.getLessonsByCourseAreaId(courseAreaId);
      let totalSecondsWatched = 0;
      let totalSeconds = this.countTotalCourseAreaDuration(courseAreaId);
      lessons.forEach((lesson) => {
        const progress = lesson.progress ? lesson.progress.progress : 0;
        const totalLength = lesson.video.video_length;
        totalSecondsWatched += (progress / 100) * totalLength;
      });
      return (totalSecondsWatched * 100) / totalSeconds;
    } catch (err) {
      error(err);
      return 0;
    }
  }

  getCourseAreasByCourseId(courseId) {
    try {
      const course = this.findCourseById(courseId);
      return course.active_areas_with_active_lessons;
    } catch (err) {
      error(err);
      return [];
    }
  }

  getLessonsByCourseAreaId(courseAreaId) {
    try {
      const courseArea = this.findCourseAreaById(courseAreaId);
      courseArea.active_lessons.forEach((lesson) => {
        lesson.progress = this.getLessonProgressById(lesson.id);
      });
      return courseArea.active_lessons.sort((a, b) => {
        return this.sortByColumn("view_order", a, b);
      });
    } catch (err) {
      error(err);
      return [];
    }
  }

  getLessonsByCourseId(courseId) {
    try {
      const course = this.findCourseById(courseId);
      let lessons = [];
      course.active_areas_with_active_lessons.forEach((courseArea) => {
        lessons = lessons.concat(courseArea.active_lessons);
      });

      return lessons.sort((a, b) => {
        return this.sortByColumn("view_order", a, b);
      });
    } catch (err) {
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
        },
        0
      );
    } catch (err) {
      error(err);
      return 0;
    }
  }

  countTotalCourseAreasByCourseId(courseId) {
    try {
      const course = this.findCourseById(courseId);
      return course.active_areas_with_active_lessons.length;
    } catch (err) {
      error(err);
      return 0;
    }
  }

  countTotalCourseAreaDuration(courseAreaId) {
    try {
      const courseArea = this.findCourseAreaById(courseAreaId);
      return courseArea.active_lessons.reduce((previousValue, currentValue) => {
        return Number(previousValue) + Number(currentValue.video.video_length);
      }, 0);
    } catch (err) {
      error(err);
      return 0;
    }
  }

  countTotalCourseDuration(courseId) {
    try {
      const course = this.findCourseById(courseId);
      let totalDuration = 0;

      if (!course) {
        return totalDuration;
      }

      course.active_areas_with_active_lessons.forEach((courseArea) => {
        totalDuration += this.countTotalCourseAreaDuration(courseArea.id);
      });

      return totalDuration;
    } catch (err) {
      error(err);
      return 0;
    }
  }

  getLessonShortDescription(lesson, maxChars = MAX_LESSON_CONTENT_CHARS) {
    try {
      return lesson.description.length < maxChars
        ? lesson.description
        : lesson.description.slice(0, maxChars) + "...";
    } catch (err) {
      error(err);
      return "";
    }
  }

  isLessonCompleted(lessonId) {
    try {
      const userCourses = store.getters["UserState/progress"];

      if (!userCourses) {
        return false;
      }

      for (
        let courseIndex = 0;
        courseIndex < userCourses.length;
        courseIndex++
      ) {
        const userCourse = userCourses[courseIndex];

        for (
          let lessonIndex = 0;
          lessonIndex < userCourse.lessons_progress.length;
          lessonIndex++
        ) {
          const userLesson = userCourse.lessons_progress[lessonIndex];
          if (userLesson.course_lesson_id === lessonId) {
            return userLesson.progress === 100;
          }
        }
      }

      return false;
    } catch (err) {
      error(err);
      return false;
    }
  }

  isLessonFavorite(lessonId) {
    const userFavoriteLessons = store.getters["UserState/favorites"];
    return (
      userFavoriteLessons.findIndex((lesson) => lesson.id === lessonId) !== -1
    );
  }

  getTimeTextBySeconds(seconds, withText = true) {
    try {
      seconds = Number(seconds);
      const minutes = Math.floor(seconds / 60);
      if (minutes < 1) {
        return Math.floor(seconds) + (withText ? " שניות" : "");
      }

      const hours = Math.floor(minutes / 60);
      if (hours < 1) {
        return minutes + (withText ? " דקות" : "");
      }

      let leftMinutes = Math.floor(minutes - hours * 60);
      if (String(leftMinutes).length === 1) {
        leftMinutes = "0" + leftMinutes;
      }
      return `${hours}:${leftMinutes}` + (withText ? " שעות" : "");
    } catch (err) {
      error(err);
      return 0 + (withText ? " שניות" : "");
    }
  }

  getLessonTimeFormat(seconds) {
    try {
      seconds = Number(seconds);
      let minutes = Math.floor(seconds / 60);
      let leftSeconds = Math.floor(seconds - minutes * 60);

      if (String(minutes).length === 1) {
        minutes = "0" + minutes;
      }

      if (String(leftSeconds).length === 1) {
        leftSeconds = "0" + leftSeconds;
      }

      return `${minutes}:${leftSeconds}`;
    } catch (err) {
      error(err);
      return "00:00";
    }
  }

  getExpiredDate() {
    const yearFromNow = new Date(
      new Date().setFullYear(new Date().getFullYear() + 1)
    );
    let year = String(yearFromNow.getFullYear()).substring(2, 4);
    let month = String(yearFromNow.getMonth());
    let day = String(yearFromNow.getDate());

    if (day.length === 1) {
      day = `0${day}`;
    }

    if (month.length === 1) {
      month = `0${month}`;
    }

    return `${day}.${month}.${year}`;
  }

  sortByColumn(column, a, b) {
    if (a[column] < b[column]) {
      return -1;
    }
    if (a[column] > b[column]) {
      return 1;
    }
    return 0;
  }
}

export default new ContentService();
