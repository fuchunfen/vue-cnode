<template>
    <div class="edit">
        <div class="edit-area" contenteditable ref="content">写评论</div>
        <i class="edit-icon iconfont icon-send" @click="send"></i>
    </div>
</template>
<script type="text/javascript">
    export default {
        name: 'edit',
        mounted () {
            this.initEvent()
            this.$emit('getEdit',this.$refs.content)
        },
        methods: {
            send () {
                let oContent = this.$refs.content;
                let content = oContent.innerHTML.trim()
                this.$emit('send')
            },
            initEvent () {
                let oContent = this.$refs.content

                oContent.addEventListener('focus',() => {
                    if(oContent.innerHTML == '写评论') {
                        oContent.innerHTML = ''
                    }
                })

                oContent.addEventListener('blur',() => {
                    if(oContent.innerHTML == '') {
                        oContent.innerHTML = '写评论'
                    }
                })
            }
        }
    }
</script>
<style type="text/css" lang="scss">
    .edit {
        display: flex;
        padding: 10px 10px;
        align-items: center;
    }
    .edit-icon.icon-send {
        color: #45AFE8;
        font-size: 24px;
    }
    .edit-area {
        font-size: 14px;
        max-height: 100px;
        overflow: scroll;
        width: 100%;
        outline: none;
        flex: 1;
        border-bottom: 1px solid #ccc;
        margin-right: 10px;
        -webkit-user-modify: read-write-plaintext-only
    }
</style>
