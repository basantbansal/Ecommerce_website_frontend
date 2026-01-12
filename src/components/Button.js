import className from "classnames";
import { twMerge } from "tailwind-merge";

function Button({
  children,
  primary,
  secondary,
  success,
  warning,
  danger,
  outline,
  rounded,
  ...rest
}) {
  const classes = twMerge(
    className(
      rest.className,
      "flex items-center px-4 py-2 border font-medium transition-all duration-200 cursor-pointer",
      "hover:shadow-md active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transition-all duration-200",
      {
        "border-blue-500 bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500": primary,
        "border-gray-900 bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-900": secondary,
        "border-green-500 bg-green-500 text-white hover:bg-green-600 focus:ring-green-500": success,
        "border-yellow-400 bg-yellow-400 text-white hover:bg-yellow-500 focus:ring-yellow-400": warning,
        "border-red-500 bg-red-500 text-white hover:bg-red-600 focus:ring-red-500": danger,

        "bg-white": outline,
        "text-blue-500 hover:bg-blue-50": outline && primary,
        "text-gray-900 hover:bg-gray-100": outline && secondary,
        "text-green-500 hover:bg-green-50": outline && success,
        "text-yellow-400 hover:bg-yellow-50": outline && warning,
        "text-red-500 hover:bg-red-50": outline && danger,

        "rounded-full": rounded,
        "rounded-md": !rounded,
      }
    )
  );

  return (
    <button type="button" {...rest} className={classes}>
      {children}
    </button>
  );
}

export default Button;


Button.propTypes = {
  checkVariationValue: ({ primary, secondary, success, warning, danger }) => {
    const count =
      Number(!!primary) +
      Number(!!secondary) +
      Number(!!warning) +
      Number(!!success) +
      Number(!!danger);

    if (count > 1) {
      return new Error(
        "Only one of primary, secondary, success, warning, danger can be true"
      );
    }
  },
};

