FROM maven:latest as build

WORKDIR /app

COPY ./pom.xml /app
COPY ./src /app/src

RUN mvn clean package -Dmaven.test.skip=true


FROM openjdk:latest

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

CMD ["java", "-jar", "app.jar"]