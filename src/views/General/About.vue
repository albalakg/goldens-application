<template>
  <v-container fluid class="about-wrapper">
    <v-flex xs11 mx-auto class="text-center">
      <div class="about-page">
        <div class="title">
          <WhoAreWe />
        </div>
        <div class="video-player"></div>
        <div>
          <p class="p1">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Voluptatibus illo quaerat sit, eligendi alias temporibus fuga itaque
            recusandae neque quidem ipsam harum sequi, at dolores illum optio
            quasi voluptatem autem. Placeat optio numquam suscipit perspiciatis
            quam, consequuntur ratione. Deserunt quam nihil repellat aut facere?
            Ad facilis dicta asperiores nihil architecto eligendi nesciunt? Quas
            at expedita ex veritatis optio iusto assumenda! Nam, ipsa quas
            adipisci quasi voluptates voluptate voluptatum animi odit aperiam
            qui?
          </p>
          <p>
            Minus sequi inventore molestiae aliquam doloribus, suscipit numquam
            delectus, accusantium ea sint illo enim commodi ex ratione
            accusamus! Repudiandae aliquid quibusdam possimus non rerum dolorum
            alias libero qui cupiditate. Debitis veritatis dolorem voluptates
            ullam doloremque consectetur facilis ad ea rem ipsum nesciunt unde
            eveniet laborum, architecto amet cumque!
          </p>
        </div>
        <div class="coaches-container">
          <CoachesTitle class="coaches-title" />
          <Coaches />
        </div>
        <div class="believer-section">
          <div>
            <BelieverTitle class="believer-title" />
            <div class="believer-topic">
              <h4>אמינות</h4>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Repellat expedita eos cupiditate necessitatibus quas impedit
                saepe illum nihil ratione nemo ex commodi molestias porro, modi
                ad dolor et unde officiis.
              </p>
            </div>
            <div class="believer-topic">
              <h4>מקצועיות</h4>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Repellat expedita eos cupiditate necessitatibus quas impedit
                saepe illum nihil ratione nemo ex commodi molestias porro, modi
                ad dolor et unde officiis.
              </p>
            </div>
            <div class="believer-topic">
              <h4>גישה <span>חדשנית</span></h4>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Repellat expedita eos cupiditate necessitatibus quas impedit
                saepe illum nihil ratione nemo ex commodi molestias porro, modi
                ad dolor et unde officiis.
              </p>
            </div>
          </div>
        </div>
        <div class="support-form-container">
          <SupportForm class="support-form" />
        </div>
      </div>
    </v-flex>
  </v-container>
</template>

<script>
import WhoAreWe from "../../components/About/WhoAreWe.vue";
import CoachesTitle from "../../components/Titles/CoachesTitle.vue";
import Coaches from "../../components/HomePage/Coaches.vue";
import BelieverTitle from "../../components/Titles/BelieverTitle.vue";
import SupportForm from "../../components/Form/SupportForm.vue";

export default {
  components: {
    WhoAreWe,
    CoachesTitle,
    Coaches,
    BelieverTitle,
    SupportForm,
  },
  data() {
    return {};
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Arimo&display=swap");

.about-wrapper {
  width: 100.5vw;
  height: 370vh;
  background: #102a46;
}

.title {
  margin-top: 5em;
  margin-right: 10em;
}

.about-page {
  display: flex;
  flex-direction: column;
}

.video-player {
  border-radius: 25px;

  width: 62.4vw;
  height: 67.5vh;
  margin-left: auto;
  margin-right: auto;
  background-image: url("../../../public/assets/images/About Page/Videoplayer_Placeholder(temp).png");
  background-size: cover;
  margin-bottom: 5em;
}

p {
  margin-left: auto;
  margin-right: auto;
  width: 50vw;
  font-family: "Arimo";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  /* or 117% */

  white-space: pre-wrap;

  text-align: right;

  color: #ffffff;

  /* 1 */

  text-shadow: 0px 20px 48.5714px rgba(49, 54, 62);
}

.partners-all {
  margin-top: 3em;
}

.partners {
  /* font-family: "Arimo"; */
  font-style: normal;
  font-weight: 600;
  font-size: 65px;
  line-height: 90px;
  color: white;
}

.partners-background {
  letter-spacing: -4.84996px;
}

#background-title {
  color: white;
}

.coaches-container {
  margin-bottom: -10em;
}

.coaches-title .content-divider {
  /* brand */

  background-color: #e6b260;
}

.believer-title {
  margin-top: 8em;
}

.believer-section {
  background-image: url("../../../public/assets/images/About Page/kid-believer.svg");
  background-size: 100%;
  margin-left: auto;
  margin-right: -5.5em;
  margin-bottom: 5em;
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 120vh;
  border: 2px solid yellow;
}

.believer-p {
  font-family: "Arimo";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  /* or 155% */

  text-align: center;

  /* white */
}

.believer-topic {
  margin-top: 5em;
  margin-right: 30em;

  border-right: 5px solid white;
  padding-right: 1em;
}

.believer-topic h4 {
  font-family: "Arimo";
  font-style: normal;
  font-weight: 700;
  font-size: 42.4444px;
  line-height: 33px;
  /* or 77% */

  margin-bottom: 1em;

  text-align: right;

  /* brand 2 */

  color: #e6b260;
}

.believer-topic p {
  font-family: "Arimo";
  font-style: normal;
  font-weight: 400;
  font-size: 18.8642px;
  line-height: 28px;
  /* or 146% */

  text-align: right;

  /* white */

  color: #ffffff;

  opacity: 0.7;
}

.believer-topic span {
  font-family: "Arimo";
  font-style: normal;
  font-weight: 700;
  font-size: 42.4444px;
  line-height: 33px;
  /* identical to box height, or 77% */

  text-align: right;

  /* brand 2 */

  color: white;
}

.support-form-container {
  width: 50%;
  margin-left: auto;
  margin-right: auto;
}

.main_text_color h2 {
  color: white;
}
</style>