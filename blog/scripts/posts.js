var postsInfo = (function(){
    function getMeta(){
        var meta = {
            "1":{
                "title":"블로그 첫 글!",
                "created":"2014-09-29"
            },
            "2":{
                "title":"리눅스 크론탭(Linux Crontab) 사용법",
                "created":"2014-09-29"
            },
            "3":{
                "title":"자바 파일 입출력(Java File Input&Output)",
                "created":"2014-09-30"
            },
            "4":{
                "title":"리눅스 특수 문자 정리(Linux Shell)",
                "created":"2014-09-30"
            },
            "5":{
                "title":"node.js + socket.io 연습 중...",
                "created":"2014-10-02"
            },
            "6":{
                "title":"Spring 4 업데이트 및 websocket 테스트",
                "created":"2014-10-05"
            },
            "7":{
                "title":"Oracle WHERE 1=1 구문에 대하여",
                "created":"2014-10-07"
            },
            "8":{
                "title":"Oracle Replace() & Regexp_replace() 의 차이",
                "created":"2014-10-07"
            },
            "9":{
                "title":"네이버 블로그에서 이사 중",
                "created":"2014-10-09"
            },
            "10":{
                "title":"싱글튼 패턴(Singleton Pattern)",
                "created":"2014-10-09"
            },
            "11":{
                "title":"어댑터 패턴(Adapter Pattern)",
                "created":"2014-10-09"
            },
            "12":{
                "title":"2014.01.19 가복이",
                "created":"2014-10-12"
            },
            "13":{
                "title":"2014.01.28 아리누",
                "created":"2014-10-12"
            },
            "14":{
                "title":"아카이브 생성 및 해제(linux tar) 사용법",
                "created":"2014-10-12"
            },
            "15":{
                "title":"D3 차트를 하나 넣어봤습니다.",
                "created":"2014-10-12"
            },
            "16":{
                "title":"MongoDB 설치 및 환경설정(for Window7)",
                "created":"2014-10-13"
            },
            "17":{
                "title":"MongoDB Document & Collection & Insert",
                "created":"2014-10-13"
            },
            "18":{
                "title":"MongoDB CRUD 동작의 이해",
                "created":"2014-10-13"
            },
            "19":{
                "title":"블로그 새단장!",
                "created":"2014-10-15"
            },
            "20":{
                "title":"Esper + d3.js + socket.io + Node.js",
                "created":"2014-10-16"
            },
            "21":{
                "title":"Node.js & MongoDB 연동(with Mongoose)",
                "created":"2014-10-19"
            },
            "22":{
                "title":"파이썬 파일 읽기(Python File Read)",
                "created":"2014-10-20"
            },
            "23":{
                "title":"파이썬 명령행 인자 메뉴얼(Command Menual)",
                "created":"2014-10-20"
            },
            "24":{
                "title":"파이썬 야구 게임(Python Baseball Game)",
                "created":"2014-10-20"
            },
            "25":{
                "title":"폰트어썸 적용!",
                "created":"2014-10-22"
            },
            "26":{
                "title":"도메인 메일 신청",
                "created":"2014-10-23"
            },
            "27":{
                "title":"jQuery show() / hide() / toggle() 사용법",
                "created":"2014-10-23"
            },
            "28":{
                "title":"페이스북 연동",
                "created":"2014-10-26"
            },
            "29":{
                "title":"게시판(beta) 추가를 해봤습니다~",
                "created":"2014-10-29"
            },
            "30":{
                "title":"구글 +1 추가",
                "created":"2014-10-30"
            },
            "31":{
                "title":"AngularJS ngRepeat dupes Error",
                "created":"2014-11-03"
            },
            "32":{
                "title":"옵저버 패턴(Observer Pattern)",
                "created":"2014-11-05"
            },
            "33":{
                "title":"구글 다트(Google Dart)를 공부 해보자!",
                "created":"2014-11-06"
            },
            "34":{
                "title":"Install Oracle Instant Client",
                "created":"2014-11-20"
            },
            "35":{
                "title":"Oracle Sql Developer Error - not find jvm.dll",
                "created":"2014-11-21"
            },
            "36":{
                "title":"서버 복구!",
                "created":"2014-11-24"
            },
            "37":{
                "title":"서비스 이전!",
                "created":"2014-11-27"
            },
            "38":{
                "title":"미가동 서비스 복구 완료!",
                "created":"2014-11-28"
            },
            "39":{
                "title":"Ruby 2.1.5 설치",
                "created":"2014-11-29"
            },
            "40":{
                "title":"Ruby on Rails 시작!!",
                "created":"2014-12-01"
            },
            "41":{
                "title":"구글 폴리머(polymer-project)",
                "created":"2014-12-02"
            },
            "42":{
                "title":"DyGraphs 테스트",
                "created":"2014-12-04"
            },
            "43":{
                "title":"Blog 서브 도메인을 Node.js 웹어플리케이션으로 구축해봤습니다.",
                "created":"2014-12-05"
            },
            "44":{
                "title":"서버 메모리 한계 용량 근접...",
                "created":"2014-12-07"
            },
            "45":{
                "title":"Blog 도메인 포팅 완료",
                "created":"2014-12-08"
            },
            "46":{
                "title":"에스퍼(Epser)와 같이 사용해야할 것들",
                "created":"2014-12-09"
            },
            "47":{
                "title":"인터스텔라 관람",
                "created":"2014-12-13"
            },
            "48":{
                "title":"CORS 적용",
                "created":"2014-12-15"
            },
            "49":{
                "title":"Board 도메인 node.js 포팅 및 성능 문제...",
                "created":"2014-12-21"
            },
            "50":{
                "title":"off the apache2 test page on the CentOS 6.x",
                "created":"2014-12-22"
            },
            "51":{
                "title":"o.js 라이브러리 - Toast Message 기능",
                "created":"2014-12-26"
            },
            "52":{
                "title":"블로그 태그(Tag) 기능 추가",
                "created":"2014-12-29"
            },
            "53":{
                "title":"2015년이 되었습니다!",
                "created":"2015-01-02"
            },
            "54":{
                "title":"스트래티지 패턴(Strategy Pattern)",
                "created":"2015-01-09"
            },
            "55":{
                "title":"Oracle leading hint",
                "created":"2015-01-14"
            },
            "56":{
                "title":"jQuery API 정리 웹페이지 추천",
                "created":"2015-01-14"
            },
            "57":{
                "title":"jQuery append()/prepend()",
                "created":"2015-01-14"
            },
            "58":{
                "title":"Javascript parseInt() 함수",
                "created":"2015-01-14"
            },
            "59":{
                "title":"Google Go를 시작하며",
                "created":"2015-01-16"
            },
            "60":{
                "title":"Getting Started - Intasll Go",
                "created":"2015-01-20"
            },
            "61":{
                "title":"Google Go 문법 공부(한글 문서)",
                "created":"2015-01-20"
            },
            "62":{
                "title":"Javascript Use Strict",
                "created":"2015-01-21"
            },
            "63":{
                "title":"Grails란 무엇인가?",
                "created":"2015-01-21"
            },
            "64":{
                "title":"Javascript Objects",
                "created":"2015-01-23"
            },
            "65":{
                "title":"git 웹으로 배우기(Learn git using web)",
                "created":"2015-01-26"
            },
            "66":{
                "title":"JavaScript Object Properties",
                "created":"2015-01-26"
            },
            "67":{
                "title":"자바 디컴파일러(Java Decompiler)",
                "created":"2015-02-04"
            },
            "68":{
                "title":"자바 리플렉션 테스트(Java Reflection Test)",
                "created":"2015-02-04"
            },
            "69":{
                "title":"자바 쓰레드 기초(Java Thread Basic)",
                "created":"2015-02-13"
            },
            "70":{
                "title":"텍스트 기반 웹 게임 소개(a Dark Room, Candy box)",
                "created":"2015-02-13"
            },
            "71":{
                "title":"오라클 달, 일, 월 처음&마지막 날짜 구하기",
                "created":"2015-02-16"
            },
            "72":{
                "title":"자바 Runnable를 이용해 쓰레드 만들기 (Java Runnable Interface)",
                "created":"2015-02-17"
            },
            "73":{
                "title":"설 연휴가 끝났어요.",
                "created":"2015-02-23"
            },
            "74":{
                "title":"리눅스 리다이렉션 & 파이프(Linux redirection & pipe)",
                "created":"2015-02-23"
            },
            "75":{
                "title":"최근 현황은 게임...?",
                "created":"2015-02-23"
            },
            "76":{
                "title":"C언어 파일 권한 체크 - access() 사용법",
                "created":"2015-02-24"
            },
            "77":{
                "title":"오라클 Inner Join 구문 비교 (Implicit vs Explicit)",
                "created":"2015-02-25"
            },
            "78":{
                "title":"데코레이터 패턴(Decorator Pattern)",
                "created":"2015-02-27"
            },
            "79":{
                "title":"정규 표현식 문자열 테스터[web](regular expression tester)",
                "created":"2015-03-04"
            },
            "80":{
                "title":"C++ map 예제(C++ map example)",
                "created":"2015-03-05"
            },
            "81":{
                "title":"스프링 프로필 설정(Spring Profile)",
                "created":"2015-03-06"
            },
            "82":{
                "title":"스칼라 개발 툴 다운로드(IDE for Scala)",
                "created":"2015-03-09"
            },
            "83":{
                "title":"Scala Hello World!",
                "created":"2015-03-09"
            },
            "84":{
                "title":"C 파일 사이즈 구하기(Getting file size with C)",
                "created":"2015-03-10"
            },
            "85":{
                "title":"스칼라 문법 요약(Scala Cheatsheets)",
                "created":"2015-03-11"
            },
            "86":{
                "title":"jQuery 테이블 데이터 정렬(using tablesorter)",
                "created":"2015-03-11"
            },
            "87":{
                "title":"특수 기호/문자 읽는법",
                "created":"2015-03-11"
            },
            "88":{
                "title":"톰캣 로드밸런서 사용법(tomcat loadbalancers)",
                "created":"2015-03-12"
            },
            "89":{
                "title":"스칼라 학교(scala school)",
                "created":"2015-03-12"
            },
            "90":{
                "title":"sbt 설치하기(Installing Simple Build Tool)",
                "created":"2015-03-13"
                ,"version":"v1"
            },
            "91":{
                "title":"쿼리 실행 순서(SELECT 구문)",
                "created":"2015-03-16"
                ,"version":"v1"
            },
            "92":{
                "title":"차트 라이브러리 highcharts",
                "created":"2015-03-16"
                ,"version":"v1"
            },
            "93":{
                "title":"Tomcat document root 설정",
                "created":"2015-03-17"
                ,"version":"v1"
            },
            "94":{
                "title":"스칼라 파일 읽기(read file with scala)",
                "created":"2015-03-17"
                ,"version":"v1"
            },
            "95":{
                "title":"정보보안기사 준비!",
                "created":"2015-03-23"
                ,"version":"v1"
            },
            "96":{
                "title":"스칼라 정규 표현식 CASE 처리",
                "created":"2015-03-24"
                ,"version":"v1"
            },
            "97":{
                "title":"자바스크립트 타이밍 이벤트(javascript timing events)",
                "created":"2015-03-26"
                ,"version":"v1"
            },
            "98":{
                "title":"어셈블리어(Assembly Language)",
                "created":"2015-03-30"
                ,"version":"v1"
            },
            "99":{
                "title":"빌드 자동화 도구 Gradle 설치(install Gradle)",
                "created":"2015-03-31"
                ,"version":"v1"
            },
            "100":{
                "title":"Gradle를 이용한 자바 프로젝트 빌드",
                "created":"2015-03-31"
                ,"version":"v1"
            },
            "101":{
                "title":"Convention over configuration(CoC)의 이해",
                "created":"2015-04-01"
                ,"version":"v1"
            },
            "102":{
                "title":"Spring Boot Getting Started",
                "created":"2015-04-01"
                ,"version":"v1"
            },
            "103":{
                "title":"신경망 알고리즘(Neural Network)",
                "created":"2015-04-01"
                ,"version":"v1"
            },
            "104":{
                "title":"유전 알고리즘(Genetic Algorithms)",
                "created":"2015-04-02"
                ,"version":"v1"
            },
            "105":{
                "title":"Spring Boot with STS(Spring Tool Suite)",
                "created":"2015-04-02"
                ,"version":"v1"
            },
            "106":{
                "title":"sts를 이용한 github 저장소 업로드",
                "created":"2015-04-03"
                ,"version":"v1"
            },
            "107":{
                "title":"서버 메모리 압박 두번째.",
                "created":"2015-04-06"
                ,"version":"v1"
            },
            "108":{
                "title":"SpringBoot 프로젝트를 API 서버로!",
                "created":"2015-04-07"
            },
            "109":{
                "title":"Caused by: java.net.SocketException: 파이프가 깨어짐",
                "created":"2015-04-08"
                ,"version":"v1"
            },
            "110":{
                "title":"서버 어플리케이션 근황",
                "created":"2015-04-08"
                ,"version":"v1"
            },
            "111":{
                "title":"Multivariate adaptive regression splines(MARS)",
                "created":"2015-04-09"
                ,"version":"v1"
            },
            "112":{
                "title":"Support vector machine(SVMs)",
                "created":"2015-04-09"
                ,"version":"v1"
            },
            "113":{
                "title":"머신 러닝(Machine learning)",
                "created":"2015-04-10"
                ,"version":"v1"
            },
            "114":{
                "title":"STS 오류 \"populate auto detected configs\"",
                "created":"2015-04-10"
                ,"version":"v1"
            },
            "115":{
                "title":"비트코인(Bitcoin)",
                "created":"2015-04-13"
                ,"version":"v1"
            },
            "116":{
                "title":"템플릿 메소드 패턴(Template Method Pattern)",
                "created":"2015-04-14"
                ,"version":"v1"
            },
            "117":{
                "title":"자바스크립트 호이스팅(javascript hoisting)",
                "created":"2015-04-15"
                ,"version":"v1"
            },
            "118":{
                "title":"자바스크립트 네임스페이스(javascript namespace)",
                "created":"2015-04-15"
                ,"version":"v1"
            },
            "119":{
                "title":"무료 이미지 제공 사이트(Provide Free Image Site)",
                "created":"2015-04-15"
                ,"version":"v1"
            },
            "120":{
                "title":"구글 기념일 로고 자료실",
                "created":"2015-04-16"
                ,"version":"v1"
            },
            "121":{
                "title":"SpringBoot JPA 예제",
                "created":"2015-04-16"
                ,"version":"v1"
            },
            "122":{
                "title":"관점 지향 프로그래밍(Aspect-oriented programming)",
                "created":"2015-04-20"
                ,"version":"v1"
            },
            "123":{
                "title":"SpringBoot AOP 예제",
                "created":"2015-04-22"
                ,"version":"v1"
            },
            "124":{
                "title":"최근의 추세와 개인적인 생각",
                "created":"2015-04-22"
                ,"version":"v1"
            },
            "125":{
                "title":"아파치 주키퍼(Apache Zookeeper)",
                "created":"2015-04-24"
                ,"version":"v1"
            },
            "126":{
                "title":"자바스크립트 클로저(Javascript Closure)",
                "created":"2015-04-24"
                ,"version":"v1"
            },
            "127":{
                "title":"아파치 머하웃(Apache Mahout)",
                "created":"2015-04-27"
                ,"version":"v1"
            },
            "128":{
                "title":"Shebang",
                "created":"2015-04-27"
                ,"version":"v1"
            },
            "129":{
                "title":"스칼라 JDBC 연결(Scala JDBC Connection)",
                "created":"2015-04-27"
                ,"version":"v1"
            },
            "130":{
                "title":"프로그래밍 언어 R(Programming language R)",
                "created":"2015-04-28"
                ,"version":"v1"
            },
            "131":{
                "title":"R Language - Earth Package",
                "created":"2015-05-04"
                ,"version":"v1"
            },
            "132":{
                "title":"MariaDB 데이터베이스 생성",
                "created":"2015-05-06"
                ,"version":"v1"
            },
            "133":{
                "title":"MariaDB - ERROR 2003",
                "created":"2015-05-06"
                ,"version":"v1"
            },
            "134":{
                "title":"libsvm 설치 및 예제",
                "created":"2015-05-07"
                ,"version":"v1"
            },
            "135":{
                "title":"Jenetics 설치 및 예제",
                "created":"2015-05-08"
                ,"version":"v1"
            },
            "136":{
                "title":"협업 도구 Trello",
                "created":"2015-05-11"
                ,"version":"v1"
            },
            "137":{
                "title":"멤캐시드(Memcached) 정의 및 사용법",
                "created":"2015-05-14"
                ,"version":"v1"
            },
            "138":{
                "title":"RabbitMQ 정의 및 사용법",
                "created":"2015-05-15"
                ,"version":"v1"
            },
            "139":{
                "title":"Redis 설치 및 사용법",
                "created":"2015-05-19"
                ,"version":"v1"
            },
            "140":{
                "title":"SpringBoot JPA 예제(결합 인덱스)",
                "created":"2015-05-21"
                ,"version":"v1"
            },
            "141":{
                "title":"SpringBoot JPA 예제(@OneToMany, 단방향)",
                "created":"2015-05-22"
                ,"version":"v1"
            },
            "142":{
                "title":"SpringBoot JPA 예제(@ManyToOne, 단방향)",
                "created":"2015-05-22"
                ,"version":"v1"
            },
            "143":{
                "title":"SpringBoot JPA 예제(1:N, 양방향)",
                "created":"2015-05-26"
                ,"version":"v1"
            },
            "144":{
                "title":"jQuery 상위 요소 가져오기(parents, closest)",
                "created":"2015-05-26"
            },
            "145":{
                "title":"jQuery 이벤트 바인딩(on 함수 이용)",
                "created":"2015-05-26"
                ,"version":"v1"
            },
            "146":{
                "title":"웹 이미지 편집기(PIXLR)",
                "created":"2015-05-29"
                ,"version":"v1"
            },
            "147":{
                "title":"jQuery contents() 함수",
                "created":"2015-06-02"
                ,"version":"v1"
            },
            "148":{
                "title":"자바스크립트 console 객체 유효성 처리",
                "created":"2015-06-05"
                ,"version":"v1"
            },
            "149":{
                "title":"RawGit",
                "created":"2015-06-08"
                ,"version":"v1"
            },
            "150":{
                "title":"CHAP Links Library",
                "created":"2015-06-09"
            },
            "151":{
                "title":"Netty 개요 및 에코 서버 예제",
                "created":"2015-06-09"
                ,"version":"v1"
            },
            "152":{
                "title":"Hbase Shell Script Example",
                "created":"2015-06-10"
                ,"version":"v1"
            },
            "153":{
                "title":"자바스크립트 정렬(Javascript Sort)",
                "created":"2015-06-11"
                ,"version":"v1"
            },
            "154":{
                "title":"자바 동기(synchronous) 소켓 프로그래밍",
                "created":"2015-06-12"
                ,"version":"v1"
            },
            "155":{
                "title":"CentOS telnet 설치",
                "created":"2015-06-15"
                ,"version":"v1"
            },
            "156":{
                "title":"Redis 공부 중...",
                "created":"2015-06-16"
                ,"version":"v1"
            },
            "157":{
                "title":"레디스 레플리케이션 예제(Redis Replication)",
                "created":"2015-06-18"
                ,"version":"v1"
            },
            "158":{
                "title":"Java File Encoding Read/Write",
                "created":"2015-06-18"
                ,"version":"v1"
            },
            "159":{
                "title":"레디스 센티널 예제(Redis Sentinel)",
                "created":"2015-06-22"
                ,"version":"v1"
            },
            "160":{
                "title":"SpringBoot JPA Pagination",
                "created":"2015-06-26"
                ,"version":"v1"
            },
            "161":{
                "title":"Spring DispatcherServlet",
                "created":"2015-06-30"
                ,"version":"v1"
            },
            "162":{
                "title":"Zen Coding 사용법",
                "created":"2015-06-30"
                ,"version":"v1"
            },
            "163":{
                "title":"SpringBoot Logging",
                "created":"2015-06-30"
                ,"version":"v1"
            },
            "164":{
                "title":"Apache Spark Overview & Example",
                "created":"2015-07-02"
                ,"version":"v1"
            },
            "165":{
                "title":"Spring MockMvc(spring-test)",
                "created":"2015-07-03"
            },
            "166":{
                "title":"Node.js cluster(for using Multi Core CPU)",
                "created":"2015-07-06"
                ,"version":"v1"
            },
            "167":{
                "title":"Apache Spark Cluster(Standalone)",
                "created":"2015-07-06"
                ,"version":"v1"
            },
            "168":{
                "title":"결합 인덱스 컬럼 순서(Composite Index Column Ordering)",
                "created":"2015-07-07"
                ,"version":"v1"
            },
            "169":{
                "title":"데이터베이스 분포도(Database Selectivity)",
                "created":"2015-07-07"
                ,"version":"v1"
            },
            "170":{
                "title":"C++ 파일 읽기/쓰기(C++ File Read/Write Example)",
                "created":"2015-07-07"
                ,"version":"v1"
            },
            "171":{
                "title":"JSP redirect vs forward",
                "created":"2015-07-09"
                ,"version":"v1"
            },
            "172":{
                "title":"자바 벡터(Java Vector)",
                "created":"2015-07-10"
                ,"version":"v1"
            },
            "173":{
                "title":"자바 ArrayList(Java ArrayList)",
                "created":"2015-07-12"
                ,"version":"v1"
            },
            "174":{
                "title":"자바 간단한 쓰레드풀 구현(Java Simple ThreadPool)",
                "created":"2015-07-13"
                ,"version":"v1"
            },
            "175":{
                "title":"RSS 페이지를 만들었습니다.",
                "created":"2015-07-13"
                ,"version":"v1"
            },
            "176":{
                "title":"Scala IDE + Spark 연동 예제(for Windows7)",
                "created":"2015-07-14"
                ,"version":"v1"
            },
            "177":{
                "title":"자료구조 - 힙(Data Structure - Heap)",
                "created":"2015-07-15"
                ,"version":"v1"
            },
            "178":{
                "title":"jQuery Plugin - bxSlider(제이쿼리 슬라이딩)",
                "created":"2015-07-16"
                ,"version":"v1"
            },
            "179":{
                "title":"Space Engine으로 우주 여행 중...",
                "created":"2015-07-18"
            },
            "180":{
                "title":"팩토리 메소드 패턴(Factory Method Pattern)",
                "created":"2015-07-22"
                ,"version":"v1"
            },
            "181":{
                "title":"자바 람다식(Lambda Expressions in Java)",
                "created":"2015-07-23"
                ,"version":"v1"
            },
            "182":{
                "title":"CentOS 서버 시간 동기화(using ntp daemon)",
                "created":"2015-07-26"
                ,"version":"v1"
            },
            "183":{
                "title":"아파치 카프카를 보고 있습니다.",
                "created":"2015-07-27"
                ,"version":"v1"
            },
            "184":{
                "title":"Hbase 데이터 모델(Hbase Data Model)",
                "created":"2015-07-27"
            },
            "185":{
                "title":"Linux find exec grep",
                "created":"2015-07-28"
                ,"version":"v1"
            },
            "186":{
                "title":"swagger.io(json api docs tool)",
                "created":"2015-08-02"
                ,"version":"v1"
            },
            "187":{
                "title":"매미가 우렁차게 우는 하루",
                "created":"2015-08-05"
            },
            "188":{
                "title":"자바 JVM 정리(Java Virtual Machine)",
                "created":"2015-08-09"
                ,"version":"v1"
            },
            "189":{
                "title":"Hbase Region & RegionServer",
                "created":"2015-08-11"
                ,"version":"v1"
            },
            "190":{
                "title":"변화의 바람이 불고 있습니다.",
                "created":"2015-08-16"
                ,"version":"v1"
            },
            "191":{
                "title":"실시간 현재 접속자 위치 추가",
                "created":"2015-08-16"
                ,"version":"v1"
            },
            "192":{
                "title":"추상 팩토리 패턴(Abstract Factory Pattern)",
                "created":"2015-08-19"
                ,"version":"v1"
            },
            "193":{
                "title":"지금은 영어 공부를 하고 있습니다.",
                "created":"2015-08-24"
                ,"version":"v1"
            },
            "194":{
                "title":"블로그에 이력 보기 버튼이 추가 되었습니다.",
                "created":"2015-08-25"
            },
            "195":{
                "title":"미묘한 둘째의 표정",
                "created":"2015-08-26"
            },
            "196":{
                "title":"Jsoup : Java HTML Parser",
                "created":"2015-08-27"
                ,"version":"v1"
            },
            "197":{
                "title":"Hashtable, HashMap, ConcurrentHashMap 비교",
                "created":"2015-08-31"
                ,"version":"v1"
            },
            "198":{
                "title":"Mac Terminal",
                "created":"2015-09-05"
                ,"version":"v1"
            },
            "199":{
                "title":"SpringBoot @ControllerAdvice",
                "created":"2015-09-05"
                ,"version":"v1"
            },
            "200":{
                "title":"SpringBoot Profile",
                "created":"2015-09-06"
                ,"version":"v1"
            },
            "201":{
                "title":"TextWrangler",
                "created":"2015-09-12"
                ,"version":"v1"
            },
            "202":{
                "title":"Jedis - Redis Java Client",
                "created":"2015-09-17"
                ,"version":"v1"
            },
            "203":{
                "title":"Install Maven for Mac",
                "created":"2015-09-19"
                ,"version":"v1"
            },
            "204":{
                "title":"Spring RestTemplate Basic",
                "created":"2015-09-20"
                ,"version":"v1"
            },
            "205":{
                "title":"MariaDB - Multi In Query",
                "created":"2015-10-01"
            },
            "206":{
                "title":"Postman - Rest API Test Tool",
                "created":"2015-10-04"
            },
            "207":{
                "title":"Ehcache Usage & Example(Basic)",
                "created":"2015-10-05"
            },
            "208":{
                "title":"Apache Kafka",
                "created":"2015-10-10"
            },
            "209":{
                "title":"Mac Apache",
                "created":"2015-10-13"
            },
            "210":{
                "title":"위키 인터프리터를 만들고 있습니다.",
                "created":"2015-10-16"
            },
            "211":{
                "title":"Sublime Text 2",
                "created":"2015-10-23"
            },
            "212":{
                "title":"Linux SSH 사용법",
                "created":"2015-10-28"
            },
            "213":{
                "title":"자바 자료형 정리(Java Data Type)",
                "created":"2015-10-30"
            },
            "214":{
                "title":"주키퍼 클러스터 설치(Zookeeper Cluster on Multi Node)",
                "created":"2015-11-03"
            },
            "215":{
                "title":"자바 프로퍼티(Java Properties) 테스트",
                "created":"2015-11-12"
            },
            "216":{
                "title":"자바 어노테이션(Java Annotations)",
                "created":"2015-11-13"
            },
            "217":{
                "title":"빌더 패턴(Builder Pattern)",
                "created":"2015-11-15"
            },
            "218":{
                "title":"아파치 스톰 클러스터 구축(Apache Storm Cluster Setup)",
                "created":"2015-11-18"
            },
            "219":{
                "title":"2015년 11월 개발 이야기",
                "created":"2015-11-20"
            },
            "220":{
                "title":"Setting up NginX for CentOS",
                "created":"2015-11-25"
            },
            "221":{
                "title":"2015년 12월 개발 이야기",
                "created":"2015-12-02"
            },
            "222":{
                "title":"mockito 사용법(mockito usage)",
                "created":"2015-12-03"
            },
            "223":{
                "title":"JSONView - 크롬 웹에서 json을 예쁘게!",
                "created":"2015-12-16"
            },
            "224":{
                "title":"Java Json 다루기(Java Jackson Examples)",
                "created":"2016-01-04"
            },
            "225":{
                "title":"Java enum Examples",
                "created":"2016-01-21"
            },
            "226":{
                "title":"[Java] Reading File using Stream",
                "created":"2016-02-23"
            },
            "227":{
                "title":"[Java] ToStringBuilder 사용법",
                "created":"2016-03-11"
            },
            "228":{
                "title":"컴포지트 패턴(Composite Pattern)",
                "created":"2016-03-30"
            },
            "229":{
                "title":"[Java] System.nanoTime()",
                "created":"2016-04-22"
            },
            "230":{
                "title":"SpringBoot @ConfigurationProperties DataSource Setting",
                "created":"2016-05-18"
            },
            "231":{
                "title":"Jolokia 사용법 소개",
                "created":"2016-06-12"
            },
            "232":{
                "title":"2016년 6월 개발 이야기",
                "created":"2016-06-28"
            }
        }

        var keys = Object.keys(meta);
        for(var i = 0 ; i < keys.length; i++){
        	var seq = keys[i];
        	var obj = meta[seq];
        	obj.seq = seq;
        }

        return meta;
    };

    return {
        getMeta:getMeta
    }
})();
var postsMeta = postsInfo.getMeta();
