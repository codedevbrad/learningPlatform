"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function PushNav(trigger, side) {
  var body = document.querySelector('body');
  if (trigger === 'open') {
    if (side === 'right') {
      body.style.marginRight = '400px';
    } else {
      body.style.marginLeft = '400px';
    }
  } else {
    body.style.marginRight = '0px';
    body.style.marginLeft = '0px';
  }
}

const PushSheet = ({ className, children, side = 'right', showTrigger = true }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    PushNav('open', side);
  };

  const handleClose = () => {
    setIsOpen(false);
    PushNav('close', side);
  };

  const toggleSheet = () => {
    if (isOpen) {
      handleClose();
    } else {
      handleOpen();
    }
  };

  React.useEffect(() => {
    // Cleanup function to close the navigation when the component is unmounted
    return () => {
      PushNav('close', side);
    };
  }, [side]);

  // Separate children into trigger and other components
  const trigger = React.Children.toArray(children).find(
    (child) => child.type === PushSheetTrigger
  );

  const otherChildren = React.Children.toArray(children).filter(
    (child) => child.type !== PushSheetTrigger
  );

  return (
    <>
      {showTrigger && trigger
        ? React.cloneElement(trigger, { isOpen, onToggle: toggleSheet })
        : showTrigger && <PushSheetTrigger isOpen={isOpen} onToggle={toggleSheet} />}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className=""
              onClick={handleClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
            />
            <PushSheetContent isOpen={isOpen} onClose={handleClose} side={side} className={className}>
              {otherChildren}
            </PushSheetContent>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const PushSheetTrigger = ({ isOpen, onToggle, className, children, ...props }) => {
  return (
    <button
      className={cn("cursor-pointer rounded", className)}
      onClick={onToggle}
      {...props}
    >
      {children || (isOpen ? 'Close Sheet' : 'Open Sheet')}
    </button>
  );
};

const PushSheetContent = React.forwardRef(
  ({ children, isOpen, onClose, side = 'right', className, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          `flex-col fixed inset-y-0 ${side === 'right' ? 'right-0' : 'left-0'} w-3/4 max-w-sm z-50 bg-white shadow-lg`,
          className
        )}
        initial={{ x: side === 'right' ? '100%' : '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: side === 'right' ? '100%' : '-100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
        {...props}
      >
        <PushSheetClose onClose={onClose} />
        {children}
      </motion.div>
    );
  }
);

PushSheetContent.displayName = "PushSheetContent";

const PushSheetClose = ({ onClose, className, ...props }) => {
  return (
    <button
      className={cn("absolute top-4 right-4", className)}
      onClick={onClose}
      {...props}
    >
      <X className="h-6 w-6 text-black" />
      <span className="sr-only">Close</span>
    </button>
  );
};

const PushSheetHeader = ({ children, className, ...props }) => {
  return (
    <div className={cn("p-4 border-b", className)} {...props}>
      {children}
    </div>
  );
};

const PushSheetFooter = ({ children, className, ...props }) => {
  return (
    <div className={cn("py-3 border-t", className)} {...props}>
      {children}
    </div>
  );
};

const PushSheetTitle = ({ children, className, ...props }) => {
  return (
    <h2 className={cn("text-lg font-semibold", className)} {...props}>
      {children}
    </h2>
  );
};

const PushSheetDescription = ({ children, className, ...props }) => {
  return (
    <div className={cn("text-sm text-gray-600", className)} {...props}>
      {children}
    </div>
  );
};

export {
  PushSheet,
  PushSheetTrigger,
  PushSheetContent,
  PushSheetClose,
  PushSheetHeader,
  PushSheetFooter,
  PushSheetTitle,
  PushSheetDescription,
};


/*
  <PushSheet side="right">
        <PushSheetTrigger className="bg-red-500 text-white" isOpen={undefined} onToggle={undefined} >
            Open
        </PushSheetTrigger>
        <PushSheetHeader className={undefined}>
          <PushSheetTitle className={undefined}>Navigation Menu</PushSheetTitle>
          <PushSheetDescription className={undefined}>
            Here is the description of the navigation menu.
          </PushSheetDescription>
        </PushSheetHeader>
        <div className="p-4">
          <p>Your content goes here...</p>
        </div>
        <PushSheetFooter  className={undefined}>
          <button onClick={() => console.log("Footer button clicked")}>Footer Button</button>
        </PushSheetFooter>
      </PushSheet>
*/

/*
"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const PushSheet = SheetPrimitive.Root;

function PushNav(trigger) {
  var body = document.querySelector('body');
  if (trigger === 'open') {
    console.log('open', body);
    body.style.marginLeft = '400px';
  } else {
    console.log('close', body);
    body.style.marginLeft = '0px';
  }
}

const PushSheetTrigger = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  const handleClick = () => {
    PushNav('open');
  };

  return (
    <SheetPrimitive.Trigger
      ref={ref}
      className={cn("cursor-pointer", className)}
      {...props}
      onClick={handleClick}
    />
  );
});
PushSheetTrigger.displayName = SheetPrimitive.Trigger.displayName;

const PushSheetClose = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Close>
>(({ className, ...props }, ref) => {
  const handleClose = () => {
    PushNav('close');
  };

  return (
    <SheetPrimitive.Close
      ref={ref}
      className={cn("cursor-pointer", className)}
      {...props}
      onClick={handleClose}
    >
      <X className="h-4 w-4" />
      <span className="sr-only">Close</span>
    </SheetPrimitive.Close>
  );
});
PushSheetClose.displayName = SheetPrimitive.Close.displayName;

const PushSheetPortal = SheetPrimitive.Portal;

const pushSheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
);

interface PushSheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof pushSheetVariants> {}

const PushSheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  PushSheetContentProps
>(({ side = "right", className, children, ...props }, ref) => {
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      PushNav('close');
      console.log("PushSheet closed by clicking outside");
    }
  };

  const handleOverlayClick = () => {
    PushNav('close');
    console.log("Overlay clicked, PushSheet closed");
  };

  return (
    <PushSheetPortal>
      <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={handleOverlayClick} />
      <SheetPrimitive.Content
        ref={ref}
        className={cn(pushSheetVariants({ side }), className, "push-sheet-content z-50")}
        {...props}
        onOpenChange={handleOpenChange}
      >
        {children}
        <PushSheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary" />
      </SheetPrimitive.Content>
    </PushSheetPortal>
  );
});

PushSheetContent.displayName = SheetPrimitive.Content.displayName;

const PushSheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
PushSheetHeader.displayName = "PushSheetHeader";

const PushSheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
PushSheetFooter.displayName = "PushSheetFooter";

const PushSheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
));
PushSheetTitle.displayName = SheetPrimitive.Title.displayName;

const PushSheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
PushSheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  PushSheet,
  PushSheetPortal,
  PushSheetTrigger,
  PushSheetClose,
  PushSheetContent,
  PushSheetHeader,
  PushSheetFooter,
  PushSheetTitle,
  PushSheetDescription,
}
*/