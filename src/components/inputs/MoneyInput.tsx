import * as React from "react";
import MaskedInput from "react-text-mask";
import createNumberMask from "text-mask-addons/dist/createNumberMask";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const currencyMask = createNumberMask({
  prefix: "R$",
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: ".",
  allowDecimal: true,
  decimalSymbol: ",",
});

const MoneyInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, ...props }) => {
    return (
      <>
        <label className={`area ${className}`}>
          {label && <div className="area--title font-bold my-3">{label}</div>}
          <div className="area--input">
            <MaskedInput
              mask={currencyMask}
              type={type}
              className={`
                flex h-10 w-full rounded-md border border-input bg-background text-black px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
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
MoneyInput.displayName = "Input";

export { MoneyInput };
