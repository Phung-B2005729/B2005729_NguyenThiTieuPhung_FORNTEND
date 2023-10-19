<template>
    <div v-if="contact==null" class="page">
        <h4>Thêm liên hệ</h4>
        <!--Trang Form edit/thêm-->
        <ContactForm
            :contact="contact"
            :mode="mode"
            @submit:contact="createContact"
        />
        <p>{{ message }}</p>
    </div>
</template>
<script>
    import ContactForm from "@/components/ContactForm.vue";
    import ContactService from "@/services/contact.service";

    export default {
        components: {
            ContactForm,
        },
       
        data() {
            return {
                contact: null,
                message: "",
                mode:'create',
            };
        },
        methods: {
            async createContact(data) {
                try {
                    await ContactService.create(data);
                    this.message = "Thêm thành công";
                    alert(this.message);  // thông báo thành công
                    this.$router.push("/"); // chuyển về trang chủ
                } catch (error) {
                    console.log(error);
                }
            },
            
        },
       
    };
</script>