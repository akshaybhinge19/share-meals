import Link from "next/link";

const NotFound = () => {
  return (
    <main className="not-found">
      <h1>Page not found</h1>
      <p>
        {`Sorry, we can't find that page. You'll find lots to explore on the home
        page.`}
      </p>
      <Link href="/">Go to Home page</Link>
    </main>
  );
};

export default NotFound;
