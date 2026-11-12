FROM docker:28-cli AS cli
FROM python:3.13-slim
COPY --from=cli /usr/local/bin/docker /usr/local/bin/docker
COPY --from=cli /usr/local/libexec/docker/cli-plugins/docker-compose /usr/local/libexec/docker/cli-plugins/docker-compose
WORKDIR /worker
COPY worker.py tenant.compose.yml ./
CMD ["python", "-u", "worker.py"]
