export const mixinFilterProp = {
    methods: {
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
    methods: {
        formatPrice: function (value) {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        }
    }
}

export const mixinScrollToCars = {
    methods: {
        scrollToCars() {
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

export const mixinValidates = {
    methods: {
        checkForm() {
            this.$v.fields.$touch();

            if (!this.$v.fields.$error && this.fields.agree) {
                console.log("validate")
                this.fields = {
                    name: "",
                    phone: "",
                    comment: "",
                    dealer: "",
                    agree: false,
                    errors: {
                        agree: true,
                    }
                }
                this.$v.$reset();
            }
        },
        maskCheck(field) {
            this.fields.phone = field.target.inputmask.unmaskedvalue();
        }
    }
}
