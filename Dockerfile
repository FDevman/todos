FROM centos
RUN yum install -y epel-release &&\
	yum install -y nodejs npm &&\
	npm install -g ember-cli &&\
	npm install -g install bower
COPY . /src
RUN cd /src &&\
	npm install &&\
	bower install
EXPOSE 4200
#ENTRYPOINT ["/bin/bash", "-c"]
CMD ["/bin/bash", "-c", "/src/launcher.sh"]