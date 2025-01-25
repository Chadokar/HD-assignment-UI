import { forwardRef, useState, useEffect, useRef, memo } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import Calendar from "./calender";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  calendarIcon?: any;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, error, type = "text", label, calendarIcon, id, ...props },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [calendarDate, setCalendarDate] = useState("");
    const [showCalendar, setShowCalendar] = useState(false);
    const calendarRef = useRef<HTMLDivElement>(null);

    const isPassword = type === "password";
    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    const handleDateSelect = (date: string) => {
      setShowCalendar(false);
      setCalendarDate(date);
      const fakeEvent = {
        target: {
          value: date,
          name: props.name,
        },
      } as React.ChangeEvent<HTMLInputElement>;
      if (props.onChange) {
        props.onChange(fakeEvent);
      }
    };

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    };

    useEffect(() => {
      if (showCalendar) {
        document.addEventListener("mousedown", handleOutsideClick);
      } else {
        document.removeEventListener("mousedown", handleOutsideClick);
      }
      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }, [showCalendar]);

    return (
      <div className="relative w-full text-primary">
        <div className="relative">
          {calendarIcon && (
            <button
              type="button"
              className="absolute cursor-pointer calendar left-3 top-1/2 -translate-y-1/2 text-gray-500"
              onClick={() => setShowCalendar((prev) => !prev)}
            >
              <img
                src={calendarIcon}
                alt={`${label} calendarIcon`}
                className="h-5 w-5"
              />
            </button>
          )}
          <input
            {...props}
            id={id}
            type={isPassword ? (showPassword ? "text" : "password") : type}
            value={id === "dateOfBirth" ? calendarDate : props.value}
            className={cn(
              "peer h-12 sm:h-14 w-full rounded-[10px] placeholder:text-tertiary border-[1.5px] border-input bg-background px-3 py-2 text-sm ring-offset-background transition-all placeholder:text-transparent focus:border-none focus:outline-none focus:ring-[1.5px] focus:ring-blue-500 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 outline-none",
              isPassword && "pr-10",
              error && "border-red-500 focus:ring-red-500",
              calendarIcon && "pl-10",
              className
            )}
            autoComplete={id === "dateOfBirth" ? "off" : "on"}
            onFocus={
              calendarIcon
                ? () => setShowCalendar(true)
                : props.onFocus
                ? props.onFocus
                : () => {}
            }
            placeholder={label}
            ref={ref}
            {...props}
          />
          {label && (
            <label
              htmlFor={id}
              className={cn(
                "absolute left-2 top-3 z-10 origin-[0] -translate-y-[1.5rem] transform bg-background px-2 text-xs peer-placeholder-shown:text-sm text-tertiary duration-300 peer-placeholder-shown:top-1/2 peer-focus:text-xs peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-3 peer-focus:-translate-y-[1.5rem]  peer-focus:text-blue-500",
                // "peer-focus:scale-75 scale-75",
                error && "text-red-500 peer-focus:text-red-500",
                calendarIcon &&
                  "peer-placeholder-shown:left-10 peer-focus:left-2"
              )}
            >
              {label}
            </label>
          )}
          {isPassword && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-4 left-0 text-[12px] text-red-500"
          >
            {error}
          </motion.p>
        )}

        <AnimatePresence>
          {showCalendar && (
            <motion.div
              ref={calendarRef}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute -top-2 -left-2 z-20 w-full bg-transparent"
            >
              <Calendar onDateSelect={handleDateSelect} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Input.displayName = "Input";

export default memo(Input);
