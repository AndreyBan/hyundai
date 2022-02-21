export const mixinFilterProp = {
  methods:{
      filterProp(el, prop) {
          let need = el.name ? el.name : el;

          if (el && prop && prop.length) {
              if (!prop.includes(need)) return false;

          } else if (!el) return false;

          return true;
      },
  }
}

export const mixinFormatPrice = {
    methods:{
        formatPrice: function (value) {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        }
    }
}

export const mixinScrollToCars = {
    methods: {
        scrollToCars(){
            const scrollTarget = document.querySelector(".ml-car-wrap");
            const topOffset = 200;
            const elementPosition = scrollTarget.getBoundingClientRect().top;
            const offsetPosition = elementPosition - topOffset;

            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth'
            });
        },
    }
}
