FROM nginx:alpine

# Copy all HTML files and assets to nginx's default directory
COPY . /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Nginx runs by default
