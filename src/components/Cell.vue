<template>
    <div class="cell-wrapper">
        <router-link class="user_avatar" :to="`/user/${userName}`">
            <img :src="avatarUrl">
        </router-link>
        <div class="cell-wrapper-item cell-wrapper-item-1">
            <slot name="left"></slot>
        </div>
        <div class="cell-wrapper-item cell-wrapper-item-2">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script type="text/javascript">
    export default {
        name: 'cell',
        props: ['avatarUrl','userName']
    }
</script>

<style type="text/css" lang="scss">
    .cell-wrapper {
    display: flex;
    align-items: center;
    font-size: 12px;
    .user_avatar {
        width: 40px;
        height: 40px;
        border-radius: 100%;
        overflow: hidden;
        margin-right: 5px;
        img {
            width: 100%;
        }
    }
    .cell-wrapper-item {
        display: flex;
        flex-direction: column;
        .count_of_replies {
            color: #198AC8;
        }
    }
    .cell-wrapper-item-1 {
        flex: 1;
    }
    .cell-wrapper-item-2 {
        span {
            text-align: right;
        }
    }

}
</style>
