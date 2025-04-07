function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center space-y-8 px-4">
        <div className="relative">
          <div className="h-24 w-24 rounded-full bg-indigo-500 bg-opacity-20 animate-ping"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 animate-pulse"></div>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-xl font-semibold text-white mb-2">Cargando...</p>
          <p className="text-sm text-indigo-200 animate-pulse">Preparando todo para ti</p>
        </div>
        
        <div className="w-64 h-2 bg-indigo-900 rounded-full overflow-hidden">
          <div className="h-full w-2/3 bg-gradient-to-r from-violet-500 via-indigo-400 to-blue-500 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

export default Loading;