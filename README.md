# Node Cache Manager

The `cache-manager` library in Node.js is used for caching data in various stores like memory, Redis, and others. It provides a consistent interface for various caching strategies and allows you to switch between different stores easily without changing your application code. This is particularly useful for optimizing performance and reducing the load on external resources such as databases, APIs, or file systems.

## Example

We will use `Express.js` for creating the API, `Axios` for making HTTP requests to the external API, and `cache-manager` for caching responses.

#### How to Test

To test this, you can run the app and make a GET request to http://localhost:3000/api/posts. The first request will fetch the posts from the external API, and subsequent requests within 60 seconds will return the cached posts. After 60 seconds, the cache will expire, and the next request will fetch the posts from the external API again.

```sh
# Install dependencies
npm i

# Start the server
node app.js
or
make run

# Using cURL
curl http://localhost:3000/api/posts
```