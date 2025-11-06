"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const AlertShad = ({ title, alertTitle, description, handleAction }: any) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className=" hover:bg-red-500/10 transition text-red-500/50 hover:text-red-500 cursor-pointer px-4 py-2 rounded-full flex items-center gap-3">
        <i className="fi fi-rr-trash mt-1"></i>
        {title}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-500/50 flex items-cneter gap-2 text-base">
            <i className="fi fi-rr-info mt-0.5 "></i>
            {alertTitle}
          </AlertDialogTitle>
          <AlertDialogDescription className="">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-row justify-between *:flex-1 *:cursor-pointer font-[maven_pro]">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              handleAction();
            }}
          >
            Clear
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertShad;
