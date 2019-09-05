<template>
  <transition name="fade">
    <div class="result-item d-md-flex d-block">
      <div class="d-flex result-item-content justify-content-between">
        <div class="result-item-content-row d-md-flex d-block align-items-center w-100">
          <div class="result-item-content-row-logo d-flex align-items-center mb-2 mb-md-0">
            <img :src="logoUrl">
            <b class="ml-2">{{airlineName}}</b>
          </div>
          <div class="d-flex justify-content-between justify-content-md-start">
            <div class="result-item-content-row-departure text-center pl-0 pr-3 pl-md-3">
              <div class="result-item-content-row-departure-date">
                {{depDateTime | moment('D MMM, ddd')}}
              </div>
              <div class="result-item-content-row-departure-time">
                {{depDateTime | moment('HH:mm')}}
              </div>
            </div>
            <div class="result-item-content-row-path">
              <div class="result-item-content-row-path-top d-flex justify-content-between">
                <span class="city">{{flightInfo.segments[0].origin_code}}</span>
                <span class="duration">{{getFormattedTravelTime(flightInfo.traveltime)}}</span>
                <span class="city">{{destinationCode}}</span>
              </div>
              <div class="result-item-content-row-path-mid">
                <img src="../assets/images/0--0--0.png">
              </div>
              <div class="result-item-content-row-path-bot text-center">
                {{transferInfo}}
              </div>
            </div>
            <div class="result-item-content-row-arrival text-center pr-0 pl-3 pr-md-3">
              <div class="result-item-content-row-arrival-date">
                {{arrDateTime | moment('D MMM, ddd')}} <span v-if="depArrDiff > 0">+{{depArrDiff}}</span>
              </div>
              <div class="result-item-content-row-arrival-time">
                {{arrDateTime | moment('HH:mm')}}
              </div>
            </div>
          </div>
        </div>
        <div class="result-item-content-row d-md-flex d-none align-items-center mt-3">
          <a href="#" class="result-item-content-row-link mr-3">Детали перелета</a>
          <a href="#" class="result-item-content-row-link mr-3">Условия тарифа</a>
          <span class="result-item-content-row-non" v-if="!flight.refundable">
          <img src="../assets/images/icon-non-refundeble.png">
          невозвратный
        </span>
        </div>
      </div>
      <div class="d-flex result-item-price">
        <div class="result-item-price-price">
          {{ flightInfo.price.amount }} ₸
        </div>
        <div class="result-item-price-btn">
          <button class="btn w-100 text-center">Выбрать</button>
        </div>
        <div class="result-item-price-desc d-none d-md-block text-center">
          Цена за всех пассажиров
        </div>
        <div class="result-item-price-luggage d-flex justify-content-between align-items-center">
          {{flight.buggage_text}}
          <button class="btn">+ Добавить багаж</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'ResultItem',
    props: ['flight'],
    computed: {
      flightInfo () {
        return this.flight.itineraries[0][0]
      },
      logoUrl () {
        return 'https://aviata.kz/static/airline-logos/80x80/' + this.flightInfo.carrier + '.png'
      },
      airlineName () {
        return this.flightInfo.carrier_name
      },
      depDateTime () {
        return this.flightInfo.dep_date
      },
      arrDateTime () {
        return this.flightInfo.arr_date
      },
      destinationCode () {
        return this.flightInfo.stops ? this.flightInfo.segments[1].dest_code : this.flightInfo.segments[0].dest_code
      },
      transferInfo () {
        if (!this.flightInfo.stops) {
          return 'прямой рейс'
        }

        let city = this.flightInfo.segments[0].dest;
        let layover = this.flightInfo.layovers[0];

        return 'через ' + city + ', ' + this.getFormattedTravelTime(layover)
      },
      depArrDiff () {
        let a = this.$moment(this.depDateTime);
        let b = this.$moment(this.arrDateTime);

        return Math.abs(a.format('D') - b.format('D'))
      }
    },
    methods: {
      getFormattedTravelTime (time) {
        let hours = Math.floor(time / 3600);
        let minutes = (time % 3600) / 60;
        let result = hours ? hours + ' ч ' : '';
        if (minutes) {
          result += minutes + ' м'
        }
        return result
      }
    },
    mounted () {
    }
  }
</script>
