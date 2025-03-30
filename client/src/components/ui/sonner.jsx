import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-gray-50 dark:group-[.toaster]:bg-gray-800 group-[.toaster]:text-gray-900 dark:group-[.toaster]:text-gray-100 group-[.toaster]:border group-[.toaster]:border-gray-300 dark:group-[.toaster]:border-gray-700 group-[.toaster]:shadow-xl rounded-lg",
          description:
            "group-[.toast]:text-gray-600 dark:group-[.toast]:text-gray-400 text-sm",
          actionButton:
            "group-[.toast]:bg-blue-600 group-[.toast]:text-white hover:group-[.toast]:bg-blue-700 transition-all duration-300 rounded-md px-4 py-2",
          cancelButton:
            "group-[.toast]:bg-gray-200 dark:group-[.toast]:bg-gray-700 group-[.toast]:text-gray-800 dark:group-[.toast]:text-gray-300 hover:group-[.toast]:bg-gray-300 dark:hover:group-[.toast]:bg-gray-600 transition-all duration-300 rounded-md px-4 py-2",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
