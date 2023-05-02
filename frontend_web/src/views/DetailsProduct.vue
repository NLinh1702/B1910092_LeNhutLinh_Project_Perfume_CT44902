<script>
    import HeaderShop from '@/components/HeaderShop.vue'
    import ProductService from '../services/Product.service'
    import CartService from '../services/Cart.service'
    import toastsVue from '../components/toasts.vue'
    import toastsjs from '../assets/js/toasts.js'
    import { mapState } from 'pinia'
    import { useAuthStore } from "@/stores/Auth.store";
    export default {
        data(){
            return{
                 detailproduct:[],
                 cartitem:{
                     userId:'',
                     productId :this.$route.params.id,
                     quantity : 1,
                     title:"",
                     img:"",
                     price:"",
                     size:"",
                    //  color:"",
                 },
                 carts:[],
                 toasts:{
                    title:"Success",
                    msg:"Thêm vào giỏ hàng thành công",
                    type:"success",
                    duration:2000
                 },
                sub_quantity:1,
            }
        },
        computed:{
            ...mapState(useAuthStore,{
                currentUser: "user",
            }),
        },
        components:{
            HeaderShop,
            toastsVue
        },
        methods:{
            toastsjs,
            async getproduct(){
                try{
                    this.detailproduct = await ProductService.get(this.$route.params.id);
                    this.cartitem.title = this.detailproduct.title ;
                    this.cartitem.img =this.detailproduct.img[0]  ;
                    this.cartitem.price = this.detailproduct.price; 
                    this.cartitem.size = this.detailproduct.size; 
                    this.cartitem.color = this.detailproduct.color; 
                }catch(error){
                    console.log(error);
                }
            },
            async getidcart(){
                this.cartitem.quantity=this.sub_quantity;
                var exitcart = false;
                
                try{
                    this.carts = await CartService.get(this.currentUser._id);
                    this.cartitem.userId = this.currentUser._id;
                     this.carts.map((cartproduct)=>{
                             if(cartproduct.productId == this.cartitem.productId){
                                 this.cartitem.quantity+=cartproduct.quantity;
                                 CartService.update(cartproduct._id,this.cartitem);
                                 exitcart=true;    
                                 this.toastsjs(); 
                                 setTimeout(()=>{
                                     this.$router.push({name:'CartShop'});
                                 },1000);
                             }
                     })
                        if(exitcart === false){
                        this.cartitem.userId = this.currentUser._id;
                        CartService.create(this.cartitem);
                        this.toastsjs(); 
                        setTimeout(()=>{
                                this.$router.push({name:'CartShop'});
                            },1000);
                       }
                }catch(error){
                    this.toasts.title="Message",
                    this.toasts.msg="Bạn chưa đăng nhập!",
                    this.toasts.type="warn",
                    this.toasts.duration=3000,
                    this.toastsjs(); 
                    console.log(error);
                }
            },
        },
        created() {
            this.getproduct();
        },

    }
</script>
<template>
    <HeaderShop></HeaderShop>
    <toastsVue></toastsVue>


    <div class="container mt-5 mb-5">
    <div class="row d-flex justify-content-center">
        <div class="col-md-10">
            <div class="card">
                <div class="row">
                    <div class="col-md-6">
                        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item"  v-for="(img,index) in detailproduct.img" :class="{active : index==0}">
                            <img :src="img" class="d-block w-75" alt="..." style="border-radius: 8px ;">
                            </div>
                        </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                    </div>
                    </div>
                    <div class="col-md-6">
                        <div class="product p-4">
                            <div class="mt-4 mb-3">
                                <h5 class="text-uppercase">{{detailproduct.title}}</h5>
                                <div class="price d-flex flex-row align-items-center"> <span class="act-price">{{detailproduct.price}}$</span>
                                </div>
                            </div>
                            <p class="about">{{detailproduct.desc}}</p>
                            
                            <div class="sizes mt-5">
                                <input id="quantity" name="quantity" type="number" v-model="sub_quantity"
                                class="form-control form-control-sm" style="width:100px; height: 20px; border: none;"/>
                            <br>
                                <h6 class="text-uppercase">Size</h6> <label class="radio"> <input type="radio" name="size" value="50ml" checked> <span>50ml</span> </label> <label class="radio"> <input type="radio" name="size" value="100ml"> <span>100ml</span> </label> <label class="radio"> <input type="radio" name="size" value="150ml"> <span>150ml</span> </label> <label class="radio"> <input type="radio" name="size" value="200ml"> <span>200ml</span> </label> <label class="radio"> <input type="radio" name="size" value="250ml"> <span>250ml</span> </label>
                            </div>
                            <div class="cart mt-4 align-items-center"> <button class="btn btn-danger text-uppercase mr-2 px-4" @click="getidcart()">Thêm vào giỏ</button> <i class="fa fa-heart text-muted"></i> <i class="fa fa-share-alt text-muted"></i> </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    
</template>
<style scoped>
body{background-color: #000}.card{border:none}.product{background-color: #eee}.brand{font-size: 13px}.act-price{color:red;font-weight: 700}.dis-price{text-decoration: line-through}.about{font-size: 14px}.color{margin-bottom:10px}label.radio{cursor: pointer}label.radio input{position: absolute;top: 0;left: 0;visibility: hidden;pointer-events: none}label.radio span{padding: 2px 9px;border: 2px solid #ff0000;display: inline-block;color: #ff0000;border-radius: 3px;text-transform: uppercase}label.radio input:checked+span{border-color: #ff0000;background-color: #ff0000;color: #fff}.btn-danger{background-color: #ff0000 !important;border-color: #ff0000 !important}.btn-danger:hover{background-color: #da0606 !important;border-color: #da0606 !important}.btn-danger:focus{box-shadow: none}.cart i{margin-right: 10px}
</style>