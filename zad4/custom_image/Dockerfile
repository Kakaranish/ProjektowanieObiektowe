FROM ubuntu:20.04

EXPOSE 8080

RUN apt-get update && apt-get install -y default-jdk
RUN apt-get install -y curl unzip zip

WORKDIR /temp
SHELL ["/bin/bash", "-c", "curl -s https://get.sdkman.io"] 
RUN chmod a+x "$HOME/.sdkman/bin/sdkman-init.sh"
RUN source "$HOME/.sdkman/bin/sdkman-init.sh" && sdk install kotlin

WORKDIR /app