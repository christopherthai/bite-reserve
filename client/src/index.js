import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes.js";

const router = createBrowserRouter(routes); // Create the router

// Render the router
ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);
