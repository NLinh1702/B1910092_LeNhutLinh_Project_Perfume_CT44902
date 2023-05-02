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
            
            <div class="user_heading">
                    <h2>Danh Sách Sản Phẩm</h2>
                    <router-link to="/addproduct">
                        <button class="btn btn-danger">Thêm Sản phẩm</button>
                    </router-link>
                </div>
        </div>
        <div class="main_admin d-flex" style="margin-top:30px; margin-left: 100px; margin-right: 100px;">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Tên người dùng</th>
                        <th scope="col">Chi tiết sản phẩm</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><ListProduct :products="products" :refeshlist="getall" :getindex="getindex" v-model:activeIndex="activeIndex"></ListProduct></td>
                        <td><div class="list_users w-100" >
                
                <div class="list_item_user d-flex" id="user">
                    <div class="card_product border border-light border-1 h-100 bg-light text-dark"  style="padding: 10px;" v-if="getindex">  
                        <Productcard :products="getindex"></Productcard>
                        <router-link
                        :to="{
						name: 'editproduct',
						params: { id: getindex._id },
					}"
                        >
                            <span class="badge bg-warning text-dark" style="margin-left: 355px;">
                            <i class="bi bi-pencil-square"></i> Hiệu chỉnh</span>
                        </router-link>
                    </div>
                </div>
                
            </div></td>
                    </tr>
                </tbody>
            </table>
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
    background-color: #ffffff;
} 
</style>