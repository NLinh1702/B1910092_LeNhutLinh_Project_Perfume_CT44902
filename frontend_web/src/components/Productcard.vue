<script>
export default {
	props: {
		products: { type: Object, required: true },
	},
};
</script>
<template>
     <div class="main_admin d-flex" style="margin-top:30px; margin-left: 100px; margin-right: 100px;">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Tên người dùng</th>
                        <th scope="col">Danh mục</th>
                        <th scope="col">Giá</th>
                        <th scope="col">Size</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><img :src=" products.img[0]" alt="img" width="50"></td>  
                        <td>{{products.categories}}</td>
                        <td>{{products.price}}</td>
                        <td>{{products.size}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
</template>
