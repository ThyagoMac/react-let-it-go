import * as React from "react";

export interface InputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const TextAreaInput = React.forwardRef<HTMLTextAreaElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <>
        <label className={`area ${className}`}>
          {label && <div className="area--title font-bold my-3">{label}</div>}
          <div className="area--input">
            <textarea
              ref={ref}
              className={`
                flex min-h-10 w-full rounded-md border border-input bg-background text-black px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
                ${className}
              `}
              {...props}
            />
          </div>
        </label>
        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      </>
    );
  }
);
TextAreaInput.displayName = "TextAreaInput";

export { TextAreaInput };
