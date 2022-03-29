<template>
  <div>
    <div class="partners-all">
      <span class="partners">נושאי לימוד</span> <br />
      <span class="partners-background">נושאי לימוד</span> <br />
      <div class="content-divider"></div>

      <p>Lorem, ipsum dolor</p>
      <div class="topics-container">
        <div class="topics" v-for="topic in topics" :key="topic.id">
          <Topic :topic-title="topic.title" :topic-subtitle="topic.subtitle" />
        </div>
      </div>
      <a href=""><Button /></a>
    </div>
  </div>
</template>

<script>
import Button from "./Topics/Button.vue";
import Topic from "./Topics/Topic.vue";
export default {
  name: "Topics",
  components: { Topic, Button },
  data: () => ({
    topics: [
      {
        id: 0,
        title: "כדורגל בסיסי",
        subtitle: "עצירת כדור",
        level: "Beginner",
      },
      { id: 1, title: "כדורגל מתקדם", subtitle: "פס והרמה", level: "Beginner" },
      {
        id: 2,
        title: "כדורגל בסיסי",
        subtitle: "יציאה מהמקום",
        level: "Beginner",
      },
      {
        id: 3,
        title: "כדורגל מתקדם",
        subtitle: "בעיטה לשער",
        level: "Beginner",
      },
    ],
  }),
};
</script>
<style scoped>
.topics {
  display: flex;
  justify-content: center;
  position: relative;
  bottom: 8em;
}

.topics-container {
  margin-right: auto;
  margin-left: auto;

  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.partners {
  /* border: 1px solid red; */
  /* font-family: "Arimo"; */
  font-style: normal;
  font-weight: 600;
  font-size: 65px;
  line-height: 90px;
}

span:nth-of-type(2) {
  position: relative;
  bottom: 0.9em;
  font-family: "Arimo";
  font-style: normal;
  font-weight: 700;
  font-size: 169.749px;
  line-height: 219px;
  /* or 129% */

  /* text-align: center; */
  letter-spacing: -4.84996px;

  /* grey */

  color: #31353d;

  opacity: 0.05;
}

.partners-background {
  /* Our Products */

  width: 10em;
  height: 1em;

  /* font-family: "Arimo"; */
  font-style: normal;
  font-weight: 700;
  font-size: 10.5em;
  line-height: 219px;
  /* or 129% */

  text-align: center;
  letter-spacing: -4.84996px;

  /* grey */

  color: #31353d;

  opacity: 0.08;
}

.content-divider {
  margin-top: -11em;
  margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
  padding-left: 10px;
  width: 53px;
  height: 4px;

  /* brand */

  background: #16588f;
}

p {
  font-style: normal;
  font-size: 169.749px;
  line-height: 219px;
  font-size: 1.5em;
  position: relative;
  bottom: 2em;
}
</style>