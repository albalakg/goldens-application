<template class="template">
  <div class="container">
    <div>
      <h2>שאלות <span>נפוצות</span></h2>
      <div
        class="questions-container"
        v-for="question in questions"
        :key="question.id"
      >
        <div class="question-item">
          <span>{{ question.text }}</span>

          <span>לורם איפסום דולור?</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "CommonQuestions",
  data: () => ({
    questions: [
      {
        id: 0,
        title: "לורם איפסום",
        text: "לורם איפסום דולור?,לורם איפסום דולור",
      },
      { id: 1, title: "לורם איפסום", text: "לורם איפסום דולור?" },
      { id: 2, title: "לורם איפסום", text: "לורם איפסום דולור?" },
      { id: 3, title: "לורם איפסום", text: "לורם איפסום דולור?" },
      { id: 4, title: "לורם איפסום", text: "לורם איפסום דולור?" },
      { id: 5, title: "לורם איפסום", text: "לורם איפסום דולור?" },
    ],
  }),
};
</script>
<style scoped>
.question-item {
  width: 50vw;
  height: 62px;
  background: #ffffff;
  border-radius: 4px;
  margin-bottom: 14px;
  display: flex;
}
h2 {
  font-size: 1.8vw;
  margin-top: 4em;
  margin-bottom: 1em;
  color: white;
}

span {
  font-size: 1.8vw;
  color: rgb(230, 178, 96);
}
.container {
  text-align: center;
  background-color: #1c3f64;
  height: 90vh;
  width: 100%;
  display: flex;
  justify-content: center;
}

.questions-container {
  width: 70vw;
  display: flex;
  justify-content: center;
}
</style>