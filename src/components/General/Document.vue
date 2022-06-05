<template>
  <svg width="27" height="29" viewBox="0 0 27 29" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.2016" y="26.9234" width="25.7208" height="24.292" rx="1.2016" transform="rotate(-90 1.2016 26.9234)" stroke="#16588F" stroke-width="2.40321"/>
    <line x1="5.08398" y1="7.69716" x2="21.6096" y2="7.69716" stroke="#16588F" stroke-width="2.40256"/>
    <line x1="8.89844" y1="14.0526" x2="21.6104" y2="14.0526" stroke="#16588F" stroke-width="2.40256"/>
    <line x1="11.4414" y1="20.41" x2="21.611" y2="20.41" stroke="#16588F" stroke-width="2.40256"/>
  </svg>
</template>

<script>
export default {

  methods: {
    submit() {
      this.$emit('submit')
    }
  }

}
</script>

<style scoped lang="scss">

</style>