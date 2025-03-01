// pokemonData.js
const unevolved = [
  { id: 3, name: "이상해꽃", type: "Grass/Poison" },
    { id: 6, name: "리자몽", type: "Fire/Flying" },
    { id: 9, name: "거북왕", type: "Water" },
    { id: 12, name: "버터플", type: "Bug/Flying" },
    { id: 15, name: "독침붕", type: "Bug/Poison" },
    { id: 18, name: "피죤투", type: "Normal/Flying" },
    { id: 20, name: "레트라", type: "Normal" },
    { id: 22, name: "깨비드릴조", type: "Normal/Flying" },
    { id: 24, name: "아보크", type: "Poison" },
    { id: 26, name: "라이츄", type: "Electric" },
    { id: 28, name: "고지", type: "Ground" },
    { id: 31, name: "니드퀸", type: "Poison/Ground" },
    { id: 34, name: "니드킹", type: "Poison/Ground" },
    { id: 36, name: "픽시", type: "Fairy" },
    { id: 38, name: "나인테일", type: "Fire" },
    { id: 40, name: "푸크린", type: "Normal/Fairy" },
    { id: 42, name: "골뱃", type: "Poison/Flying" },
    { id: 45, name: "라플레시아", type: "Grass/Poison" },
    { id: 182, name: "아르코", type: "Grass" },
    { id: 47, name: "파라섹트", type: "Bug/Grass" },
    { id: 49, name: "도나리", type: "Bug/Poison" },
    { id: 51, name: "닥트리오", type: "Ground" },
    { id: 53, name: "페르시온", type: "Normal" },
    { id: 863, name: "나이킹", type: "Steel" },
    { id: 55, name: "골덕", type: "Water" },
    { id: 979, name: "저승갓숭", type: "Fighting/Ghost" },
    { id: 59, name: "윈디", type: "Fire" },
    { id: 62, name: "강챙이", type: "Water/Fighting" },
    { id: 186, name: "왕구리", type: "Water" },
    { id: 65, name: "후딘", type: "Psychic" },
    { id: 68, name: "괴력몬", type: "Fighting" },
    { id: 71, name: "우츠보트", type: "Grass/Poison" },
    { id: 73, name: "독파리", type: "Water/Poison" },
    { id: 76, name: "딱구리", type: "Rock/Ground" },
    { id: 78, name: "날쌩마", type: "Fire" },
    { id: 80, name: "야도란", type: "Water/Psychic" },
    { id: 199, name: "야도킹", type: "Water/Psychic" },
    { id: 462, name: "자포코일", type: "Electric/Steel" },
    { id: 865, name: "창파나이트", type: "Fighting" },
    { id: 85, name: "두트리오", type: "Normal/Flying" },
    { id: 87, name: "쥬레곤", type: "Water/Ice" },
    { id: 89, name: "질뻐기", type: "Poison/Dark" },
    { id: 91, name: "파르셀", type: "Water/Ice" },
    { id: 94, name: "팬텀", type: "Ghost/Poison" },
    { id: 208, name: "강철톤", type: "Steel/Ground" },
    { id: 97, name: "슬리퍼", type: "Psychic" },
    { id: 99, name: "킹크랩", type: "Water" },
    { id: 101, name: "붐볼", type: "Electric" },
    { id: 103, name: "나시", type: "Grass/Psychic" },
    { id: 105, name: "텅구리", type: "Ground" },
    { id: 106, name: "시라소몬", type: "Fighting" },
    { id: 107, name: "홍수몬", type: "Fighting" },
    { id: 237, name: "카포에라", type: "Fighting" },
    { id: 463, name: "내룸벨트", type: "Normal" },
    { id: 110, name: "또도가스", type: "Poison" },
    { id: 464, name: "거대코뿌리", type: "Ground/Rock" },
    { id: 242, name: "해피너스", type: "Normal" },
    { id: 465, name: "덩쿠림보", type: "Grass" },
    { id: 115, name: "캥카", type: "Normal" },
    { id: 230, name: "킹드라", type: "Water/Dragon" },
    { id: 119, name: "왕콘치", type: "Water" },
    { id: 121, name: "아쿠스타", type: "Water/Psychic" },
    { id: 122, name: "마임맨", type: "Psychic/Fairy" },
    { id: 866, name: "마임꽁꽁", type: "Ice/Psychic" },
    { id: 212, name: "핫삼", type: "Bug/Steel" },
    { id: 900, name: "사마자르", type: "Bug/Rock" },
    { id: 124, name: "루주라", type: "Ice/Psychic" },
    { id: 466, name: "에레키블", type: "Electric" },
    { id: 467, name: "마그마번", type: "Fire" },
    { id: 127, name: "쁘사이저", type: "Bug" },
    { id: 130, name: "갸라도스", type: "Water/Flying" },
    { id: 131, name: "라프라스", type: "Water/Ice" },
    { id: 132, name: "메타몽", type: "Normal" },
    { id: 134, name: "샤미드", type: "Water" },
    { id: 135, name: "쥬피썬더", type: "Electric" },
    { id: 136, name: "부스터", type: "Fire" },
    { id: 196, name: "에브이", type: "Psychic" },
    { id: 197, name: "블래키", type: "Dark" },
    { id: 470, name: "리피아", type: "Grass" },
    { id: 471, name: "글레이시아", type: "Ice" },
    { id: 700, name: "님피아", type: "Fairy" },
    { id: 474, name: "폴리곤Z", type: "Normal" },
    { id: 139, name: "암스타", type: "Rock/Water" },
    { id: 141, name: "투구푸스", type: "Rock/Water" },
    { id: 142, name: "프테라", type: "Rock/Flying" },
    { id: 143, name: "잠만보", type: "Normal" },
    { id: 149, name: "망나뇽", type: "Dragon/Flying" },
    { id: 154, name: "메가니움", type: "Grass" },
    { id: 157, name: "블레이범", type: "Fire" },
    { id: 160, name: "장크로다일", type: "Water" },
    { id: 162, name: "다꼬리", type: "Normal" },
    { id: 164, name: "야부엉", type: "Normal/Flying" },
    { id: 166, name: "레디안", type: "Bug/Flying" },
    { id: 168, name: "아리아도스", type: "Bug/Poison" },
    { id: 171, name: "랜턴", type: "Water/Electric" },
    { id: 468, name: "토게키스", type: "Fairy/Flying" },
    { id: 178, name: "네이티오", type: "Psychic/Flying" },
    { id: 181, name: "전룡", type: "Electric" },
    { id: 184, name: "마릴리", type: "Water/Fairy" },
    { id: 185, name: "꼬지모", type: "Rock" },
    { id: 189, name: "솜솜코", type: "Grass/Flying" },
    { id: 424, name: "겟핸보숭", type: "Normal" },
    { id: 192, name: "해루미", type: "Grass" },
    { id: 469, name: "메가자리", type: "Bug/Flying" },
    { id: 195, name: "누오", type: "Water/Ground" },
    { id: 980, name: "토오", type: "Poison/Ground" },
    { id: 430, name: "돈크로우", type: "Dark/Flying" },
    { id: 429, name: "무우마직", type: "Ghost" },
    { id: 201, name: "안농", type: "Psychic" },
    { id: 202, name: "마자용", type: "Psychic" },
    { id: 981, name: "키키링", type: "Normal/Psychic" },
    { id: 205, name: "쏘콘", type: "Bug/Steel" },
    { id: 917, name: "노고고치", type: "Normal/Dragon" },
    { id: 472, name: "글라이온", type: "Ground/Flying" },
    { id: 210, name: "그랑블루", type: "Fairy" },
    { id: 904, name: "장침바루", type: "Dark/Poison" },
    { id: 213, name: "단단지", type: "Bug/Rock" },
    { id: 214, name: "헤라크로스", type: "Bug/Fighting" },
    { id: 461, name: "포푸니라", type: "Dark/Ice" },
    { id: 903, name: "포푸니크", type: "Dark/Poison" },
    { id: 901, name: "다투곰", type: "Normal/Fighting" },
    { id: 219, name: "마그카르고", type: "Fire/Rock" },
    { id: 473, name: "맘모꾸리", type: "Ice/Ground" },
    { id: 864, name: "산호르곤", type: "Ghost" },
    { id: 224, name: "대포무노", type: "Water" },
    { id: 225, name: "딜리버드", type: "Ice/Flying" },
    { id: 226, name: "만타인", type: "Water/Flying" },
    { id: 227, name: "무장조", type: "Steel/Flying" },
    { id: 229, name: "헬가", type: "Dark/Fire" },
    { id: 232, name: "코리갑", type: "Ground" },
    { id: 899, name: "신비록", type: "Normal/Psychic" },
    { id: 235, name: "루브도", type: "Normal" },
    { id: 241, name: "밀탱크", type: "Normal" },
    { id: 248, name: "마기라스", type: "Rock/Dark" },
    { id: 254, name: "나무킹", type: "Grass" },
    { id: 257, name: "번치코", type: "Fire/Fighting" },
    { id: 260, name: "대짱이", type: "Water/Ground" },
    { id: 262, name: "그라에나", type: "Dark" },
    { id: 264, name: "직구리", type: "Normal" },
    { id: 267, name: "뷰티플라이", type: "Bug/Flying" },
    { id: 269, name: "독케일", type: "Bug/Poison" },
    { id: 272, name: "로파파", type: "Water/Grass" },
    { id: 275, name: "다탱구", type: "Grass/Dark" },
    { id: 277, name: "스왈로", type: "Normal/Flying" },
    { id: 279, name: "패리퍼", type: "Water/Flying" },
    { id: 282, name: "가디안", type: "Psychic/Fairy" },
    { id: 475, name: "엘레이드", type: "Psychic/Fighting" },
    { id: 284, name: "비나방", type: "Bug/Flying" },
    { id: 286, name: "버섯모", type: "Grass/Fighting" },
    { id: 289, name: "게을킹", type: "Normal" },
    { id: 291, name: "아이스크", type: "Bug/Flying" },
    { id: 295, name: "폭음룡", type: "Normal" },
    { id: 297, name: "하리뭉", type: "Fighting" },
    { id: 476, name: "대코파스", type: "Rock/Steel" },
    { id: 301, name: "델케티", type: "Normal" },
    { id: 302, name: "깜까미", type: "Dark/Fairy" },
    { id: 303, name: "입치트", type: "Steel/Fairy" },
    { id: 306, name: "보스로라", type: "Steel/Rock" },
    { id: 308, name: "요가램", type: "Fighting/Psychic" },
    { id: 310, name: "썬더볼트", type: "Electric" },
    { id: 311, name: "플러시", type: "Electric" },
    { id: 312, name: "마이농", type: "Electric" },
    { id: 313, name: "볼비트", type: "Bug" },
    { id: 314, name: "네오비트", type: "Bug" },
    { id: 407, name: "로즈레이드", type: "Grass/Poison" },
    { id: 317, name: "꿀꺽몬", type: "Poison" },
    { id: 319, name: "샤크니아", type: "Water/Dark" },
    { id: 321, name: "고래왕", type: "Water" },
    { id: 323, name: "폭타", type: "Fire/Ground" },
    { id: 326, name: "피그킹", type: "Normal" },
    { id: 327, name: "얼루기", type: "Normal" },
    { id: 330, name: "플라이곤", type: "Ground/Dragon" },
    { id: 332, name: "밤선인", type: "Grass/Dark" },
    { id: 334, name: "파비코리", type: "Dragon/Fairy" },
    { id: 335, name: "쟝고", type: "Normal" },
    { id: 336, name: "세비퍼", type: "Poison" },
    { id: 337, name: "루나톤", type: "Rock/Psychic" },
    { id: 338, name: "솔록", type: "Rock/Psychic" },
    { id: 340, name: "메깅", type: "Water/Ground" },
    { id: 342, name: "가재장군", type: "Water/Dark" },
    { id: 344, name: "점토도리", type: "Ground/Psychic" },
    { id: 346, name: "릴리요", type: "Rock/Grass" },
    { id: 348, name: "아말도", type: "Rock/Bug" },
    { id: 350, name: "밀로틱", type: "Water" },
    { id: 351, name: "캐스퐁", type: "Normal" },
    { id: 352, name: "켈리몬", type: "Normal" },
    { id: 354, name: "다크펫", type: "Ghost" },
    { id: 477, name: "야느와르몽", type: "Ghost" },
    { id: 357, name: "트로피우스", type: "Grass/Flying" },
    { id: 358, name: "치렁", type: "Psychic" },
    { id: 359, name: "앱솔", type: "Dark" },
    { id: 362, name: "얼음귀신", type: "Ice" },
    { id: 478, name: "눈여아", type: "Ice/Ghost" },
    { id: 365, name: "씨카이저", type: "Water/Ice" },
    { id: 367, name: "헌테일", type: "Water" },
    { id: 368, name: "분홍장이", type: "Water" },
    { id: 369, name: "시라칸", type: "Water/Rock" },
    { id: 370, name: "사랑둥이", type: "Water" },
    { id: 373, name: "보만다", type: "Dragon/Flying" },
    { id: 376, name: "메타그로스", type: "Steel/Psychic" },
    { id: 389, name: "토대부기", type: "Grass/Ground" },
    { id: 392, name: "초염몽", type: "Fire/Fighting" },
    { id: 395, name: "엠페르트", type: "Water/Steel" },
    { id: 398, name: "찌르호크", type: "Normal/Flying" },
    { id: 400, name: "비버통", type: "Normal/Water" },
    { id: 402, name: "귀뚤톡크", type: "Bug" },
    { id: 405, name: "렌트라", type: "Electric" },
    { id: 409, name: "램펄드", type: "Rock" },
    { id: 411, name: "바리톱스", type: "Rock/Steel" },
    { id: 414, name: "나메일", type: "Bug/Flying" },
    { id: 416, name: "비퀸", type: "Bug/Flying" },
    { id: 417, name: "파치리스", type: "Electric" },
    { id: 419, name: "플로젤", type: "Water" },
    { id: 421, name: "체리꼬", type: "Grass" },
    { id: 423, name: "트리토돈", type: "Water/Ground" },
    { id: 426, name: "둥실라이드", type: "Ghost/Flying" },
    { id: 428, name: "이어롭", type: "Normal" },
    { id: 432, name: "몬냥이", type: "Normal" },
    { id: 435, name: "스컹탱크", type: "Poison/Dark" },
    { id: 437, name: "동탁군", type: "Steel/Psychic" },
    { id: 441, name: "페라페", type: "Normal/Flying" },
    { id: 442, name: "화강돌", type: "Ghost/Dark" },
    { id: 445, name: "한카리아스", type: "Dragon/Ground" },
    { id: 448, name: "루카리오", type: "Fighting/Steel" },
    { id: 450, name: "하마돈", type: "Ground" },
    { id: 452, name: "드래피온", type: "Poison/Dark" },
    { id: 454, name: "독개굴", type: "Poison/Fighting" },
    { id: 455, name: "무스틈니", type: "Grass" },
    { id: 457, name: "네오라이트", type: "Water" },
    { id: 460, name: "눈설왕", type: "Grass/Ice" },
    { id: 479, name: "로토무", type: "Electric/Ghost" },
    { id: 497, name: "샤로다", type: "Grass" },
    { id: 500, name: "염무왕", type: "Fire/Fighting" },
    { id: 503, name: "대검귀", type: "Water" },
    { id: 505, name: "보르그", type: "Normal" },
    { id: 508, name: "바랜드", type: "Normal" },
    { id: 510, name: "레파르다스", type: "Dark" },
    { id: 512, name: "야나키", type: "Grass" },
    { id: 514, name: "바오키", type: "Fire" },
    { id: 516, name: "앗차키", type: "Water" },
    { id: 518, name: "몽얌나", type: "Psychic" },
    { id: 521, name: "켄호로우", type: "Normal/Flying" },
    { id: 523, name: "제브라이카", type: "Electric" },
    { id: 526, name: "기가이어스", type: "Rock" },
    { id: 528, name: "맘박쥐", type: "Psychic/Flying" },
    { id: 530, name: "몰드류", type: "Ground/Steel" },
    { id: 531, name: "다부니", type: "Normal" },
    { id: 534, name: "노보청", type: "Fighting" },
    { id: 537, name: "두빅굴", type: "Water/Ground" },
    { id: 538, name: "던지미", type: "Fighting" },
    { id: 539, name: "타격귀", type: "Fighting" },
    { id: 542, name: "모아머", type: "Bug/Grass" },
    { id: 545, name: "펜드라", type: "Bug/Poison" },
    { id: 547, name: "엘풍", type: "Grass/Fairy" },
    { id: 549, name: "드레디어", type: "Grass" },
    { id: 902, name: "대쓰여너", type: "Water/Dragon" },
    { id: 553, name: "악비아르", type: "Ground/Dark" },
    { id: 555, name: "불비달마", type: "Fire" },
    { id: 556, name: "마라카치", type: "Grass" },
    { id: 558, name: "암팰리스", type: "Bug/Rock" },
    { id: 560, name: "곤율거니", type: "Dark/Fighting" },
    { id: 561, name: "심보러", type: "Psychic/Flying" },
    { id: 563, name: "데스니칸", type: "Ghost" },
    { id: 867, name: "데스판", type: "Ground/Ghost" },
    { id: 565, name: "늑골라", type: "Water/Rock" },
    { id: 567, name: "아케오스", type: "Rock/Flying" },
    { id: 569, name: "더스트나", type: "Poison" },
    { id: 571, name: "조로아크", type: "Dark" },
    { id: 573, name: "치라치노", type: "Normal" },
    { id: 576, name: "고디모아젤", type: "Psychic" },
    { id: 579, name: "란쿨루스", type: "Psychic" },
    { id: 581, name: "스완나", type: "Water/Flying" },
    { id: 584, name: "배바닐라", type: "Ice" },
    { id: 586, name: "바라철록", type: "Normal/Grass" },
    { id: 587, name: "에몽가", type: "Electric/Flying" },
    { id: 589, name: "슈바르고", type: "Bug/Steel" },
    { id: 591, name: "뽀록나", type: "Grass/Poison" },
    { id: 593, name: "탱탱겔", type: "Water/Ghost" },
    { id: 594, name: "맘복치", type: "Water" },
    { id: 596, name: "전툴라", type: "Bug/Electric" },
    { id: 598, name: "너트령", type: "Grass/Steel" },
    { id: 601, name: "기기기어르", type: "Steel" },
    { id: 604, name: "저리더프", type: "Electric" },
    { id: 606, name: "벰크", type: "Psychic" },
    { id: 609, name: "샹델라", type: "Ghost/Fire" },
    { id: 612, name: "액스라이즈", type: "Dragon" },
    { id: 614, name: "툰베어", type: "Ice" },
    { id: 615, name: "프리지오", type: "Ice" },
    { id: 617, name: "어지리더", type: "Bug" },
    { id: 618, name: "메더", type: "Ground/Electric" },
    { id: 620, name: "비조도", type: "Fighting" },
    { id: 621, name: "크리만", type: "Dragon" },
    { id: 623, name: "골루그", type: "Ground/Ghost" },
    { id: 983, name: "대도각참", type: "Dark/Steel" },
    { id: 626, name: "버프론", type: "Normal" },
    { id: 628, name: "워글", type: "Normal/Flying" },
    { id: 630, name: "버랜지나", type: "Dark/Flying" },
    { id: 631, name: "앤티골", type: "Fire" },
    { id: 632, name: "아이앤트", type: "Bug/Steel" },
    { id: 635, name: "삼삼드래", type: "Dark/Dragon" },
    { id: 637, name: "불카모스", type: "Bug/Fire" },
    { id: 652, name: "브리가론", type: "Grass/Fighting"},
    {id: 655, name: "마폭시", type: "Fire/Psychic"},
    {id: 658, name: "개굴닌자", type: "Water/Dark"},
    {id: 663, name: "파이어로", type: "Fire/Flying"},
    {id: 675, name: "부란다", type: "Fighting/Dark"},
    {id: 683, name: "프레프티르", type: "Fairy"},
    {id: 685, name: "나루림", type: "Fairy"},
    {id: 697, name: "견고라스", type: "Rock/Dragon"},
    {id: 701, name: "루차불", type: "Fighting/Flying"},
    {id: 702, name: "데덴네", type: "Electric/Fairy"},
    {id: 703, name: "멜리시", type: "Rock/Fairy"},
    {id: 707, name: "클레피", type: "Steel/Fairy"},
    {id: 724, name: "모크나이퍼", type: "Grass/Ghost"},
    {id: 727, name: "어흥염", type: "Fire/Dark"},
    {id: 730, name: "누리레느", type: "Water/Fairy"},
    {id: 733, name: "왕큰부리", type: "Normal/Flying"},
    {id: 735, name: "형사구스", type: "Normal"},
    {id: 738, name: "투구뿌논", type: "Bug/Electric"},
    {id: 740, name: "모단단게", type: "Ice/Fighting"},
    {id: 741, name: "춤추새", type: "Fire/Flying"},
    {id: 743, name: "에리본", type: "Bug/Fairy"},
    {id: 745, name: "루가루암", type: "Rock"},
    {id: 746, name: "약어리", type: "Water"},
    {id: 748, name: "더시마사리", type: "Poison/Water"},
    {id: 750, name: "만마드", type: "Ground"},
    {id: 752, name: "깨비물거미", type: "Water/Bug"},
    {id: 754, name: "라란티스", type: "Grass"},
    {id: 756, name: "마셰이드", type: "Grass/Fairy"},
    {id: 758, name: "염뉴트", type: "Poison/Fire"},
    {id: 760, name: "이븐곰", type: "Normal/Fighting"},
    {id: 763, name: "달코퀸", type: "Grass"},
    {id: 764, name: "큐아링", type: "Fairy"},
    {id: 765, name: "하랑우탄", type: "Normal/Psychic"},
    {id: 766, name: "내던숭이", type: "Fighting"},
    {id: 768, name: "갑주무사", type: "Bug/Water"},
    {id: 770, name: "모래성이당", type: "Ghost/Ground"},
    {id: 771, name: "해무기", type: "Water"},
    {id: 774, name: "메테노", type: "Rock/Flying"},
    {id: 775, name: "자말라", type: "Normal"},
    {id: 776, name: "폭거북스", type: "Fire/Dragon"},
    {id: 777, name: "토게데마루", type: "Electric/Steel"},
    {id: 778, name: "따라큐", type: "Ghost/Fairy"},
    {id: 779, name: "치갈기", type: "Water/Psychic"},
    {id: 780, name: "할비롱", type: "Dragon"},
    {id: 781, name: "타타륜", type: "Ghost/Grass"},
    {id: 784, name: "짜랑고우거", type: "Dragon/Fighting"},
    {id: 812, name: "고릴타", type: "Grass"},
    {id: 815, name: "에이스번", type: "Fire"},
    {id: 818, name: "인텔리레온", type: "Water"},
    {id: 820, name: "요씽리스", type: "Normal"},
    {id: 823, name: "아머까오", type: "Flying/Steel"},
    {id: 826, name: "이올브", type: "Bug/Psychic"},
    {id: 828, name: "폭슬라이", type: "Dark"},
    {id: 830, name: "백솜모카", type: "Grass"},
    {id: 832, name: "배우르", type: "Normal"},
    {id: 834, name: "갈가부기", type: "Water/Rock"},
    {id: 836, name: "펄스멍", type: "Electric"},
    {id: 839, name: "석탄산", type: "Rock/Fire"},
    {id: 841, name: "애프룡", type: "Grass/Dragon"},
    {id: 842, name: "단지래플", type: "Grass/Dragon"},
    {id: 844, name: "사다이사", type: "Ground"},
    {id: 845, name: "윽우지", type: "Flying/Water"},
    {id: 847, name: "꼬치조", type: "Water"},
    {id: 849, name: "스트린더", type: "Electric/Poison"},
    {id: 851, name: "다태우지네", type: "Fire/Bug"},
    {id: 853, name: "케오퍼스", type: "Fighting"},
    {id: 855, name: "포트데스", type: "Ghost"},
    {id: 858, name: "브리무음", type: "Fairy"},
    {id: 861, name: "오롱털", type: "Dark/Fairy"},
    {id: 869, name: "마휘핑", type: "Fairy"},
    {id: 870, name: "대여르", type: "Fighting"},
    {id: 871, name: "찌르성게", type: "Electric"},
    {id: 873, name: "모스노우", type: "Ice/Bug"},
    {id: 874, name: "돌헨진", type: "Rock"},
    {id: 875, name: "빙큐보", type: "Ice"},
    {id: 876, name: "에써르", type: "Psychic/Normal"},
    {id: 877, name: "모르페코", type: "Electric/Dark"},
    {id: 879, name: "대왕끼리동", type: "Steel"},
    {id: 880, name: "파치래곤", type: "Electric/Dragon"},
    {id: 881, name: "파치르돈", type: "Electric/Ice"},
    {id: 882, name: "어래곤", type: "Water/Dragon"},
    {id: 883, name: "어치르돈", type: "Water/Ice"},
    {id: 884, name: "두랄루돈", type: "Steel/Dragon"},
    {id: 887, name: "드래펄트", type: "Dragon/Ghost"},
];

export default unevolved;
