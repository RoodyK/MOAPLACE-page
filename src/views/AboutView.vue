<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>

  <ul>
    <li>가나다라마바사</li>
    <li>가나다라마바사</li>
    <li>가나다라마바사</li>
    <li>가나다라마바사</li>
  </ul>
  <p>awefawefawefaewfaeaf</p>

  <div class="container">
    <form>
      <div class="row">
        <div class="mb-3 col-4">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
          <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3 col-4">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
          <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3 col-4">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
          <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1">
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1">
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
export default {

}
</script>


<style scoped lang="scss">


ul li{
    font-size: 40px;
    color: red;
    list-style: none;
}

p {
  color: rosybrown;
}

</style>