#
#  Copyright 2019 Pnoker. All Rights Reserved.
#
#  Licensed under the Apache License, Version 2.0 (the "License");
#  you may not use this file except in compliance with the License.
#  You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
#   Unless required by applicable law or agreed to in writing, software
#   distributed under the License is distributed on an "AS IS" BASIS,
#   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#   See the License for the specific language governing permissions and
#   limitations under the License.
#

FROM pnoker/alpine-nginx:1.18.0
MAINTAINER pnoker pnokers@icloud.com

RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

COPY ./dc3/nginx/ /etc/nginx/
COPY ./dist/ /usr/share/nginx/html/
COPY ./dc3/dependencies/ssl/ /etc/ssl/
COPY ./dc3/dependencies/conf.crt/ /etc/nginx/conf.crt/

EXPOSE 443
VOLUME /var/log/nginx

CMD /bin/wait-for dc3-auth:8300 dc3-manager:8400 dc3-data:8500 -t 5 -- nginx -g 'daemon off;'
