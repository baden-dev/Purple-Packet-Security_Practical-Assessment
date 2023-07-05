# My App Deployment Guide

This guide provides step-by-step instructions on how to deploy and run the App using Docker and Docker Compose.

## Prerequisites

- Docker: Ensure that Docker is installed on your system. You can download and install Docker from [here](https://www.docker.com/get-started).

## Deployment Steps

Follow these steps to deploy and run the App:

1. Navigate to the project's root directory: 
2. Build the client Docker image: "docker build -t react-app client/" 

3. Build the server Docker image: "docker build -t api-server server/"

4. Deploy the application using Docker Compose: "docker compose up"

5. Access the application:
Once the deployment is complete, you can access the application by opening your web browser and navigating to `http://localhost:8000`. The application should be up and running.

6. Clean up:
To stop and remove the Docker containers created by the deployment, press `Ctrl + C` in the terminal running Docker Compose. Then, run the following command:
