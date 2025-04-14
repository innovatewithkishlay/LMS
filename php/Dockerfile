# Use the official PHP image with Apache
FROM php:8.1-apache

# Set the working directory inside the container
WORKDIR /var/www/html

# Copy all files from the current directory to the container
COPY . /var/www/html

# Install required PHP extensions (e.g., curl for API calls)
RUN docker-php-ext-install mysqli

# Set environment variable
ENV GROQ_API_KEY=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

# Expose port 80 for the Apache server
EXPOSE 80

# Start the Apache server
CMD ["apache2-foreground"]