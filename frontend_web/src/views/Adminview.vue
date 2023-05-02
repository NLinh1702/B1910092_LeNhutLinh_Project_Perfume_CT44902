<script>
import HeaderShopVue from "../components/HeaderShop.vue";
import HeaderAdminVue from "../components/HeaderAdmin.vue";
import ListUser from "../components/ListUser.vue";
import UserService from "../services/User.service";
import toastsVue from "../components/toasts.vue";
import ProductService from "../services/Product.service";
import ListProduct from "../components/ListProduct.vue";
import Productcard from "../components/Productcard.vue";
import Usercard from "../components/Usercard.vue";
import toast from "../assets/js/toasts";
    export default{
        data(){
            return{
                users:[],
                products:[],
                activeIndex:-1,
                activeUser:-1,
                toasts:{
                    title:"Warning",
                    msg:"Bạn không phải ADMIN",
                    type:"warn",
                    duration:3000
                 },
            }
        },
        computed:{
             getindex(){
                 if(this.activeIndex!=-1){
                     const list = document.querySelectorAll(".product-item");
                     list.forEach(element => {
                         element.classList.remove("active");
                     });
                     list[this.activeIndex].classList.add("active");
                    return this.products[this.activeIndex];
                 }
            },
              getindexuser(){
                 if(this.activeUser!=-1){
                     const list = document.querySelectorAll(".user-item");
                     list.forEach(element => {
                         element.classList.remove("active");
                     });
                     list[this.activeUser].classList.add("active");
                    return this.users[this.activeUser];
                 }
            }
        },
        components:{
            HeaderAdminVue,
            HeaderShopVue,
            ListUser,
            ListProduct,
            toastsVue,
            Productcard,
            Usercard
        },
        methods:{
            toast,
                async getall(){
            try{
                 this.products = await ProductService.getAll();
                 this.users = await UserService.getAll();
            }catch(error){
                console.log(error);
                this.toast();
                setTimeout(()=>{
                    this.$router.push({name:"ShopMain"});
                },1000);
                }
            },
        },
    created(){
        this.getall();
    },
}
</script>

<template>
        <HeaderAdminVue></HeaderAdminVue>
        <toastsVue></toastsVue>
        <div class="header text-center">
            <h2>Trang Admin Shop nước hoa Xin Chào!</h2>
        </div>
        <div>
            <img src="../assets/image/admin1.jpg" alt="" style="width: 100%;">
        </div>
</template>
<style scoped>
.list_item_product,.list_item_user{
    max-height: 500px;
    overflow-y:scroll;
    text-overflow:ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
#product::-webkit-scrollbar,#user::-webkit-scrollbar  {
    width: 6px;
    background-color: #F5F5F5;
} 
</style>