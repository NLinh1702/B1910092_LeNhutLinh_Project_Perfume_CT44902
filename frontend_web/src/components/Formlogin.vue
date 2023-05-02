<script>
    import * as yup from "yup";
    import { Form, Field, ErrorMessage } from "vee-validate";
    import { mapActions } from "pinia";
    import { useAuthStore } from "@/stores/Auth.store";
    import toast from "../assets/js/toasts";
    export default {
        components: {
            Form,
            Field,
            ErrorMessage,
        },
        data() {
        const Loginform = yup.object().shape({
            username: yup
            .string()
            .required("Tài khoản phải có giá trị!!!")
            .min(2, "Tên phải ít nhất 3 ký tự."),
           password: yup
            .string()
            .required("Mật khẩu phải có giá trị!!!")
            });
            return {
            Loginform,
            toasts:{
                    title:"Warning",
                    msg:"Tên đăng nhập hoặc tài khoản không đúng!",
                    type:"warn",
                    duration:2000
                 },
            }
        },
        methods:{
            toast,
            showPwd(){
            if(document.querySelector("#checkpwd").checked == true){
                  document.querySelector("#pwd").type = 'text';
            }else{
                  document.querySelector("#pwd").type = 'password';
            }
          },
          	...mapActions(useAuthStore, ["login"]),
            async handleLogin(user) {
              try {
                await this.login(user);
                location.href='http://localhost:3001/';
              } catch (error) {
                this.toast();
                console.log(error);
              }
            },
        },
    };
</script>
<template>
        <Form :validation-schema="Loginform" @submit="handleLogin">
          <!-- Email input -->
          <div class="form-outline mb-4">
            <label class="form-label" for="pwd">Nhập tài khoản</label>
            <Field 
                id="name"
                name="username"
                type="text"
                class="form-control form-control-lg"
            />
            <ErrorMessage name="username" class="text-danger" />
          </div>

          <!-- Password input -->
          <div class="form-outline mb-3">
            <label class="form-label" for="pwd">Nhập mật khẩu</label>
             <Field 
                id="pwd"
                name="password"
                type="password"
                class="form-control form-control-lg"
            />
            <ErrorMessage name="password" class="text-danger"/>
          </div>
          <div class="d-flex justify-content-between align-items-center">
          </div>
          <div class="text-center tex t-lg-start mt-4 pt-2">
              <button class="btn btn-success btn-lg"
                style="width: 100%;">Đăng nhập</button>
            <p class="small fw-bold mt-2 pt-1 mb-0">Nếu bạn chưa có tài khoản? Đăng ký tại đây  <router-link to="/logup"
                class="link-danger">Đăng ký</router-link></p>
          </div>
        </Form>
</template>