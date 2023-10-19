<template>
<div class="page row">
    <div class="col-md-10">
        <InputSearch v-model="searchText" />
    </div>
     <div class="mt-3 col-md-6">
        <h4>
            Danh bạ
            <i class="fas fa-address-book"></i>
        </h4>
        <ContactList
            v-if="filteredContactsCount > 0"
            :contacts="filteredContacts"
            v-model:activeIndex="activeIndex"
            />
        <p v-else>Không có liên hệ nào.</p>
        <div class="mt-3 row justify-content-around align-items-center">
            <button class="btn btn-sm btn-primary" @click="refreshList()">
                <i class="fas fa-redo"></i> Làm mới
            </button>
            <button class="btn btn-sm btn-success" @click="goToAddContact">
                <i class="fas fa-plus"></i> Thêm mới
            </button>
            <button
                class="btn btn-sm btn-danger"
                @click="removeAllContacts"
                >
                <i class="fas fa-trash"></i> Xóa tất cả
            </button>
        </div>
    </div>
     <div class="mt-3 col-md-6">
    <div v-if="activeContact">
        <h4>
            Chi tiết Liên hệ
            <i class="fas fa-address-card"></i>
        </h4>
        <ContactCard :contact="activeContact" />
    </div>
    </div>
</div>
</template>
<script>
    import ContactCard from "@/components/ContactCard.vue";
    import InputSearch from "@/components/InputSearch.vue";
    import ContactList from "@/components/ContactList.vue";
    import ContactService from "@/services/contact.service";
    export default {
        components: {
            ContactCard,
            InputSearch,
            ContactList,
        },
        data() {
            return {
                contacts: [],
                activeIndex: -1,  // vị trí liên hệ đang được chọn
                searchText: "",
            };
        },
        watch: {
            // Giám sát các thay đổi của biến searchText.
            // Bỏ chọn phần tử đang được chọn trong danh sách.
            searchText() {
            this.activeIndex = -1;
            },
        },
        computed: {
            // Chuyển các đối tượng contact thành chuỗi để tiện cho tìm kiếm.
            contactStrings() {
                return this.contacts.map((contact) => {
                     const { name, email, address, phone } = contact;
                    return [name, email, address, phone].join("");
                });
            },
            filteredContacts() { // lọc liên hệ khi tìm kiếm
                if (!this.searchText) return this.contacts;
                return this.contacts.filter((_contact, index) =>
                    this.contactStrings[index].includes(this.searchText)
                    // mãng các contact có chứa từ tìm kiếm
                );
            },
            activeContact() { // liên hệ đang được chọn kiểm tra
                if (this.activeIndex < 0) return null;
                return this.filteredContacts[this.activeIndex];
            },
            filteredContactsCount() {
               return this.filteredContacts.length; //sl các liên hệ khi tìm kiếm
            },
            },
        methods: {
            async retrieveContacts() {
                try {
                    // lấy danh sách các contact
                  this.contacts = await ContactService.getAll();
                } catch (error) {
                    console.log(error);
                }
            },
            refreshList() {
                // làm mới danh sách
                // bỏ chọn
                this.retrieveContacts();
                this.activeIndex = -1;
            },
            async removeAllContacts() {
                // xoá tất cả liên hệ
                if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
                    try {
                        await ContactService.deleteAll();
                        this.refreshList();
                    } catch (error) {
                        console.log(error);
                    }
                }
            },
            goToAddContact() {
                this.$router.push({ name: "contact.add" });  // đến trang thêm liên hệ
            },
        },
        mounted() {
                this.refreshList(); // gọi làm mới danh sách khi trang được tải
            },
    };
</script>
<style scoped>
    .page {
    text-align: left;
    max-width: 750px; 
    }
</style>