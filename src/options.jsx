import React from "react";
import { render } from "react-dom";

function Options() {
  return <><h1>Rpha Search!</h1>
  <h2>1. how to use?</h2>
  <h3>사진첨부</h3>
  <h2>2. what is Rlphi?</h2>
 <img src="logo512.png" />
 <h3>
 <p>를피는 스위스 알프스산맥에 거주하는 귀여운 아기 알파카 입니다 ^^<br/>
 를피 프로필<br/>
 거주지역      : 알프스 산맥<br/>
 가장 잘하는것  : 데이터 검색<br/>
 가장 좋아하는색 : 코발트 블루<br/>
 가장 좋아하는 음식 : 솜사탕<br/>
 </p>
 </h3>
  <h2>3. reference?</h2>
<h3>찬혁님이 첨부</h3>
  
  <h2>4. developer</h2>
  <h3>메인 디렉터: 정찬혁<br/>
  개발자1 : 라경준<br/>
  개발자2 : 조성민<br/>
  개발자3 : 김서지<br/>
  개발자4 : 김진규<br/>
  일러스트레이터 : 김승은<br/>
  </h3></>;
}

render(<Options />, document.getElementById("root"));
