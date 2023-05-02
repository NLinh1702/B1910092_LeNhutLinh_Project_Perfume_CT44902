<script>
    import FormloginVue from "../components/Formlogin.vue";
    import toastsVue from "../components/toasts.vue";
    import HeaderShop from '@/components/HeaderShop.vue';
    export default {
        components: {
            HeaderShop,
            FormloginVue,
            toastsVue
        },
    };
</script>
<template>
  <div class="header">
      <HeaderShop></HeaderShop>
  </div>

  <toastsVue></toastsVue>
 
  <section class="text-center text-lg-start" >
  <div class="container py-4">
    <div class="row g-0 align-items-center">
      <div class="col-lg-4 mb-5 mb-lg-0"></div>
      <div class="col-lg-4 mb-5 mb-lg-0">
        <div class="card cascading-right" style="
            background: hsla(0, 0%, 100%, 0.55);
            backdrop-filter: blur(30px);">
          <div class="card-body p-5 shadow-5 text-center">
            <h4 class="fw-bold mb-5">Đăng nhập tài khoản</h4>
            <FormloginVue></FormloginVue>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>
