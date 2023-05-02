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
  <div class="container">
    <div class="row">
      <h4 style="text-align: center;" class="mt-4">TỔNG QUAN VỀ NƯỚC HOA</h4>
      <div class="col-md-6">
        <img src="../assets/image/image_perfume.jpg" alt="" style="width: 100%;">
      </div>
      <div class="col-md-6">
        <p>Nước hoa là hỗn hợp các chất tạo mùi như tinh dầu, chất thơm, chất hãm hương (lưu hương), và dung môi hòa tan. Dùng để tạo ra cho cơ thể người, con vật, đồ vật hay không gian một mùi hương dễ chịu. Các thành phần của nước hoa có thể được tổng hợp nhân tạo hoặc chiết xuất từ thực vật và động vật.</p>
        <p>Trên khía cạnh hóa học, nước hoa là một hợp chất gồm alcohol, nước lã và những phân tử có mùi thơm bốc hơi ở nhiệt độ bình thường. Một mùi hương là những phân tử nhẹ để có thể lơ lửng trong không khí lọt vào mũi và theo đó, gửi một tín hiệu lên óc, tạo ra nhận thức.</p>
      </div>
    </div>
    <div class="row mt-2" >
      <h4 style="text-align: center;" class="mt-2">VIDEO TÌM HIỂU VỀ NƯỚC HOA</h4>
      <div class="col-md-6">
        <iframe width="95%" height="315" src="https://www.youtube.com/embed/FdteYZs2-5M" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </div>
      <div class="col-md-6">
        <iframe width="95%" height="315" src="https://www.youtube.com/embed/JS6f4Hz19nU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
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