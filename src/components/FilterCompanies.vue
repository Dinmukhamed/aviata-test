<template>
  <div class="companies">
    <p class="font-weight-bold">Авиакомпании</p>
    <label class="check-wrap py-2 mb-0 d-flex align-items-center">
      <input class="form-check-input mt-0"
             type="checkbox"
             v-model="checkedNames"
             name="tariff"
             value="all"
             id="all"
             @change="updateFilterCompanies"
      >
      <span class="checkbox checked"></span>
      <span class="checkbox unchecked"></span>
      <span class="checkbox checked-hover"></span>
      <span class="checkbox unchecked-hover"></span>
      <span class="form-check-label ml-2">Все</span>
    </label>
    <label class="check-wrap py-2 mb-0 d-flex align-items-center" v-for="(airline, key) in airlines" :for="key" :key="key">
      <input class="form-check-input mt-0"
             type="checkbox"
             v-model="checkedNames"
             name="tariff"
             :value="key"
             :id="key"
             @change="updateFilterCompanies"
      >
      <span class="checkbox checked"></span>
      <span class="checkbox unchecked"></span>
      <span class="checkbox checked-hover"></span>
      <span class="checkbox unchecked-hover"></span>
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
      filter: function (newVal) {
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

        this.$emit('update-filter', this.checkedNames);
      }
    }
  }
</script>
