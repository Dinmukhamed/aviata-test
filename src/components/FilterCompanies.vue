<template>
  <div class="companies">
    <p class="font-weight-bold">Авиакомпании</p>
    <label class="check-wrap py-2 mb-0">
      <input class="form-check-input mt-0"
             type="checkbox"
             v-model="checkedNames"
             name="tariff"
             value="all"
             id="all"
             @change="updateFilterCompanies"
      >
      <img src="../assets/images/checkbox_active.svg" class="checked">
      <img src="../assets/images/checkbox_normal.svg" class="unchecked">
      <img src="../assets/images/checkbox_indeterminate.svg" class="checked-hover">
      <img src="../assets/images/checkbox_hover.svg" class="unchecked-hover">
      <span class="form-check-label ml-2">Все</span>
    </label>
    <label class="check-wrap py-2 mb-0" v-for="(airline, key) in airlines" :for="key" :key="key">
      <input class="form-check-input mt-0"
             type="checkbox"
             v-model="checkedNames"
             name="tariff"
             :value="key"
             :id="key"
             @change="updateFilterCompanies"
      >
      <img src="../assets/images/checkbox_active.svg" class="checked">
      <img src="../assets/images/checkbox_normal.svg" class="unchecked">
      <img src="../assets/images/checkbox_indeterminate.svg" class="checked-hover">
      <img src="../assets/images/checkbox_hover.svg" class="unchecked-hover">
      <span class="form-check-label ml-2">{{airline}}</span>
    </label>
  </div>
</template>

<script>
  export default {
    name: 'FilterCompanies',
    props: ['airlines', 'filter'],
    data () {
      return {
        checkedNames: this.filter
      }
    },
    watch: {
      filter: function(newVal) {
        this.checkedNames = newVal
      }
    },
    methods: {
      updateFilterCompanies () {
        if (this.checkedNames[this.checkedNames.length - 1] === 'all' || !this.checkedNames.length) {
          this.checkedNames = ['all']
        } else {
          let index = this.checkedNames.indexOf('all');
          if (index !== -1) this.checkedNames.splice(index, 1);
        }

        this.$emit('update-filter', this.checkedNames)
      }
    }
  }
</script>
