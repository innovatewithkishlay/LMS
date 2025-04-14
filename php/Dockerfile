# Use the recommended PHP image with Apache
FROM php:8.1-apache

# Set the working directory inside the container
WORKDIR /var/www/html

# Copy all files from the current directory to the container
COPY . /var/www/html

# Install required PHP extensions (e.g., curl for API calls)
RUN docker-php-ext-install mysqli

# Expose port 80 for the Apache server
EXPOSE 80

# Start the Apache server
CMD ["apache2-foreground"]