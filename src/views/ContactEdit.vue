<template>
    <div v-if="contact" class="page">
        <h4>Hiệu chỉnh Liên hệ</h4>
        <!--Trang Form edit/thêm-->
        <ContactForm
            :contact="contact"
            :mode="mode"
            @submit:contact="updateContact"
            @delete:contact="deleteContact"
        /><!--truyen phuoc thuc cho submit -> tao moi hoac update hoac delete-->
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
        props: {
            id: { type: String, required: true }, // id nhan tu trang chu contactbook
        },
        data() {
            return {
                contact: null,
                message: "",
                mode: 'edit',
            };
        },
        methods: {
            async getContact(id) {
                try {
                    this.contact = await ContactService.get(id); // lấy contact có id=id truyen vao data contact
                } catch (error) {
                    console.log(error);
                    // Chuyển sang trang NotFound 
                    this.$router.push({
                        name: "notfound",
                        params: {
                            //this.$route.path: Lấy đường dẫn (URL) hiện tại
                            //Tách đường dẫn thành một mảng split("/")
                            //.slice(1): Loại bỏ phần tử đầu tiên của mảng
                            pathMatch: this.$route.path.split("/").slice(1)
                        },
                        query: this.$route.query,  // các tham số truy vấn của dg dẫn hiện tại
                        hash: this.$route.hash, // mãng băm 
                    });
                }
            },
            async updateContact(data) {  // ham cho submit -> update
                try {
                    await ContactService.update(this.contact._id, data);
                    this.message = "Liên hệ được cập nhật thành công.";
                    alert(this.message);  // thông báo thành công
                    this.$router.push("/"); // chuyển về trang chủ
                } catch (error) {
                    console.log(error);
                }
            },
            async deleteContact() {  // ham cho phuong thuc delete
                if (confirm("Bạn muốn xóa Liên hệ này?")) {
                    try {
                        await ContactService.delete(this.contact._id);
                        this.$router.push({ name: "contactbook" });
                    } catch (error) {
                        console.log(error);
                    }
                }
            },
        },
        created() {
            this.getContact(this.id); // gọi getContact khi trang tạo
            this.message = "";
        },
    };
</script>