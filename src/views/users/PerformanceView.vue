<template>
  <div id="wrap">
    <div id="box" class="black">
      <!-- 사이드 메뉴 -->
      <div class="rounded left">
        <div class="top fs-6">
          <span class="fs-4 brown">사용자</span>님, 안녕하세요.
        </div>
        <div class="mid fs-6 fw-bold">
          <p>
            현재 보유 적립금
          </p>
          <p class="text-end">
            <span class="fs-3 text-end">5,000</span>원
          </p>
        </div>
        <div class="bot">
          <ul class="nav flex-column fs-6">
            <li class="nav-item">
              <a class="nav-link active fw-bold" aria-current="page" href="#">마이페이지</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">내 관심 공연</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">예매내역</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">대관내역</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">관람 후기</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">1:1 문의</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">내 정보 수정</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">로그아웃</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">회원 탈퇴</a>
            </li>
          </ul>
        </div>
      </div>
      <!-- 내역 -->
      <div class="rounded right">
        <!-- 관심공연 목록 -->
        <div id="mylist">
          <div class="title">
            <span class="fs-5 fw-bold">내 관심 공연</span>
            <span class="fs-7">회원님께서는 현재 <span class="fs-6 fw-bold brown">1건</span>의 관심공연이 등록되어 있습니다.</span>
          </div>
          <div>
            <table class="table table-borderless myborder ticket-table">
              <thead>
                <tr class="text-center">
                  <th class="col col-md-1">번호</th>
                  <th class="col col-md-2">공연정보</th>
                  <th class="col col-md-1">분류</th>
                  <th class="col col-md-1 end">삭제</th>
                </tr>
              </thead>
              <tbody class="fs-7">
                <tr>
                  <td>
                    <div class="text-center">
                      <span>1</span>
                    </div>
                  </td>
                  <td>
                    <a href="">
                      <div class="info">
                        <div class="img2"></div>
                        <div class="txt">
                          <p class="fs-5 fw-bold">Title</p>
                          <table>
                            <tr>
                              <th>기간</th>
                              <td>2022.08.10 ~ 2022.09.20</td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    </a>
                  </td>
                  <td class="text-center">250,000원</td>
                  <td class="text-center end"><button type="button" class="btn btn-outline-secondary fs-6 fw-bold mybtn">삭제</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- 페이징 -->
        <div id="mypaging">
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item">
                <a class="page-link" href="" aria-label="Previous">
                  <span aria-hidden="true">
                    &laquo;
                  </span>
                </a>
              </li>
              <li class="page-item"><a class="page-link" href="">1</a></li>
              <li class="page-item"><a class="page-link" href="">2</a></li>
              <li class="page-item"><a class="page-link" href="">3</a></li>
              <li class="page-item"><a class="page-link" href="">4</a></li>
              <li class="page-item"><a class="page-link" href="">5</a></li>
              <li class="page-item">
                <a class="page-link" href="" aria-label="Next">
                  <span aria-hidden="true">
                    &raquo;
                  </span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PerformanceView'
}
</script>

<style lang="scss">
@import '../../scss/common.scss';

</style>