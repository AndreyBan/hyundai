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
                console.log(document.cookie)
            if (!this.$v.fields.$error && this.fields.agree) {
                if (document.cookie['_ym_uid']) this.fields['_ym_uid'] = document.cookie['_ym_uid'];
                if (document.cookie['_ga']) this.fields['_ga'] = document.cookie['_ga'];

                let dataSend = JSON.stringify(this.fields);

                fetch('https://agat-hyundai.ru/ajax/api_instock.php?data=send',{
                    headers: {"Content-Type": "application/x-www-form-urlencoded"},
                    method: 'POST',
                    body: "body=" + dataSend
                }).then(r => r.json())
                    .then(r => {
                        console.log(r)
                    })
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
