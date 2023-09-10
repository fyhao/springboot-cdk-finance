# Use the official Gradle image as a parent image
FROM gradle:7.2.0-jdk11 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the gradle configuration files first to leverage Docker cache
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .

# Then copy the rest of the application code
COPY src src

# Build the application using Gradle
RUN ./gradlew clean bootJar

# Start with the official Java 11 base image
FROM adoptopenjdk:11-jre-hotspot

# Set the working directory in the container
WORKDIR /app

# Copy the built jar file into our image
COPY --from=build /app/build/libs/*.jar app.jar

# Set the startup command
CMD ["java", "-jar", "app.jar"]
