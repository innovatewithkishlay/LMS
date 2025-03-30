import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { FaUserCircle } from "react-icons/fa"; // Import fallback user icon
import { cn } from "@/lib/utils";

const Avatar = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex shrink-0 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 shadow-md hover:shadow-lg transition-shadow duration-300",
      className
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn(
      "aspect-square h-full w-full object-cover transition-opacity duration-300",
      className
    )}
    onError={(e) => {
      // Hide the image if it fails to load
      e.target.style.display = "none";
    }}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef(
  ({ className, size = "laptop", ...props }, ref) => (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn(
        "flex items-center justify-center rounded-full bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300",
        size === "mobile" ? "h-10 w-10" : "h-12 w-12", // Adjust size for mobile and laptop
        className
      )}
      {...props}
    >
      <FaUserCircle
        className={cn(
          "text-gray-500 dark:text-gray-400",
          size === "mobile" ? "h-8 w-8" : "h-10 w-10" // Adjust icon size for mobile and laptop
        )}
      />
    </AvatarPrimitive.Fallback>
  )
);
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
