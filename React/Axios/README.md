### Creating an instance

You can create a new instance of axios with a custom config.

- **For Public APIs:** The following code creates a public instance of Axios with custom configurations and provides it through a custom hook.

_Create a custom hook with this code_

```JS
import axios from "axios";

// Create a public instance of Axios with custom configurations
const axiosPublic = axios.create({
  baseURL: 'http://localhost:5000', // replace server url
});

// Custom hook to provide the public Axios instance
const useAxiosPublic = () => axiosPublic;

export default useAxiosPublic;
```

This code encapsulates the configuration of a public Axios instance and provides a convenient way to use it throughout your React application. It's a good practice to create separate instances for different use cases (e.g., public and secure requests) to manage configurations more effectively.

- **For Secure APIs**
  _Create a custom hook with this code_

```JS
import axios from "axios";

// Create a secure instance of Axios with custom configurations
const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000', // replace server url
  withCredentials: true,
});

// Custom hook to provide the secure Axios instance
const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
```

## Interceptors

You can intercept requests or responses before they are handled by `then` or `catch`

The following code creates a secure instance of Axios with custom configurations, enhances it with request and response interceptors, and provides it through a custom hook. Here's a breakdown of each part:

_Create a custom hook with this code_

```JS
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

// Create a secure instance of Axios with custom configurations
const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000', // replace server url
});

// Custom hook to provide the secure Axios instance
const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  // Request interceptor to add authorization header for every secure API call
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem('accessToken');
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  // Response interceptor to handle 401 and 403 status codes
  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const status = error.response.status;

      // Logout the user and navigate to login page for 401 or 403 status
      if (status === 401 || status === 403) {
        await logOut();
        navigate('/login');
      }

      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
```
