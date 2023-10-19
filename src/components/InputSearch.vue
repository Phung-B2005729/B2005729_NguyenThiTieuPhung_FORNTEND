<script>
export default {
    props: { ////props sử dụng để định nghĩa các thuộc tính mà thành phần này sẽ nhận từ ngoài
         modelValue: { type: String, default: "" }, 
     },
    emits: ["submit", "update:modelValue"], //khai báo các sự kiện của thành phần
    methods: {
        updateModelValue(e) {
            this.$emit("update:modelValue", e.target.value);  // cập nhật dữ liệu
        },
        submit() {
            this.$emit("submit");
        },
     },
};
</script>
<template>
    <div class="input-group">
        <input
            type="text"
            class="form-control"
            placeholder="Nhập thông tin cần tìm"
            :value="modelValue"
            @input="updateModelValue" 
            @keyup.enter="submit"
        />
        <div class="input-group-append">
            <button
                class="btn btn-outline-secondary"
                type="button"
                @click="submit"
            >
                 <i class="fas fa-search"></i> Tìm kiếm
            </button>
        </div>
    </div>
</template>