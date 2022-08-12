<template>
  <div>
    <nav>
      <RouterLink to="/">Home</RouterLink> |
      <RouterLink to="/moa/moaplace/info">MOAPLACE 소개</RouterLink> |
      <RouterLink to="/moa/moaplace/guide">MOAPLACE 홀 안내</RouterLink> |
      <RouterLink to="/moa/moaplace/navi">MOAPLACE 오시는 길 안내</RouterLink> |
      <RouterLink to="/moa/moaplace/news">MOAPLACE 새소식</RouterLink> |
      <RouterLink to="/moa/moaplace/news/detail"
        >MOAPLACE 새소식 상세페이지</RouterLink
      >
      |
      <RouterLink to="/moa/moaplace/news/update"
        >MOAPLACE 새소식 수정페이지</RouterLink
      >
    </nav>

    <RouterView />
  </div>
</template>

<style>
</style>
