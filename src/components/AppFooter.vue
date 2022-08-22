<template>
  <footer id="footer">
    <div class="footer-wrap">
        <h2 class="logo">
            <RouterLink
                to="/moaplace.com">
                모아플레이스
                <img src="@/assets/default/logo-white.png" alt="모아플레이스 푸터로고">
            </RouterLink>
        </h2>
        <ul class="footer-info">
            <li class="top">
                <div>
                    <span>ADDRESS.</span>
                    <p>서울특별시 종로구 율곡로10길 105 디아망 4F(봉익동 10-1 디아망 4F)</p>
                </div>
                <div>
                    <span>TEL.</span>
                    <p>070-8240-3211~3</p>
                </div>
            </li>
            <li class="bottom">
                <p>문화예술을 통한 즐거움과 감동을 한 곳에 모아, MOA PLACE</p>
                <p>이 웹페이지는 공부를 위해 만들어진 프로젝트 페이지입니다.</p>
            </li>
        </ul>
    </div>
  </footer>
</template>

<script>
    export default {
        name: 'AppFooter',
    }
</script>

<style lang="scss" scoped>
    @import "@/scss/common.scss";
    *{margin:0; padding: 0; list-style: none;text-decoration: none;}
    a:hover{color: #fff;}

    footer#footer{
        width: 100%;
        background: $black;
        color: rgba(#fff, 0.6);
        .footer-wrap{
            width: $width;
            margin: 0 auto;
            display: flex;
            flex-flow: row wrap;
            padding: 32px 0;

            .logo{
                font-size: 0;
                width: 240px;
            }

            .footer-info{
                width: calc(100% - 240px);
                font-size: 14px;
                .top div{
                    display: flex;
                    margin-bottom: 8px;
                    span{
                        font-family: 'Roboto', sans-serif;
                        display: inline-block;
                        width: 80px;
                    }
                }
                .bottom{
                    border-top: 1px solid rgba(#fff, 0.6);
                    margin-top: 16px;
                    padding-top: 16px;
                    line-height: 24px;
                }
            }
        }
    }
    
</style>