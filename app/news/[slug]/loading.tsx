export default function LoadingArticle() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="animate-pulse space-y-6">
        <div className="h-8 w-3/4 bg-gray-200 rounded" />
        <div className="h-5 w-2/3 bg-gray-200 rounded" />
        <div className="h-64 w-full bg-gray-200 rounded" />
        <div className="space-y-3">
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-11/12 bg-gray-200 rounded" />
          <div className="h-4 w-10/12 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}