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
