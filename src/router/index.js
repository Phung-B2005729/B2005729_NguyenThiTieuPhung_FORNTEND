import { createWebHistory, createRouter } from "vue-router";
//createRouter tạo một thể hiện của Vue Router để quản lý các định tuyến
//createWebHistory được sử dụng để tạo một loại lịch sử định tuyến
import ContactBook from "@/views/ContactBook.vue";
    const routes = [
        {
            path: "/",
            name: "contactbook",
            component: ContactBook,
        },
    ];
    const router = createRouter({
        history: createWebHistory(import.meta.env.BASE_URL),
        routes, 
    });
export default router;