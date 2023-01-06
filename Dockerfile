FROM openjdk:17-jdk-alpine
COPY target/crud-0.0.1-SNAPSHOT.jar crud-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","/crud-0.0.1-SNAPSHOT.jar"]