<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
onMounted(() => {
  const router = useRouter()
  const loc = window.location
  console.log('index',loc,loc.host.startsWith('apy'),loc.pathname )
  // 二级域名 growthpad.xxx.com/ 跳转到 growthpad.xxx.com/growthpad
  // console.log(loc.host.startsWith('growthpad'), loc.host, loc.pathname)
  if (loc.host.startsWith('growthpad') && loc.pathname === '/') {
    router.push('/growthpad')
  } else if (loc.host.startsWith('apy') && loc.pathname === '/') {
    router.push('/apy')
  }
})
</script>