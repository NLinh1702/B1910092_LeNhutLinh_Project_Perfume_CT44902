import {createRouter,createWebHistory } from "vue-router";
import ShopView from "@/views/ShopView.vue";

const routes = [
    {
        path: "/",
        name: "ShopMain",
        component: ShopView,
    },
    {
        path: "/Cart",
        name: "CartShop",
        component: () => import("@/views/CartShop.vue"),
    },
    {
        path: "/tintuc",
        name: "tintuc",
        component: () => import("@/views/TinTuc.vue"),
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/LoginUser.vue"),
    },
    {
        path: "/logup",
        name: "Logup",
        component: () => import("@/views/Logup.vue"),
    },
    {
        path: "/details/:id",
        name: "details",
        component: () => import("@/views/DetailsProduct.vue"),
    },
    {
        path: "/addproduct",
        name: "addproduct",
        component: () => import("@/views/AddProduct.vue"),
    },
    {
        path: "/editproduct/:id",
        name: "editproduct",
        component: () => import("@/views/EditProduct.vue"),
    },
    {
        path: "/profile",
        name: "profile",
        component: () => import("@/views/UserProfile.vue"),
    },
    {
        path: "/admin",
        name: "admin",
        component: () => import("@/views/Adminview.vue"),
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: () => import("@/views/NotFound.vue"),
    },
    {
        path: "/DSuser",
        name: "listuser",
        component: () => import("@/views/DS_User.vue"),
    },
    {
        path: "/List_Product",
        name: "listproduct",
        component: () => import("@/views/List_Product.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;