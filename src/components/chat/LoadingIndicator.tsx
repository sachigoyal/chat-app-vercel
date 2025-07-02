export const LoadingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="bg-background text-foreground border border-border rounded-lg px-3 py-2">
        <div className="flex items-center gap-1">
          <div className="w-1 h-1 bg-muted-foreground rounded-full animate-pulse" />
          <div className="w-1 h-1 bg-muted-foreground rounded-full animate-pulse delay-75" />
          <div className="w-1 h-1 bg-muted-foreground rounded-full animate-pulse delay-150" />
        </div>
      </div>
    </div>
  );
}; 