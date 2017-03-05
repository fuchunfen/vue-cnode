<template>
    <div class="send-form">
        <select>
            <option>分享</option>
            <option>问答</option>
            <option>招聘</option>
        </select>
        <input type="text" placeholder="标题字数 10 字以上">
        <textarea placeholder="内容字数 10 字以上"></textarea>
    </div>
</template>
<style type="text/css" lang="scss">
    .send-form {
        width: 100%;
        select, input{
            height: 50px;
            border-bottom: 1px solid #ccc;
        }
        select,input,textarea {
            width: 100%;
            font-size: 14px;
            padding: 0 10px;
        }
        textarea {
            padding-top: 20px;
            height: 300px;
        }
    }
</style>
