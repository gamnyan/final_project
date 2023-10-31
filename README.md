# final_project

### 작업 전(repository 가져와야 될 경우)

* 작업할 폴더 경로에서 마우스 우클릭 **Open Git Bash Here** 클릭
* ***Git Bash***에 밑에 코드 입력
```
git clone https://github.com/gamnyan/final_project.git
```
```
cd final_project
```
> 👇 xx = branch name
```
git checkout -b xx
```
```
code .
```

### 작업 전&중(작업중인 소스 업데이트 필요)

* ***Git Bash***에 밑에 코드 입력(경로는 /final_project)
```
git add .
```
> 👇 xx = 코맨트
```
git commit -m "xx"
```
```
git pull origin sub
```

### 작업 후

* ***Git Bash***에 밑에 코드 입력
```
git add .
```
> 👇 xx = 코맨트
```
git commit -m "xx"
```
> 👇 xx = 작업하던 branch 이름
```
git push origin xx
```
* 깃허브에서 Pull requests 후 merge

/////////////////////////////////////////
이거 복붙하고 나중에 지워줘
```
plugins {
    id 'java'
    id 'org.springframework.boot' version '3.1.4'
    id 'io.spring.dependency-management' version '1.1.3'
    id "com.ewerk.gradle.plugins.querydsl" version "1.0.10"
}

group = 'com.final'
version = '0.0.1-SNAPSHOT'

java {
    sourceCompatibility = '17'
}

configurations {
    compileOnly {
        extendsFrom annotationProcessor
    }
}

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-validation'
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    implementation 'org.springframework.boot:spring-boot-starter-security'
    implementation 'org.springframework.boot:spring-boot-starter-web'
    runtimeOnly 'com.h2database:h2'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
    testImplementation 'org.springframework.security:spring-security-test'
    
    compileOnly 'org.projectlombok:lombok'
    annotationProcessor 'org.projectlombok:lombok'
    
    implementation 'io.jsonwebtoken:jjwt-api:0.11.5'
    runtimeOnly 'io.jsonwebtoken:jjwt-impl:0.11.5'
    runtimeOnly 'io.jsonwebtoken:jjwt-jackson:0.11.5'

    // Querydsl 추가
    implementation 'com.querydsl:querydsl-jpa:5.0.0:jakarta'
    annotationProcessor "com.querydsl:querydsl-apt:${dependencyManagement.importedProperties['querydsl.version']}:jakarta"
    annotationProcessor "jakarta.annotation:jakarta.annotation-api"
    annotationProcessor "jakarta.persistence:jakarta.persistence-api"

	implementation 'org.springframework.boot:spring-boot-starter-actuator'
	// https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-oauth2-client
	implementation 'org.springframework.boot:spring-boot-starter-oauth2-client:3.1.4'
    // implementation 'org.springframework.boot:spring-boot-starter-mail:2.7.1'
    implementation 'org.springframework.boot:spring-boot-starter-mail:3.1.5'
}

tasks.named('test') {
    useJUnitPlatform()
}

// 아래 코드는 통합 build를 위한 코드

def reactDir = "$projectDir/src/main/webapp/frontend";

sourceSets{
    main{
        resources{
            srcDirs = ["$projectDir/src/main/resources"]
        }
    }
}

processResources{
    dependsOn "copyReactBuildFiles"
}

task installReact(type:Exec){
    workingDir "$reactDir"
    inputs.dir "$reactDir"
    group = BasePlugin.BUILD_GROUP
    
    if(System.getProperty('os.name').toLowerCase(Locale.ROOT).contains('windows')){
        commandLine "npm.cmd", "audit", "fix"
        commandLine 'npm.cmd', 'install'
    }else{
        commandLine "npm", "audit", "fix"
        commandLine 'npm', 'install'
    }
}

task buildReact(type:Exec){
    dependsOn "installReact"
    workingDir "$reactDir"
    inputs.dir "$reactDir"
    group = BasePlugin.BUILD_GROUP
    
    if(System.getProperty('os.name').toLowerCase(Locale.ROOT).contains('windows')){
        commandLine "npm.cmd", "run-script", "build"
    }else{
        commandLine "npm", "run-script", "build"
    }
}

task copyReactBuildFiles(type:Copy){
    dependsOn "buildReact"
    from "$reactDir/build"
    into "$projectDir/src/main/resources/static"
}

// queryDSL 추가 : QueryDSL 빌드 옵션
def querydslDir = "$projectDir/src/generated/querydsl"

querydsl {
    jpa = true
    querydslSourcesDir = querydslDir
}

sourceSets {
    main.java.srcDir querydslDir
}

configurations {
    querydsl.extendsFrom compileClasspath
}

compileQuerydsl {
    options.annotationProcessorPath = configurations.querydsl
}
```
