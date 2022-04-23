<template>
  <v-flex d-flex flex-wrap align-center justify-space-between class="partners_wrapper">
    <img loading="lazy" v-for="(partner, index) in partners" :key="index" :src="partner.image" :alt="partner.name" class="mx-2" />
  </v-flex>
</template>

<script>
export default {

  data() {
    return {
      partners: [
        {
          name: 'one',
          image: require('./../../../public//assets/images/partners/one.svg')
        },
        {
          name: 'adidas',
          image: require('./../../../public//assets/images/partners/adidas.svg')
        },
        {
          name: 'fifa',
          image: require('./../../../public//assets/images/partners/fifa.svg')
        },
        {
          name: 'adidas',
          image: require('./../../../public//assets/images/partners/adidas.svg')
        },
      ]
    };
  }

}
</script>

<style scoped lang="scss">

  .partners_wrapper {
    width: 100%;
    height: 100%;
    flex: 1 1 0px;

    img {
      transform: scale(.8);
    }
  }

</style>