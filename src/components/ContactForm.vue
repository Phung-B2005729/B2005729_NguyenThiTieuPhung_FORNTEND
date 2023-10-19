<template>
    <Form
        @submit="submitContact"
        :validation-schema="contactFormSchema"  
    >
    <!--đặt kiểm tra dữ liệu gàng buộc với các trường nhập liệu :validation-schema="contactFormSchema"  -->
        <div class="form-group">
            <label for="name">Tên</label>
            <Field
                name="name"
                type="text"
                class="form-control"
                v-model="contactLocal.name"
            />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="email">E-mail</label>
            <Field
                name="email"
                type="email"
                class="form-control"
                v-model="contactLocal.email"
            />
            <ErrorMessage name="email" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="address">Địa chỉ</label>
            <Field
                name="address"
                type="text"
                class="form-control"
                v-model="contactLocal.address"
            />
            <ErrorMessage name="address" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="phone">Điện thoại</label>
            <Field
                name="phone"
                type="tel"
                class="form-control"
                v-model="contactLocal.phone"
            />
            <ErrorMessage name="phone" class="error-feedback" />
        </div>
        <div class="form-group form-check">
            <input
                name="favorite"
                type="checkbox"
                class="form-check-input"
                v-model="contactLocal.favorite"
            />
            <label for="favorite" class="form-check-label">
                <strong>Liên hệ yêu thích</strong>
            </label>
        </div>
        <div class="form-group">
            <button class="btn btn-primary">Lưu</button>
            <button
                v-if="contactLocal._id"
                type="button"
                class="ml-2 btn btn-danger"
                @click="deleteContact"
                >
            Xóa
            </button>
        </div>
    </Form>
</template>

<script>
    import * as yup from "yup"; // thư viện xác thực kiểm tra tính hợp lệ
    import { Form, Field, ErrorMessage } from "vee-validate"; // thư viện xây dựng các Form thực hiện xác thực dữ liệu
        //Form: tạo Form chứa các trường nhập liệu, quản lý trạng thái,sự kiện gửi.
        //Field: tạo các trường nhập liệu trong trong Form
        //ErrorMessage: hiển thị thông báo lỗi nếu việc kiểm tra tính hợp lệ thất bại.
    export default {
        components: {
            Form,
            Field,
            ErrorMessage,
        },
        emits: ["submit:contact", "delete:contact"],
        props: {
            contact: { type: Object, required: true }
        },
        data() {
            const contactFormSchema = yup.object().shape({  // tạp 1 schema để kiểm tra dữ liệu
                // định nghĩa các ràng buộc dữ liệu nhập vào
                name: yup.string().required("Tên phải có giá trị.").min(2, "Tên phải ít nhất 2 ký tự.").max(50, "Tên có nhiều nhất 50 ký tự."),
                //
                email: yup.string().email("E-mail không đúng.").max(50, "E-mail tối đa 50 ký tự."),
                //
                address: yup.string().max(100, "Địa chỉ tối đa 100 ký tự."),
                //
                phone: yup.string().matches(/((09|03|07|08|05)+([0-9]{8})\b)/g,"Số điện thoại không hợp lệ."),
            });
            return {
                contactLocal: this.contact,
                contactFormSchema,
            };
        },
        methods: {
            submitContact() {
                this.$emit("submit:contact", this.contactLocal);  // sự kiện submit
                
            },
            deleteContact() {
                this.$emit("delete:contact", this.contactLocal.id);  // sự kiện delete
            },
        },
    };
</script>
<style scoped>
        @import "@/assets/form.css";
</style>