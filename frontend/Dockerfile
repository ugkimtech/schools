# docer file for react
FROM nginx:alpine

# copy react build files into nginix folder
COPY build/ /usr/share/nginx/html

# expose port 80
EXPOSE 80

# start nginx
CMD ["nginx", "-g", "daemon off;"]