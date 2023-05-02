<script>
    import SliderShop from '@/components/SliderShop.vue'
    import HeaderShop from '@/components/HeaderShop.vue'
    import ProductService from '../services/Product.service'
    import { mapState } from "pinia";
    import { useAuthStore } from "@/stores/Auth.store";
    import toastsVue from '../components/toasts.vue';
    export default {
         data(){
            return {
                Products:[],
            }
        },
        components:{
            HeaderShop,
            SliderShop,
            toastsVue
        },
        computed: {
            ...mapState(useAuthStore,{
                currentUser: "user",
            }),
    },
        methods:{
             async retrieveProduct() {
            try {
                this.Products = await ProductService.getAll();
            } catch (error) {
                console.log(error);
                }
            },          
        },
        mounted() {
        this.retrieveProduct();
        },
    }
</script>
<template>
    <div class="header">
        <HeaderShop></HeaderShop>
      </div>
      <toastsVue></toastsVue>
    <div class="slider">
        <SliderShop></SliderShop>
    </div> 


    <section style="background-color: #eee;">
      <div class="container py-5">
        <div><h2 style="text-align: center;">Sản phẩm Nam</h2></div>
        <div class="row justify-content-center mb-3" id="nam">
          <div class="col-md-5 col-xl-5" v-for="item in Products" v-show="item.categories === 'Nam'">
            <div class="card shadow-0 border rounded-3">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                    <div v-for="img in item.img">
                      <img :src="img"
                        class="w-100" />
                    </div>
                  </div>
                  <div class="col-md-6 col-lg-6 col-xl-6">
                    <h6>{{item.title}}</h6>
                    <div class="d-flex flex-row">
                      <div class="text-danger mb-1 me-2">
                        <i class="bi bi-star" style="margin: 3px;"></i>
                        <i class="bi bi-star" style="margin: 3px;"></i>
                        <i class="bi bi-star" style="margin: 3px;"></i>
                        <i class="bi bi-star" style="margin: 3px;"></i>
                      </div>
                      
                    </div>
                    <p class="text-truncate mb-4 mb-md-0">
                    Phong cách: Nam tính, Sang trọng, Lịch lãm
                    </p>
                  </div>
                  <div class="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                    <div class="d-flex flex-row align-items-center mb-1">
                      <h4 class="mb-1 me-1">{{item.price}}$</h4>
                    </div>
                    <h6 class="text-success">Free shipping</h6>
                    <div class="d-flex flex-column mt-4">
                      
                      <router-link :to="{
                            name: 'details',
                            params: { id: item._id },
                        }"  >
                            <button class="btn btn-primary btn-sm" type="button">Mua hàng</button>
                        </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div><h2 style="text-align: center;">Sản phẩm Nữ</h2></div>
        <div class="row justify-content-center mb-3" id="nu">
          <div class="col-md-5 col-xl-5" v-for="item in Products" v-show="item.categories === 'Nữ'">
            <div class="card shadow-0 border rounded-3">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                    <div v-for="img in item.img">
                      <img :src="img"
                        class="w-100" />
                    </div>
                  </div>
                  <div class="col-md-6 col-lg-6 col-xl-6">
                    <h6>{{item.title}}</h6>
                    <div class="d-flex flex-row">
                      <div class="text-danger mb-1 me-2">
                        <i class="bi bi-star" style="margin: 3px;"></i>
                        <i class="bi bi-star" style="margin: 3px;"></i>
                        <i class="bi bi-star" style="margin: 3px;"></i>
                        <i class="bi bi-star" style="margin: 3px;"></i>
                      </div>
                      
                    </div>
                    <p class="text-truncate mb-4 mb-md-0">
                    Phong cách: Nữ tính, Sang trọng, Thu hút
                    </p>
                  </div>
                  <div class="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                    <div class="d-flex flex-row align-items-center mb-1">
                      <h4 class="mb-1 me-1">{{item.price}}$</h4>
                    </div>
                    <h6 class="text-success">Free shipping</h6>
                    <div class="d-flex flex-column mt-4">
                      
                      <router-link :to="{
                            name: 'details',
                            params: { id: item._id },
                        }"  >
                            <button class="btn btn-primary btn-sm" type="button">Mua hàng</button>
                        </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
</section>
</template>
<style scoped>   

   @media (max-width: 767.98px) { .border-sm-start-none { border-left: none !important; } }
</style>