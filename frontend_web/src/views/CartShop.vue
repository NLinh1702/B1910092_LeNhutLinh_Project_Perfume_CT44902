<script>
import HeaderShop from '@/components/HeaderShop.vue';
import CartService from '../services/Cart.service';
import toastsVue from '../components/toasts.vue';
import toastsjs from '../assets/js/toasts.js'
import CartItem from "../components/CartItem.vue";
export default{
    data(){
      return{
          carts:[],
          toasts:{
              title:"",
              msg:"",
              type:"",
              duration:0
              },
      }
    },
    components:{
         HeaderShop,
         toastsVue,
         CartItem
     },
     methods:{
        getiduser(){
          const user =  JSON.parse(localStorage.getItem("user"));
          return user._id;
        },
        async getcarts(){
          try{
          this.carts = await CartService.get(this.getiduser());
          }catch(error){
            console.log(error);
          }
        },
        async delcart(index){
              this.toasts.msg="Đã xóa sản phẩm",
              this.toasts.type="error",
              this.toasts.duration=2000
              this.toastsjs(); 
              await CartService.delete(this.carts[index]._id)
              this.refeshlistcart();  
        },
       toastsjs,
       refeshlistcart(){
         this.getcarts();
       },
        dathang(){
         if(this.carts.length > 0){
          this.toasts.title = "Cảm ơn bạn đã tin tưởng lựa chọn shop chúng tôi!",
          this.toasts.msg = "Đặt hàng thành công!!!",
          this.toasts.type = "success",
          this.toasts.duration=2000,
          this.toastsjs();
         }else{
              this.toasts.title = "Đặt hàng không thành công!",
              this.toasts.msg = "Bạn chưa có sản phẩm",
              this.toasts.type = "error",
              this.toasts.duration=2000,
              this.toastsjs();
         }
       },  
         total(){
           var total=0;
           for(var i in this.carts){
              total+=(this.carts[i].price*this.carts[i].quantity);
           }
            return total;
        }   
     },
      created(){
        this.refeshlistcart();
     },
}
</script>
<template>
  <HeaderShop></HeaderShop>
  <toastsVue></toastsVue>
  <div class="container mt-5 p-3 rounded cart">
        <div class="row no-gutters">
            <div class="col-md-8">
                <div class="product-details mr-2">
                    <div class="d-flex flex-row align-items-center"><i class="fa fa-long-arrow-left"><router-link to="/" >Tiếp tục mua sắm</router-link></i><span class="ml-2"></span></div>
                    <hr>
                    <h6 class="mb-0">Shopping cart</h6>
                    <div class="d-flex justify-content-between"><span>Có tất cả {{carts.length}} sản phẩm</span>
                        <div class="d-flex flex-row align-items-center"><span class="text-black-50">Tổng tiền |</span>
                            <div class="price ml-2"><span class="mr-1"> | Thao tác</span><i class="fa fa-angle-down"></i></div>
                        </div>
                    </div>
                    <CartItem :refeshlistcart="refeshlistcart" :carts="carts" @deleted:cartIndex="delcart"></CartItem>
                </div>
            </div>
            <div class="col-md-4">
                <div class="payment-info" style="background-color: #37375c;">
                    <div class="d-flex justify-content-between align-items-center"><span>Chi tiết đơn hàng</span><img class="rounded" src="https://i.imgur.com/WU501C8.jpg" width="30"></div>
                    <span class="type d-block mt-3 mb-1">Card type</span><label class="radio"> <input type="radio" name="card" value="payment" checked> <span><img width="30" src="https://img.icons8.com/color/48/000000/mastercard.png"/></span> </label>
                    <label class="radio" style="margin-left: 20px;"> <input type="radio" name="card" value="payment"> <span><img width="30" src="https://img.icons8.com/officel/48/000000/visa.png"/></span> </label>
                    <label class="radio" style="margin-left: 20px;"> <input type="radio" name="card" value="payment"> <span><img width="30" src="https://img.icons8.com/ultraviolet/48/000000/amex.png"/></span> </label>
                    <label class="radio" style="margin-left: 20px;"> <input type="radio" name="card" value="payment"> <span><img width="30" src="https://img.icons8.com/officel/48/000000/paypal.png"/></span> </label>
                    <div><label class="credit-card-label">Name on card</label><input type="text" class="form-control credit-inputs" placeholder="Name"></div>
                    <div><label class="credit-card-label">Card number</label><input type="text" class="form-control credit-inputs" placeholder="1234 5678 9999"></div>
                    <div class="row">
                        <div class="col-md-6"><label class="credit-card-label">Date</label><input type="text" class="form-control credit-inputs" placeholder="12/24"></div>
                        <div class="col-md-6"><label class="credit-card-label">CVV</label><input type="text" class="form-control credit-inputs" placeholder="342"></div>
                    </div>
                    <hr class="line">
                    <div class="d-flex justify-content-between information"><h5>Tổng tiền thanh toán: </h5><h5>{{total()}}$</h5></div>
                    <button class="btn btn-primary btn-block d-flex justify-content-between mt-3" style="text-align: center;" type="button" @click="dathang()"><span>Đặt hàng<i class="fa fa-long-arrow-right ml-1"></i></span></button></div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.payment-info {
  background: blue;
  padding: 10px;
  border-radius: 6px;
  color: #fff;
  font-weight: bold;
}

.product-details {
  padding: 10px;
}

body {
  background: #eee;
}

.cart {
  background: #fff;
}

.p-about {
  font-size: 12px;
}

.table-shadow {
  -webkit-box-shadow: 5px 5px 15px -2px rgba(0,0,0,0.42);
  box-shadow: 5px 5px 15px -2px rgba(0,0,0,0.42);
}

.type {
  font-weight: 400;
  font-size: 10px;
}

label.radio {
  cursor: pointer;
}

label.radio input {
  position: absolute;
  top: 0;
  left: 0;
  visibility: hidden;
  pointer-events: none;
}

label.radio span {
  padding: 1px 12px;
  border: 2px solid #ada9a9;
  display: inline-block;
  color: #8f37aa;
  border-radius: 3px;
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 300;
}

label.radio input:checked + span {
  border-color: #fff;
  background-color: blue;
  color: #fff;
}

.credit-inputs {
  background: rgb(102,102,221);
  color: #fff !important;
  border-color: rgb(102,102,221);
}

.credit-inputs::placeholder {
  color: #fff;
  font-size: 13px;
}

.credit-card-label {
  font-size: 9px;
  font-weight: 300;
}

.form-control.credit-inputs:focus {
  background: rgb(102,102,221);
  border: rgb(102,102,221);
}

.line {
  border-bottom: 1px solid rgb(102,102,221);
}

.information span {
  font-size: 12px;
  font-weight: 500;
}

.information {
  margin-bottom: 5px;
}

.items {
  -webkit-box-shadow: 5px 5px 4px -1px rgba(0,0,0,0.25);
  box-shadow: 5px 5px 4px -1px rgba(0, 0, 0, 0.08);
}

.spec {
  font-size: 11px;
}
</style>