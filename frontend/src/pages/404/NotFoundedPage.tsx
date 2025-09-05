export default function NotFoundedPage() {
  return (
    <div className="h-screen bg-zinc-800 flex items-center justify-center">
      <div className="text-center space-y-8 px-4">
        {/* Error message */}
        <div className="space-y-4">
          <h1 className="text-8xl font-bold text-white">404</h1>
          <h2 className="text-3xl font-semibold text-white">Page not found</h2>
          <p className="text-zinc-400 max-w-lg mx-auto text-sm">
            Looks like this track got lost in the shuffle. Let's get you back to
            the previous page.
          </p>
        </div>
      </div>
    </div>
  );
}
