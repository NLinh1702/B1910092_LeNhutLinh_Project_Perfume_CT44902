<script>
    export default{
        data(){
            return{
                products:[],
            }
        },
        props:{
            refeshlistcart:Function,
            carts:Array,
        },
        emit:[
            "deleted:cartIndex"
        ],
        methods:{
        deletedcart(index){
            this.$emit("deleted:cartIndex",index);
        },
    },
}
</script>
<template>

<div class="d-flex justify-content-between align-items-center mt-3 p-2 items rounded" v-for="(item,index) in carts">
    <div class="d-flex flex-row"><img class="rounded" :src="item.img" width="40">
        <div class="ml-2" style="margin-left: 30px;"><span class="font-weight-bold d-block">{{item.title}}</span><span class="spec">
            Size: {{item.size}}(ml), Số lượng: {{item.quantity}}(chai)</span></div>
    </div>
    <div class="d-flex flex-row align-items-center"><span class="d-block"></span><span class="d-block ml-5 font-weight-bold" style="margin-right: 45px; color: blue;">{{item.price *item.quantity}}$</span><i class="fa fa-trash-o ml-3 text-black-50">
        <button type="button" @click="deletedcart(index)" class="text-muted btn btn-exit"><i class="bi bi-trash3-fill"></i></button>
    </i></div>
</div>
         
</template>