<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
onMounted(() => {
  const router = useRouter()
  const location = window.location
  // 二级域名 growthpad.xxx.com/ 跳转到 growthpad.xxx.com/growthpad
  // console.log(loc.host.startsWith('growthpad'), loc.host, loc.pathname)
  if (location.host.startsWith('growthpad') && location.pathname === '/') {
    router.push('/growthpad')
  }
  else if (location.host.startsWith('apy') && location.pathname === '/') {
    router.push('/apy')
  }
})
</script>
