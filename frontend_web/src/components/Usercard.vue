<script>
export default {
	props: {
		users: { type: Object, required: true },
	},
};
</script>
<template>
<div class="header text-center">
    <div class="main_admin d-flex" style="margin-top:30px; margin-left: 100px; margin-right: 100px;">
        <table class="table">
           
            <tbody>
                <tr>
                    <td>{{users.username}}</td>
                    <td>{{users.email}}</td>
                    <td><i v-if="users.isAdmin">YES</i>
                        <i v-else>NO</i></td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
	
</template>
