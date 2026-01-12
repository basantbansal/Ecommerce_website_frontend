import className from "classnames";

function Icon({children,...rest}){
    const classes = className("text-2xl",rest.className,);

    return (
    <div className={classes} {...rest}>
        {children}
    </div>);
}

export default Icon;