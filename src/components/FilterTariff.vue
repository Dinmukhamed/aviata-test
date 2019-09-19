<template>
  <div class="tariff">
    <div class="reset-filter" @click="resetFilterTariff" v-tooltip="{content: tooltipText, offset: 13}"></div>
    <p class="font-weight-bold">Опции тарифа</p>
    <label class="check-wrap py-2 mb-0 d-flex align-items-center" for="tariffDirect">
      <input
        class="form-check-input mt-0"
        type="checkbox"
        v-model="checkedNames"
        value="direct"
        @change="updateFilterTariff"
        id="tariffDirect"
      >
      <span class="checkbox checked"></span>
      <span class="checkbox unchecked"></span>
      <span class="checkbox checked-hover"></span>
      <span class="checkbox unchecked-hover"></span>
      <span class="form-check-label ml-2">Только прямые</span>
    </label>
    <label class="check-wrap py-2 mb-0 d-flex align-items-center" for="tariffLuggage">
      <input
        class="form-check-input mt-0"
        type="checkbox"
        v-model="checkedNames"
        value="buggage"
        @change="updateFilterTariff"
        id="tariffLuggage">
      <span class="checkbox checked"></span>
      <span class="checkbox unchecked"></span>
      <span class="checkbox checked-hover"></span>
      <span class="checkbox unchecked-hover"></span>
      <span class="form-check-label ml-2">Только с багажом</span>
    </label>
    <label class="check-wrap py-2 mb-0 d-flex align-items-center" for="tariffRefundable">
      <input
        class="form-check-input mt-0"
        type="checkbox"
        v-model="checkedNames"
        value="refundable"
        @change="updateFilterTariff"
        id="tariffRefundable">
      <span class="checkbox checked"></span>
      <span class="checkbox unchecked"></span>
      <span class="checkbox checked-hover"></span>
      <span class="checkbox unchecked-hover"></span>
      <span class="form-check-label ml-2">Только возвратные</span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'FilterTariff',
  data () {
    return {
      checkedNames: [],
      tooltipText: 'Сбросить выбор'
    }
  },
  props: ['filter'],
  watch: {
    filter: function(newVal) {
      this.checkedNames = newVal;
    }
  },
  methods: {
    updateFilterTariff () {
      if (!this.checkedNames.length) {
        this.checkedNames = ['all'];
      } else {
        let index = this.checkedNames.indexOf('all');
        if (index !== -1) this.checkedNames.splice(index, 1);
      }

      this.$emit('update-filter', this.checkedNames);
    },
    resetFilterTariff () {
      this.$emit('update-filter', []);
    }
  }
}
</script>
