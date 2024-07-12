import React, { useEffect, useState } from "react";

const pokemonList = [
  { id: 1, name: "이상해씨" },
  { id: 4, name: "파이리" },
  { id: 7, name: "꼬부기" },
  { id: 10, name: "캐터피" },
  { id: 13, name: "뿔충이" },
  { id: 16, name: "구구" },
  { id: 19, name: "꼬렛" },
  { id: 21, name: "깨비참" },
  { id: 23, name: "아보" },
  { id: 27, name: "모래두지" },
  { id: 29, name: "니드런♀" },
  { id: 32, name: "니드런♂" },
  { id: 37, name: "식스테일" },
  { id: 42, name: "주뱃" },
  { id: 43, name: "뚜벅쵸" },
  { id: 46, name: "파라스" },
  { id: 48, name: "콘팡" },
  { id: 50, name: "디그다" },
  { id: 52, name: "나옹" },
  { id: 54, name: "고라파덕" },
  { id: 56, name: "망키" },
  { id: 58, name: "가디" },
  { id: 60, name: "발챙이" },
  { id: 63, name: "캐이시" },
  { id: 66, name: "알통몬" },
  { id: 69, name: "모다피" },
  { id: 72, name: "왕눈해" },
  { id: 74, name: "꼬마돌" },
  { id: 77, name: "포니타" },
  { id: 79, name: "야돈" },
  { id: 81, name: "코일" },
  { id: 83, name: "파오리" },
  { id: 84, name: "두두" },
  { id: 86, name: "쥬쥬" },
  { id: 88, name: "질퍽이" },
  { id: 90, name: "셀러" },
  { id: 92, name: "고오스" },
  { id: 95, name: "롱스톤" },
  { id: 96, name: "슬리프" },
  { id: 98, name: "크랩" },
  { id: 100, name: "찌리리공" },
  { id: 102, name: "아라리" },
  { id: 104, name: "탕구리" },
  { id: 108, name: "내루미" },
  { id: 109, name: "또가스" },
  { id: 111, name: "뿔카노" },
  { id: 113, name: "럭키" },
  { id: 114, name: "덩쿠리" },
  { id: 115, name: "캥카" },
  { id: 116, name: "쏘드라" },
  { id: 118, name: "콘치" },
  { id: 120, name: "별가사리" },
  { id: 123, name: "스라크" },
  { id: 124, name: "루주라" },
  { id: 127, name: "쁘사이저" },
  { id: 128, name: "켄타로스" },
  { id: 129, name: "잉어킹" },
  { id: 131, name: "라프라스" },
  { id: 132, name: "메타몽" },
  { id: 133, name: "이브이" },
  { id: 137, name: "폴리곤" },
  { id: 138, name: "암나이트" },
  { id: 140, name: "투구" },
  { id: 142, name: "프테라" },
  { id: 147, name: "미뇽" },
  { id: 152, name: "치코리타" },
  { id: 155, name: "브케인" },
  { id: 158, name: "리아코" },
  { id: 161, name: "꼬리선" },
  { id: 163, name: "부우부" },
  { id: 165, name: "레디바" },
  { id: 167, name: "페이검" },
  { id: 170, name: "초라기" },
  { id: 172, name: "피츄" },
  { id: 173, name: "삐" },
  { id: 174, name: "푸푸린" },
  { id: 175, name: "토게피" },
  { id: 177, name: "네이티" },
  { id: 179, name: "메리프" },
  { id: 182, name: "아르코" },
  { id: 186, name: "왕구리" },
  { id: 187, name: "통통코" },
  { id: 190, name: "에이팜" },
  { id: 191, name: "해너츠" },
  { id: 193, name: "왕자리" },
  { id: 194, name: "우파" },
  { id: 198, name: "니로우" },
  { id: 200, name: "무우마" },
  { id: 201, name: "안농" },
  { id: 203, name: "키링키" },
  { id: 204, name: "피콘" },
  { id: 206, name: "노고치" },
  { id: 207, name: "글라이거" },
  { id: 209, name: "블루" },
  { id: 211, name: "침바루" },
  { id: 213, name: "단단지" },
  { id: 214, name: "헤라크로스" },
  { id: 215, name: "포푸니" },
  { id: 216, name: "깜지곰" },
  { id: 218, name: "마그마그" },
  { id: 220, name: "꾸꾸리" },
  { id: 222, name: "코산호" },
  { id: 223, name: "총어" },
  { id: 225, name: "딜리버드" },
  { id: 227, name: "무장조" },
  { id: 228, name: "델빌" },
  { id: 231, name: "코코리" },
  { id: 234, name: "노라키" },
  { id: 235, name: "루브도" },
  { id: 238, name: "뽀뽀라" },
  { id: 239, name: "에레키드" },
  { id: 240, name: "마그비" },
  { id: 241, name: "밀탱크" },
  { id: 246, name: "애버라스" },
  { id: 252, name: "나무지기" },
  { id: 255, name: "아차모" },
  { id: 258, name: "물짱이" },
  { id: 261, name: "포챠나" },
  { id: 263, name: "지그제구리" },
  { id: 265, name: "개무소" },
  { id: 270, name: "연꽃몬" },
  { id: 273, name: "도토링" },
  { id: 276, name: "테일로" },
  { id: 278, name: "갈모매" },
  { id: 280, name: "랄토스" },
  { id: 283, name: "비구술" },
  { id: 285, name: "버섯꼬" },
  { id: 287, name: "게을로" },
  { id: 290, name: "토중문" },
  { id: 293, name: "소곤룡" },
  { id: 296, name: "마크탕" },
  { id: 298, name: "루리리" },
  { id: 299, name: "코코파스" },
  { id: 300, name: "에나비" },
  { id: 302, name: "깜까미" },
  { id: 303, name: "입치트" },
  { id: 304, name: "가보리" },
  { id: 307, name: "요가랑" },
  { id: 309, name: "썬더라이" },
  { id: 311, name: "플러시" },
  { id: 312, name: "마이농" },
  { id: 313, name: "볼비트" },
  { id: 314, name: "네오비트" },
  { id: 316, name: "꼴깍몬" },
  { id: 318, name: "샤프니아" },
  { id: 320, name: "고래왕자" },
  { id: 322, name: "둔타" },
  { id: 324, name: "코터스" },
  { id: 325, name: "피그점프" },
  { id: 327, name: "얼루기" },
  { id: 328, name: "톱치" },
  { id: 331, name: "선인왕" },
  { id: 333, name: "파비코" },
  { id: 335, name: "쟝고" },
  { id: 336, name: "세비퍼" },
  { id: 337, name: "루나톤" },
  { id: 338, name: "솔록" },
  { id: 339, name: "미꾸리" },
  { id: 341, name: "가재군" },
  { id: 343, name: "오뚝군" },
  { id: 345, name: "릴링" },
  { id: 347, name: "아노딥스" },
  { id: 349, name: "빈티나" },
  { id: 351, name: "캐스풍" },
  { id: 353, name: "어둠대신" },
  { id: 355, name: "해골몽" },
  { id: 357, name: "트로피우스" },
  { id: 359, name: "앱솔" },
  { id: 360, name: "마자" },
  { id: 361, name: "눈꼬마" },
  { id: 363, name: "대굴레오" },
  { id: 366, name: "진주몽" },
  { id: 369, name: "시라칸" },
  { id: 370, name: "사랑둥이" },
  { id: 371, name: "아공이" },
  { id: 374, name: "메탕" },
  { id: 387, name: "모부기" },
  { id: 390, name: "불꽃숭이" },
  { id: 383, name: "팽도리" },
  { id: 396, name: "찌르꼬" },
  { id: 399, name: "비버니" },
  { id: 401, name: "귀뚤뚜기" },
  { id: 403, name: "꼬링크" },
  { id: 406, name: "꼬몽울" },
  { id: 408, name: "두개도스" },
  { id: 410, name: "방패톱스" },
  { id: 412, name: "도롱충이" },
  { id: 415, name: "세꿀버리" },
  { id: 417, name: "파치리스" },
  { id: 418, name: "브이젤" },
  { id: 420, name: "체리버" },
  { id: 422, name: "깝질무" },
  { id: 425, name: "흔들풍손" },
  { id: 427, name: "이어롤" },
  { id: 431, name: "나옹마" },
  { id: 433, name: "랑딸랑" },
  { id: 434, name: "스컹뿡" },
  { id: 436, name: "동미러" },
  { id: 438, name: "꼬지지" },
  { id: 439, name: "흉내내" },
  { id: 440, name: "핑복" },
  { id: 441, name: "페라페" },
  { id: 442, name: "화강돌" },
  { id: 443, name: "딥상어동" },
  { id: 446, name: "먹고자" },
  { id: 447, name: "리오르" },
  { id: 449, name: "히포포타스" },
  { id: 451, name: "스콜피" },
  { id: 453, name: "삐딱구리" },
  { id: 455, name: "무스틈니" },
  { id: 456, name: "형광어" },
  { id: 458, name: "타만타" },
  { id: 459, name: "눈쓰개" },
  { id: 479, name: "로토무" },
];

function App() {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      // 포켓몬 목록에서 랜덤으로 6마리 선택
      const selectedPokemon = [];
      while (selectedPokemon.length < 6) {
        const randomIndex = Math.floor(Math.random() * pokemonList.length);
        const randomPokemon = pokemonList[randomIndex];
        if (!selectedPokemon.includes(randomPokemon)) {
          selectedPokemon.push(randomPokemon);
        }
      }

      // 선택된 포켓몬들의 정보 가져오기
      const promises = selectedPokemon.map((pokemon) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`).then((response) => response.json())
      );
      const data = await Promise.all(promises);
      setPokemonData(data);
    };

    fetchPokemon().catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="App">
      <h1>Pokémon Information</h1>
      {pokemonData.length > 0 ? (
        pokemonData.map((pokemon) => (
          <div key={pokemon.id}>
            <h2>{pokemon.name}</h2>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
