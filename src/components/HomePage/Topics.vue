<template>
  <div id="partners-all">
    <span id="partners">נושאי לימוד</span> <br />
    <span id="partners-background">נושאי לימוד</span> <br />
    <span></span>
    <div id="content-divider"></div>

    <p>Lorem, ipsum dolor</p>
    <div class="topics">
      <div v-for="topic in topics" :key="topic.id">
        <Topic :topic-title="topic.title" />
      </div>
    </div>

    <a href=""><Button /></a>
  </div>
</template>

<script>
import Button from "./Topics/Button.vue";
import Topic from "./Topics/Basic.vue";
export default {
  name: "Topics",
  components: { Button, Topic },
  data: () => ({
    topics: [
      { id: 0, title: "כדורגל בסיסי" },
      { id: 1, title: "כדורגל מתקדם" },
      { id: 2, title: "כדורגל בסיסי" },
      { id: 3, title: "כדורגל מתקדם" },
    ],
  }),
};
</script>
<style scoped>
#partners {
  /* font-family: "Arimo"; */
  font-style: normal;
  font-weight: 600;
  font-size: 70px;
  line-height: 90px;
}
#partners-all {
  /* Our Products */

  position: absolute;
  width: 448px;
  height: 91px;
  left: 916px;
  top: 807px;

  /* identical to box height, or 129% */

  letter-spacing: -2px;

  /* grey */

  color: #31353d;
}

#partners-background {
  /* Our Products */

  position: absolute;
  width: 10em;
  height: 1em;
  top: -0.5em;
  left: -3.7em;

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

#content-divider {
  background-color: #16588f;
  padding: 0.2rem;
  padding-left: 7em;
  position: absolute;
  left: 10.6em;
  top: 7em;
}

p {
  font-style: normal;
  font-size: 169.749px;
  line-height: 219px;
  font-size: 1.5em;
  position: relative;
  bottom: 2em;
}

#logos {
  /* border: 1px solid red; */
  display: flex;
  width: 55em;
  flex-direction: row-reverse;
  justify-content: space-around;
}

#logos-main {
  position: absolute;
  right: -15em;
}

.topics {
  position: relative;
  left: 18em;
  bottom: 5em;
  /* border: 1px solid red; */
  width: 65em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>