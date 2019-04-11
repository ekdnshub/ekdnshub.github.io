const PostProvider = (function () {

    const originPosts = [[1,"블로그 첫 글!","2014-09-29","My Story",["My Story"]],[2,"리눅스 크론탭(Linux Crontab) 사용법","2014-09-29","Linux",["Linux"]],[3,"자바 파일 입출력(Java File Input&Output)","2014-09-30","Java",["Java"]],[4,"리눅스 특수 문자 정리(Linux Shell)","2014-09-30","Linux",["Linux"]],[5,"node.js + socket.io 연습 중...","2014-10-02","Dev Story",["Dev Story"]],[6,"Spring 4 업데이트 및 websocket 테스트","2014-10-05","Dev Story",["Dev Story"]],[7,"Oracle WHERE 1=1 구문에 대하여","2014-10-07","Oracle",["Oracle"]],[8,"Oracle Replace() & Regexp_replace() 의 차이","2014-10-07","Oracle",["Oracle"]],[9,"네이버 블로그에서 이사 중","2014-10-09","My Story",["My Story"]],[10,"싱글튼 패턴(Singleton Pattern)","2014-10-09","Design Patterns",["Design Patterns"]],[11,"어댑터 패턴(Adapter Pattern)","2014-10-09","Design Patterns",["Design Patterns"]],[12,"2014.01.19 가복이","2014-10-12","My Story",["My Story"]],[13,"2014.01.28 아리누","2014-10-12","My Story",["My Story"]],[14,"아카이브 생성 및 해제(linux tar) 사용법","2014-10-12","Linux",["Linux"]],[15,"D3 차트를 하나 넣어봤습니다.","2014-10-12","Dev Story",["Dev Story"]],[16,"MongoDB 설치 및 환경설정(for Window7)","2014-10-13","MongoDB",["MongoDB"]],[17,"MongoDB Document & Collection & Insert","2014-10-13","MongoDB",["MongoDB"]],[18,"MongoDB CRUD 동작의 이해","2014-10-13","MongoDB",["MongoDB"]],[19,"블로그 새단장!","2014-10-15","My Story",["My Story"]],[20,"Esper + d3.js + socket.io + Node.js","2014-10-16","Dev Story",["Dev Story"]],[21,"Node.js & MongoDB 연동(with Mongoose)","2014-10-19","Programming",["Node.js","MongoDB"]],[22,"파이썬 파일 읽기(Python File Read)","2014-10-20","Python 3.X",["Python 3.X"]],[23,"파이썬 명령행 인자 메뉴얼(Command Menual)","2014-10-20","Python 3.X",["Python 3.X"]],[24,"파이썬 야구 게임(Python Baseball Game)","2014-10-20","Python 3.X",["Python 3.X"]],[25,"폰트어썸 적용!","2014-10-22","Dev Story",["Dev Story"]],[26,"도메인 메일 신청","2014-10-23","Dev Story",["Dev Story"]],[27,"jQuery show() / hide() / toggle() 사용법","2014-10-23","jQuery",["jQuery"]],[28,"페이스북 연동","2014-10-26","Dev Story",["Dev Story"]],[29,"게시판(beta) 추가를 해봤습니다~","014-10-29","Dev Story",["Dev Story"]],[30,"구글 +1 추가","2014-10-30","Dev Story",["Dev Story"]],[31,"AngularJS ngRepeat dupes Error","2014-11-03","Programming",["angularJS"]],[32,"옵저버 패턴(Observer Pattern)","2014-11-05","Design Patterns",["Design Patterns"]],[33,"구글 다트(Google Dart)를 공부 해보자!","2014-11-06","Dev Story",["Dev Story"]],[34,"Install Oracle Instant Client","2014-11-20","Oracle",["Oracle"]],[35,"Oracle Sql Developer Error - not find jvm.dll","2014-11-21","Oracle",["Oracle"]],[36,"서버 복구!","2014-11-24","My Story",["My Story"]],[37,"서비스 이전!","2014-11-27","Dev Story",["Dev Story"]],[38,"미가동 서비스 복구 완료!","2014-11-28","Dev Story",["Dev Story"]],[39,"Ruby 2.1.5 설치","2014-11-29","Dev Story",["Dev Story"]],[40,"Ruby on Rails 시작!!","2014-12-01","Dev Story",["Dev Story"]],[41,"구글 폴리머(polymer-project)","2014-12-02","Dev Story",["Dev Story"]],[42,"DyGraphs 테스트","2014-12-04","Dev Story",["Dev Story"]],[43,"Blog 서브 도메인을 Node.js 웹어플리케이션으로 구축해봤습니다.","2014-12-05","Dev Story",["Dev Story"]],[44,"서버 메모리 한계 용량 근접...","2014-12-07","Dev Story",["Dev Story"]],[45,"Blog 도메인 포팅 완료","2014-12-08","Dev Story",["Dev Story"]],[46,"에스퍼(Epser)와 같이 사용해야할 것들","2014-12-09","Dev Story",["Dev Story"]],[47,"인터스텔라 관람","2014-12-13","My Story",["My Story"]],[48,"CORS 적용","2014-12-15","Dev Story",["Dev Story"]],[49,"Board 도메인 node.js 포팅 및 성능 문제...","2014-12-21","Dev Story",["Dev Story"]],[50,"off the apache2 test page on the CentOS 6.x","2014-12-22","Linux",["Linux"]],[51,"o.js 라이브러리 - Toast Message 기능","2014-12-26","Dev Story",["Dev Story"]],[52,"블로그 태그(Tag) 기능 추가","2014-12-29","Dev Story",["Dev Story"]],[53,"2015년이 되었습니다!","2015-01-02","My Story",["My Story"]],[54,"스트래티지 패턴(Strategy Pattern)","2015-01-09","Design Patterns",["Design Patterns"]],[55,"Oracle leading hint","2015-01-14","Oracle",["Oracle"]],[56,"jQuery API 정리 웹페이지 추천","2015-01-14","jQuery",["jQuery"]],[57,"jQuery append()/prepend()","2015-01-14","jQuery",["jQuery"]],[58,"Javascript parseInt() 함수","2015-01-14","JavaScript",["JavaScript"]],[59,"Google Go를 시작하며","2015-01-16","Go",["Go"]],[60,"Getting Started - Intasll Go","2015-01-20","Go",["Go"]],[61,"Google Go 문법 공부(한글 문서)","2015-01-20","Go",["Go"]],[62,"Javascript Use Strict","2015-01-21","JavaScript",["JavaScript"]],[63,"Grails란 무엇인가?","2015-01-21","Programming",["Grails"]],[64,"Javascript Objects","2015-01-23","JavaScript",["JavaScript"]],[65,"git 웹으로 배우기(Learn git using web)","2015-01-26","Link",["Link"]],[66,"JavaScript Object Properties","2015-01-26","JavaScript",["JavaScript"]],[67,"자바 디컴파일러(Java Decompiler)","2015-02-04","Java",["Java"]],[68,"자바 리플렉션 테스트(Java Reflection Test)","2015-02-04","Java",["Java"]],[69,"자바 쓰레드 기초(Java Thread Basic)","2015-02-13","Java",["Java"]],[70,"텍스트 기반 웹 게임 소개(a Dark Room, Candy box)","2015-02-13","My Story",["My Story"]],[71,"오라클 달, 일, 월 처음&마지막 날짜 구하기","2015-02-16","Oracle",["Oracle"]],[72,"자바 Runnable를 이용해 쓰레드 만들기 (Java Runnable Interface)","2015-02-17","Java",["Java"]],[73,"설 연휴가 끝났어요.","2015-02-23","My Story",["My Story"]],[74,"리눅스 리다이렉션 & 파이프(Linux redirection & pipe)","2015-02-23","Linux",["Linux"]],[75,"최근 현황은 게임...?","2015-02-23","My Story",["My Story"]],[76,"C언어 파일 권한 체크 - access() 사용법","2015-02-24","C/C++",["C/C++"]],[77,"오라클 Inner Join 구문 비교 (Implicit vs Explicit)","2015-02-25","Oracle",["Oracle"]],[78,"데코레이터 패턴(Decorator Pattern)","2015-02-27","Design Patterns",["Design Patterns"]],[79,"정규 표현식 문자열 테스터[web](regular expression tester)","2015-03-04","Link",["Link"]],[80,"C++ map 예제(C++ map example)","2015-03-05","C/C++",["C/C++"]],[81,"스프링 프로필 설정(Spring Profile)","2015-03-06","Spring",["Spring"]],[82,"스칼라 개발 툴 다운로드(IDE for Scala)","2015-03-09","Scala",["Scala"]],[83,"Scala Hello World!","2015-03-09","Scala",["Scala"]],[84,"C 파일 사이즈 구하기(Getting file size with C)","2015-03-10","C/C++",["C/C++"]],[85,"스칼라 문법 요약(Scala Cheatsheets)","2015-03-11","Scala",["Scala"]],[86,"jQuery 테이블 데이터 정렬(using tablesorter)","2015-03-11","jQuery",["jQuery"]],[87,"특수 기호/문자 읽는법","2015-03-11","ETC",["etc"]],[88,"톰캣 로드밸런서 사용법(tomcat loadbalancers)","2015-03-12","ETC",["tomcat"]],[89,"스칼라 학교(scala school)","2015-03-12","Scala",["Scala"]],[90,"sbt 설치하기(Installing Simple Build Tool)","2015-03-13","Scala",["Scala"]],[91,"쿼리 실행 순서(SELECT 구문)","2015-03-16","SQL",["SQL"]],[92,"차트 라이브러리 highcharts","2015-03-16","Link",["Link"]],[93,"Tomcat document root 설정","2015-03-17","ETC",["tomcat"]],[94,"스칼라 파일 읽기(read file with scala)","2015-03-17","Scala",["Scala"]],[95,"정보보안기사 준비!","2015-03-23","My Story",["My Story"]],[96,"스칼라 정규 표현식 CASE 처리","2015-03-24","Scala",["Scala"]],[97,"자바스크립트 타이밍 이벤트(javascript timing events)","2015-03-26","JavaScript",["JavaScript"]],[98,"어셈블리어(Assembly Language)","2015-03-30","Terminology",["Terminology"]],[99,"빌드 자동화 도구 Gradle 설치(install Gradle)","2015-03-31","ETC",["gradle"]],[100,"Gradle를 이용한 자바 프로젝트 빌드","2015-03-31","Java",["Java"]],[101,"Convention over configuration(CoC)의 이해","2015-04-01","Terminology",["Terminology"]],[102,"Spring Boot Getting Started","2015-04-01","Spring",["Spring"]],[103,"신경망 알고리즘(Neural Network)","2015-04-01","Machine learning",["Machine learning"]],[104,"유전 알고리즘(Genetic Algorithms)","2015-04-02","Machine learning",["Machine learning"]],[105,"Spring Boot with STS(Spring Tool Suite)","2015-04-02","Spring",["Spring"]],[106,"sts를 이용한 github 저장소 업로드","2015-04-03","Spring",["Spring"]],[107,"서버 메모리 압박 두번째.","2015-04-06","Dev Story",["Dev Story"]],[108,"SpringBoot 프로젝트를 API 서버로!","2015-04-07","Dev Story",["Dev Story"]],[109,"Caused by: java.net.SocketException: 파이프가 깨어짐","2015-04-08","Spring",["Spring"]],[110,"서버 어플리케이션 근황","2015-04-08","Dev Story",["Dev Story"]],[111,"Multivariate adaptive regression splines(MARS)","2015-04-09","Machine learning",["Machine learning"]],[112,"Support vector machine(SVMs)","2015-04-09","Machine learning",["Machine learning"]],[113,"머신 러닝(Machine learning)","2015-04-10","Machine learning",["Machine learning"]],[114,"STS 오류 \"populate auto detected configs\"","2015-04-10","Spring",["Spring"]],[115,"비트코인(Bitcoin)","2015-04-13","Terminology",["Terminology"]],[116,"템플릿 메소드 패턴(Template Method Pattern)","2015-04-14","Design Patterns",["Design Patterns"]],[117,"자바스크립트 호이스팅(javascript hoisting)","2015-04-15","JavaScript",["JavaScript"]],[118,"자바스크립트 네임스페이스(javascript namespace)","2015-04-15","JavaScript",["JavaScript"]],[119,"무료 이미지 제공 사이트(Provide Free Image Site)","2015-04-15","Link",["Link"]],[120,"구글 기념일 로고 자료실","2015-04-16","Link",["Link"]],[121,"SpringBoot JPA 예제","2015-04-16","Spring",["Spring"]],[122,"관점 지향 프로그래밍(Aspect-oriented programming)","2015-04-20","Terminology",["Terminology"]],[123,"SpringBoot AOP 예제","2015-04-22","Spring",["Spring"]],[124,"최근의 추세와 개인적인 생각","2015-04-22","My Story",["My Story"]],[125,"아파치 주키퍼(Apache Zookeeper)","2015-04-24","Terminology",["Terminology"]],[126,"자바스크립트 클로저(Javascript Closure)","2015-04-24","JavaScript",["JavaScript"]],[127,"아파치 머하웃(Apache Mahout)","2015-04-27","Machine learning",["Machine learning"]],[128,"Shebang","2015-04-27","ETC",["Linux"]],[129,"스칼라 JDBC 연결(Scala JDBC Connection)","2015-04-27","Scala",["Scala"]],[130,"프로그래밍 언어 R(Programming language R)","2015-04-28","ETC",["R"]],[131,"R Language - Earth Package","2015-05-04","Machine learning",["Machine learning"]],[132,"MariaDB 데이터베이스 생성","2015-05-06","MariaDB",["MariaDB"]],[133,"MariaDB - ERROR 2003","2015-05-06","MariaDB",["MariaDB"]],[134,"libsvm 설치 및 예제","2015-05-07","Machine learning",["Machine learning"]],[135,"Jenetics 설치 및 예제","2015-05-08","Machine learning",["Machine learning"]],[136,"협업 도구 Trello","2015-05-11","Link",["Link"]],[137,"멤캐시드(Memcached) 정의 및 사용법","2015-05-14","ETC",["Memcached"]],[138,"RabbitMQ 정의 및 사용법","2015-05-15","ETC",["RabbitMQ"]],[139,"Redis 설치 및 사용법","2015-05-19","Redis",["Redis"]],[140,"SpringBoot JPA 예제(결합 인덱스)","2015-05-21","Spring",["Spring"]],[141,"SpringBoot JPA 예제(@OneToMany, 단방향)","2015-05-22","Spring",["Spring"]],[142,"SpringBoot JPA 예제(@ManyToOne, 단방향)","2015-05-22","Spring",["Spring"]],[143,"SpringBoot JPA 예제(1:N, 양방향)","2015-05-26","Spring",["Spring"]],[144,"jQuery 상위 요소 가져오기(parents, closest)","2015-05-26","jQuery",["jQuery"]],[145,"jQuery 이벤트 바인딩(on 함수 이용)","2015-05-26","jQuery",["jQuery"]],[146,"웹 이미지 편집기(PIXLR)","2015-05-29","Link",["Link"]],[147,"jQuery contents() 함수","2015-06-02","jQuery",["jQuery"]],[148,"자바스크립트 console 객체 유효성 처리","2015-06-05","JavaScript",["JavaScript"]],[149,"RawGit","2015-06-08","Link",["Link"]],[150,"CHAP Links Library","2015-06-09","JavaScript",["JavaScript"]],[151,"Netty 개요 및 에코 서버 예제","2015-06-09","Programming",["Netty"]],[152,"Hbase Shell Script Example","2015-06-10","Hbase",["Hbase"]],[153,"자바스크립트 정렬(Javascript Sort)","2015-06-11","JavaScript",["JavaScript"]],[154,"자바 동기(synchronous) 소켓 프로그래밍","2015-06-12","Java",["Java"]],[155,"CentOS telnet 설치","2015-06-15","Linux",["Linux"]],[156,"Redis 공부 중...","2015-06-16","Dev Story",["Dev Story"]],[157,"레디스 레플리케이션 예제(Redis Replication)","2015-06-18","Redis",["Redis"]],[158,"Java File Encoding Read/Write","2015-06-18","Java",["Java"]],[159,"레디스 센티널 예제(Redis Sentinel)","2015-06-22","Redis",["Redis"]],[160,"SpringBoot JPA Pagination","2015-06-26","Spring",["Spring"]],[161,"Spring DispatcherServlet","2015-06-30","Spring",["Spring"]],[162,"Zen Coding 사용법","2015-06-30","ETC",["zen coding"]],[163,"SpringBoot Logging","2015-06-30","Spring",["Spring"]],[164,"Apache Spark Overview & Example","2015-07-02","Spark",["Spark"]],[165,"Spring MockMvc(spring-test)","2015-07-03","Spring",["Spring"]],[166,"Node.js cluster(for using Multi Core CPU)","2015-07-06","Programming",["Node.js"]],[167,"Apache Spark Cluster(Standalone)","2015-07-06","Spark",["Spark"]],[168,"결합 인덱스 컬럼 순서(Composite Index Column Ordering)","2015-07-07","SQL",["SQL"]],[169,"데이터베이스 분포도(Database Selectivity)","2015-07-07","SQL",["SQL"]],[170,"C++ 파일 읽기/쓰기(C++ File Read/Write Example)","2015-07-07","C/C++",["C/C++"]],[171,"JSP redirect vs forward","2015-07-09","ETC",["jsp"]],[172,"자바 벡터(Java Vector)","2015-07-10","Java",["Java"]],[173,"자바 ArrayList(Java ArrayList)","2015-07-12","Java",["Java"]],[174,"자바 간단한 쓰레드풀 구현(Java Simple ThreadPool)","2015-07-13","Java",["Java"]],[175,"RSS 페이지를 만들었습니다.","2015-07-13","Dev Story",["Dev Story"]],[176,"Scala IDE + Spark 연동 예제(for Windows7)","2015-07-14","Spark",["Spark"]],[177,"자료구조 - 힙(Data Structure - Heap)","2015-07-15","Terminology",["Terminology"]],[178,"jQuery Plugin - bxSlider(제이쿼리 슬라이딩)","2015-07-16","Link",["Link"]],[179,"Space Engine으로 우주 여행 중...","2015-07-18","My Story",["My Story"]],[180,"팩토리 메소드 패턴(Factory Method Pattern)","2015-07-22","Design Patterns",["Design Patterns"]],[181,"자바 람다식(Lambda Expressions in Java)","2015-07-23","Java",["Java"]],[182,"CentOS 서버 시간 동기화(using ntp daemon)","2015-07-26","Linux",["Linux"]],[183,"아파치 카프카를 보고 있습니다.","2015-07-27","Dev Story",["Dev Story"]],[184,"Hbase 데이터 모델(Hbase Data Model)","2015-07-27","Hbase",["Hbase"]],[185,"Linux find exec grep","2015-07-28","Linux",["Linux"]],[186,"swagger.io(json api docs tool)","2015-08-02","Link",["Link"]],[187,"매미가 우렁차게 우는 하루","2015-08-05","My Story",["My Story"]],[188,"자바 JVM 정리(Java Virtual Machine)","2015-08-09","Java",["Java"]],[189,"Hbase Region & RegionServer","2015-08-11","Hbase",["Hbase"]],[190,"변화의 바람이 불고 있습니다.","2015-08-16","My Story",["My Story"]],[191,"실시간 현재 접속자 위치 추가","2015-08-16","Dev Story",["Dev Story"]],[192,"추상 팩토리 패턴(Abstract Factory Pattern)","2015-08-19","Design Patterns",["Design Patterns"]],[193,"지금은 영어 공부를 하고 있습니다.","2015-08-24","My Story",["My Story"]],[194,"블로그에 이력 보기 버튼이 추가 되었습니다.","2015-08-25","Dev Story",["Dev Story"]],[195,"미묘한 둘째의 표정","2015-08-26","My Story",["My Story"]],[196,"Jsoup : Java HTML Parser","2015-08-27","Link",["Link"]],[197,"Hashtable, HashMap, ConcurrentHashMap 비교","2015-08-31","Java",["Java"]],[198,"Mac Terminal","2015-09-05","Mac",["Mac"]],[199,"SpringBoot @ControllerAdvice","2015-09-05","Spring",["Spring"]],[200,"SpringBoot Profile","2015-09-06","Spring",["Spring"]],[201,"TextWrangler","2015-09-12","Mac",["Mac"]],[202,"Jedis - Redis Java Client","2015-09-17","Java",["Java"]],[203,"Install Maven for Mac","2015-09-19","Mac",["Mac"]],[204,"Spring RestTemplate Basic","2015-09-20","ETC",["spring"]],[205,"MariaDB - Multi In Query","2015-10-01","MariaDB",["MariaDB"]],[206,"Postman - Rest API Test Tool","2015-10-04","Link",["Link"]],[207,"Ehcache Usage & Example(Basic)","2015-10-05","ETC",["ehcache"]],[208,"Apache Kafka","2015-10-10","ETC",["kafka"]],[209,"Mac Apache","2015-10-13","Mac",["Mac"]],[210,"위키 인터프리터를 만들고 있습니다.","2015-10-16","Dev Story",["Dev Story"]],[211,"Sublime Text 2","2015-10-23","Mac",["Mac"]],[212,"Linux SSH 사용법","2015-10-28","Linux",["Linux"]],[213,"자바 자료형 정리(Java Data Type)","2015-10-30","Java",["Java"]],[214,"주키퍼 클러스터 설치(Zookeeper Cluster on Multi Node)","2015-11-03","ETC",["zookeeper"]],[215,"자바 프로퍼티(Java Properties) 테스트","2015-11-12","Java",["Java"]],[216,"자바 어노테이션(Java Annotations)","2015-11-13","Java",["Java"]],[217,"빌더 패턴(Builder Pattern)","2015-11-15","Design Patterns",["Design Patterns"]],[218,"아파치 스톰 클러스터 구축(Apache Storm Cluster Setup)","2015-11-18","ETC",["apache storm"]],[219,"2015년 11월 개발 이야기","2015-11-20","Dev Story",["Dev Story"]],[220,"Setting up NginX for CentOS","2015-11-25","ETC",["nginx","centos"]],[221,"2015년 12월 개발 이야기","2015-12-02","Dev Story",["Dev Story"]],[222,"mockito 사용법(mockito usage)","2015-12-03","Java",["Java"]],[223,"JSONView - 크롬 웹에서 json을 예쁘게!","2015-12-16","Link",["Link"]],[224,"Java Json 다루기(Java Jackson Examples)","2016-01-04","Java",["Java"]],[225,"Java enum Examples","2016-01-21","Java",["Java"]],[226,"[Java] Reading File using Stream","2016-02-23","Java",["Java"]],[227,"[Java] ToStringBuilder 사용법","2016-03-11","Java",["Java"]],[228,"컴포지트 패턴(Composite Pattern)","2016-03-30","Design Patterns",["Design Patterns"]],[229,"[Java] System.nanoTime()","2016-04-22","Java",["Java"]],[230,"SpringBoot @ConfigurationProperties DataSource Setting","2016-05-18","Spring",["Spring"]],[231,"Jolokia 사용법 소개","2016-06-12","Java",["Java"]],[232,"2016년 6월 개발 이야기","2016-06-28","Dev Story",["Dev Story"]],[233,"Windows 10 IntelliJ Github 연동","2019-03-24","ETC",["Windows 10","Git","IntelliJ"]],[234,"자바 옵셔널 (Java Optional)","2019-04-02","Java",["Java"]],[235,"프록시 패턴(Proxy Pattern)","2019-04-07","Design Patterns",["Design Patterns","Java"]],[236,"2019년 개발 이야기","2019-04-10","Dev Story",["Dev Story"]]];

    const IDX_POST_NUM = 0;
    const IDX_TITLE = 1;
    const IDX_CREATED = 2;
    const IDX_CATEGORY = 3;
    const IDX_TAGS = 4;

    function convertToObjectFrom(originPostArray) {
        return {
            postNumber: originPostArray[IDX_POST_NUM],
            title: originPostArray[IDX_TITLE],
            created: originPostArray[IDX_CREATED],
            category: originPostArray[IDX_CATEGORY],
            tags: originPostArray[IDX_TAGS]
        }
    }

    function get(postNumber) {
        return convertToObjectFrom(originPosts[postNumber - 1]);
    }

    function getMap() {
        return originPosts
            .map(post => convertToObjectFrom(post))
            .reduce((result, post) => {
                result[post.postNumber] = post;
                return result;
            }, {});
    }

    function getPostMaxCount() {
        return originPosts.length;
    }

    function getCategoriesMap() {
        return originPosts
            .map(post => convertToObjectFrom(post))
            .reduce((result, post) => {
                if (!result[post.category]) {
                    result[post.category] = [];
                }
                result[post.category].push(post);
                return result;
            }, {});
    }

    function getPostArrayByCategory(category) {
        return originPosts
            .map(post => convertToObjectFrom(post))
            .filter(post => post.category === category)
            .reduce((result, post) => {
                result.push(post);
                return result;
            }, []);
    }

    return {
        get: get,
        getMap: getMap,
        getPostMaxCount: getPostMaxCount,
        getCategoriesMap: getCategoriesMap,
        getPostArrayByCategory: getPostArrayByCategory
    }
})();
