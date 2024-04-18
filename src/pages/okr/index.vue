<script setup>
// defineOptions({
//   name: 'OkrPage',
// })
</script>

<template>
  <div>
    <a-tabs lazy-load>
      <a-tab-pane key="1" title="1.大文件上传">
        <div text-left>
          <div m-b-2 text-3xl>
            OKR 重难点
          </div>
          <div text-lg>
            大文件上传
          </div>
          <div ml-4 mt-4>
            <div>切片上传（Blob.prototype.slice 一步流程控制 hash）</div>
            <div>断点续传/秒传 hash</div>
            <div>hash值计算</div>
            <div ml-4 mt-4 border-2 p-4>
              <p>读取File 利用Blob.prototype.slice将File拆分成若干chunk</p>
              <p>异步流程控制 并发上传切片 并控制并发数量6（p-limit/promise）</p>
            </div>
          </div>
          <CustomUploader />
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" title="2.RBAC权限设计">
        <div text-lg>
          rbac权限设计
        </div>
        <div ml-4 mt-4 border-2 p-4>
          <div>登录流程以及细节(涉及到axios封装)</div>
          <p m-b-2>
            username + password(crypto) => backend => userinfo & token => local persist => before api send add
            token(header bearer token)
          </p>
          <p m-b-2>
            getRoutesInfo => routes => resolve routes addRoutes
          </p>
          <p m-b-2>
            axios request interceptor add token && response interceptor handle http status
          </p>
          <p>router hooks beforeEach 判断是否存在token，此外加上whiteList(for login register pages which does not need login)</p>
          <div m-b-4>
            包括jwt细节(jwt header payload signature 对比传统session)
          </div>
          <div>router细节（包括addRoutes）</div>
        </div>
      </a-tab-pane>
      <a-tab-pane key="3" title="3.其他" />
    </a-tabs>
  </div>
</template>
