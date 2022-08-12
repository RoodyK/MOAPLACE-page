<template>
  <nav>
    <RouterLink to="/">Home</RouterLink> | 
    <RouterLink to="/users/mypage">mypage</RouterLink> | 
    <RouterLink to="/users/performance">performance</RouterLink> | 
    <RouterLink to="/users/ticket/list">ticketlist</RouterLink> | 
    <RouterLink to="/users/ticket/detail">ticketdetail</RouterLink> | 
    <RouterLink to="/users/rental/list">rentallist</RouterLink> | 
    <RouterLink to="/users/rental/detail">rentaldetail</RouterLink> | 
    <RouterLink to="/users/review/list">myreviewlist</RouterLink> | 
    <RouterLink to="/users/qna/list">myqnalist</RouterLink>
  </nav>
  <RouterView/>
</template>

<style>

</style>
