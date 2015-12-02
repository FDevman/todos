FROM centos
RUN yum install -y epel-release &&\
	yum install -y nodejs npm &&\
	npm install -g ember-cli &&\
	npm install -g install bower
COPY . /src
WORKDIR /src
RUN	npm install &&\
	bower install
EXPOSE 4200

ENTRYPOINT ["/bin/bash", "-c"]
CMD ["emeber s"]
