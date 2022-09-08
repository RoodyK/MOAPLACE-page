# MOAPLACE
공연 및 공연관리와 공연장 대관이 가능한 공연사이트를 제작한다.

## 사용환경
- Vue.js
- VScode
- Bootstrap 5.1

## 프로젝트 관리
- Jira (프로젝트 관리)
- Git / Github
- Slack
- Whimsical (와이어프레임)
- Google SpreadSheet
- diagrams(draw.io)

## 프로젝트 개요
주제선정 -> 요구분석사항서 작성 -> DB 모델링(정규화) -> 와이어프레임제작 -> VSCode로 Vue.js CLI를 통한 CREATE app 생성 및 기본 설정 -> 프론트엔드 작업 -> Oracle 테이블 및 시퀀스 생성 -> STS설정(Maven 모듈 dependency) -> 백엔드 작업 및 프론트엔드 백엔드 데이터 연결(@RestController / Axios) -> 전체 기능 종합 및 디버깅

**고객**
- 로그인, 회원가입 기능 사용
- 마이페이지 이용가능
- 공연목록 및 일정 확인
- 공연 관심목록 등록 및 관람평 작성
- 절차에따른 공연 예매 및 대관 신청 가능
- 공지사항 및 공연장에 대한 정보와 위치 확인가능
- 공연에대한 유의사항 및 혜택 확인
- FAQ 및 관리자에게 1:1문의 신청 가능

<br/>

**관리자**
- 공연 매출관리
- 회원 관리
- 공연 일정 및 공연 등록, 예매관리
- 대관 신청관리
- 공지사항 및 문의관리


## 사용 라이브러리 

[vue-quill](https://vueup.github.io/vue-quill) <br/>
- Vue.js에서 사용가능한 텍스트 에디터 <br/>

[SASS](https://sass-lang.com) <br/>
- css의 중복을 제거하고 변수를 선언하는 등 보다 편하게 사용하게 해주는 css 확장 라이브러리 <br/>

[vue-google-charts](https://developers.google.com/chart) <br/>
- 차트를 사용할 수 있게해주는 google-charts 라이브러리 <br/>

[jquery](https://jquery.com) <br/>
- import API를 사용하기 위한 jquery (그 외의 사용x) <br/>

## 사용 API

- [카카오 로그인 API, 카카오 MAP API](https://developers.kakao.com) <br/>
- [구글차트 API](https://developers.google.com/chart) <br/>
- [다음postcode API](https://postcode.map.daum.net/guide) <br/>
- [아임포트 API](https://www.iamport.kr/) <br/>

## 주요기능
- 회원 기능은 JWT 토큰을 사용한 인증 처리
- Axios Interceptor를 사용하여 로그인한 사용자의 요청시 헤더에 토큰을 담아 전송
- Vue Router NavigationGuard를 사용한 페이지 권한 이동 처리
- 공지사항, 문의 등 게시글 등록 페이지 Vue-quill 에디터 적용
- 입력에대한 각각 정규식을 사용한 유효성검사 진행
- 메인페이지 슬라이드 및 게시글 로딩처리

