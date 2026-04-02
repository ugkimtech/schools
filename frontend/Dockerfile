# docer file for react
FROM nginx:alpine

# copy react build files into nginix folder
COPY dist/ /usr/share/nginx/html

# Copy custom nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf

# expose port 80
EXPOSE 80