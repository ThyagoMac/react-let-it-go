import * as React from "react"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
  }

const Checkbox = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, ...props }, ref) => {
    return (
      <>
        <label className="area flex items-center gap-2">
          <div className="area--input">
            <input
              type="checkbox"
              className={`
                flex h-10 w-full rounded-md border border-input bg-background text-black px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
                ${className}
              `}
              ref={ref}
              {...props}
            />
          </div>
          {label &&
            <div className="area--title font-bold my-3">{label}</div>
          }
        </label>
      </>
    )
  }
)
Checkbox.displayName = "Input"

export { Checkbox }
