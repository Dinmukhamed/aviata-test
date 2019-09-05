<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-3">
          <div class="row">
            <div class="col-lg-12 col-6">
              <filter-tariff :filter="filter.tariff" @update-filter="updateFilterTariff"></filter-tariff>
            </div>
            <div class="col-lg-12 col-6">
              <filter-companies  :airlines="airlinesFiltered" :filter="filter.companies" @update-filter="updateFilterCompanies"></filter-companies>
            </div>
          </div>
          <div class="reset-filters">
            <span @click="resetFilters">Сбросить все фильтры</span>
          </div>
        </div>
        <div class="col-12 col-lg-9">
          <custom-transition>
            <result-item v-for="flight in flightsFiltered" :flight="flight" :key="flight.id"></result-item>
          </custom-transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ResultItem from './components/ResultItem.vue'
import FilterTariff from './components/FilterTariff.vue'
import FilterCompanies from './components/FilterCompanies.vue'
import CustomTransition from './components/CustomTransition.vue'
import RESULTS from './assets/json/results.json'

export default {
  airlines: RESULTS.airlines,
  flights: RESULTS.flights,
  name: 'app',
  components: {
    ResultItem,
    FilterTariff,
    FilterCompanies,
    CustomTransition
  },
  computed: {
    flightsFiltered () {
      let flights = this.$options.flights;
      let result = [];
      let buggage = '';
      flights.forEach((c) => {
        c.direct = !c.itineraries[0][0].stops;
        buggage = c.services[Object.keys(c.services)[0]];
        c.buggage = buggage.code.charAt(0) !== '0';
        c.buggage_text = c.buggage ? buggage.value : 'Нет багажа';

        if (this.isFittingFilterCompanies(c) && this.isFittingFilterTariff(c)) {
          result.push(c)
        }
      });

      return result
    },
    airlinesFiltered () {
      return this.$options.airlines
    }
  },
  data () {
    return {
      filter: {
        tariff: ['all'],
        companies: ['all']
      }
    }
  },
  methods: {
    updateFilterCompanies(e) {
      this.filter.companies = e
    },
    updateFilterTariff(e) {
      this.filter.tariff = e
    },
    isFittingFilterCompanies(flight) {
      if (this.filter.companies.includes('all')) {
        return true
      }
      let carrier = flight.itineraries[0][0].carrier;
      return this.filter.companies.includes(carrier)
    },
    isFittingFilterTariff(flight) {
      if (this.filter.tariff.includes('all')) {
        return true
      }
      for (let i =0; i < this.filter.tariff.length; i++) {
        if (!flight[this.filter.tariff[i]]) {
          return false
        }
      }
      return true
    },
    resetFilters () {
      this.filter.companies = ['all'];
      this.filter.tariff = ['all']
    }
  }
}
</script>

<style lang="scss">
  @import '../src/assets/css/main.scss';
</style>
