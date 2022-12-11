import type { MetaFunction, LinksFunction, ErrorBoundaryComponent } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import styles from "./styles/app.css"

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Blink Service Portal",
  viewport: "width=device-width,initial-scale=1",
  keywords: "Remix, React, javascript, Heeros PSA integration, Blink Group, Service Portal",
  description: "Advanced Inventory Management System by Blink Group",
});
export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }]
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="font-sans">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  console.log(error)
  return (
    <div>
      <h1>Whoops Error occurred!</h1>
      <p>{error.message}</p>
    </div>
  )}