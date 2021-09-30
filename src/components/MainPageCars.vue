<template>
  <div>
    <div class="container">
      <section class="section-filter">
        <TypeCar/>
          <PriceRange/>
      </section>

      <CarList/>
    </div>
    <FormRequest/>
  </div>
</template>

<script>
import TypeCar from "./TypeCar";
import PriceRange from "./PriceRange";
import CarList from "./CarList";
import FormRequest from "./FormRequest";

export default {
  name: "MainPageFilter",
  components: {
    FormRequest,
    TypeCar,
    PriceRange,
    CarList
  }
}
</script>

<style>
.container {
  max-width: 1536px;
  margin: 0 auto;
}

.section-filter {
  padding: 42px 130px 42px 100px;
  box-shadow: 0 0 10px rgba(0, 52, 105, 0.1);
  display: flex;
  justify-content: space-between;
}

@media only screen and (max-width: 1262px) {
  .container {
    padding-left: 40px;
    padding-right: 40px;
  }
}

@media (max-width: 1024px) {
  .section-filter {
    padding: 32px 50px 44px;
    flex-direction: column;
  }
}

@media (max-width: 767px) {
  .container {
    padding-left: 16px;
    padding-right: 16px;
  }

  .section-filter {
    padding: 16px 18px 28px;
    flex-direction: column;
  }
}
</style>
