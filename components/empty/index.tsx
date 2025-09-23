import React from "react";
import { Button } from "../ui/button";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
  showDescription?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "Nothing here",
  description = "There is no data to show right now.",
  actionLabel,
  onAction,
  className = "",
  showDescription = true
}) => {
  return (
    <div className={`flex flex-col items-center justify-center gap-4 p-6 text-center ${className}`}>
      <svg width="88" height="88" viewBox="0 0 24 24" fill="none" className="text-white/60">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 10h8M8 14h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <h3 className="text-lg font-semibold">{title}</h3>
      {showDescription && <p className="text-sm text-white/70 max-w-xs">{description}</p>}

      {actionLabel && (
        <Button
          onClick={onAction}
          className="mt-2 px-4 py-2 bg-primary-purple text-white rounded-md text-sm"
          type="button"
          variant={'default-gradient'}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};