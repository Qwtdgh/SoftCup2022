<script>
let userId
let userName
// if(! window.localStorage){
//   userId = 0
//   userName = 'test'
//   alert("您的浏览器不支持localstorage")
// }
// else{
  userId = window.localStorage.getItem('userId');
  userName = window.localStorage.getItem('userName');
// }
export default {
  userId,
  userName,
}
</script>
