import React from "react";
import { styled, keyframes } from "@stitches/react";
import { violet, blackA, red, mauve, green } from "@radix-ui/colors";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { FiX } from "react-icons/fi";

const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const contentShow = keyframes({
  "0%": { opacity: 0, transform: "translate(-50%, -48%) scale(.96)" },
  "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
});

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  backgroundColor: blackA.blackA9,
  zIndex: 9998,
  position: "fixed",
  inset: 0,
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
});

const StyledContent = styled(DialogPrimitive.Content, {
  backgroundColor: "white",
  borderRadius: 6,
  zIndex: 9999,
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  maxWidth: "500px",
  maxHeight: "85vh",
  padding: 25,
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
  "&:focus": { outline: "none" },
});

type ContentProps = {
    children: React.ReactNode;
    ref: React.RefObject<HTMLDivElement>;
}

function Content({ children, ref, ...props }: ContentProps) {
  return (
    <DialogPrimitive.Portal>
      <StyledOverlay ref={ref} />
      <StyledContent {...props}>{children}</StyledContent>
    </DialogPrimitive.Portal>
  );
}

const StyledTitle = styled(DialogPrimitive.Title, {
  margin: 0,
  color: mauve.mauve12,
  fontSize: 17,
  fontWeight: 500,
});

const StyledDescription = styled(DialogPrimitive.Description, {
  marginBottom: 20,
  color: mauve.mauve11,
  fontSize: 15,
  lineHeight: 1.5,
});

// Exports
export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogContent = Content;
export const DialogTitle = StyledTitle;
export const DialogDescription = StyledDescription;
export const DialogClose = DialogPrimitive.Close;

// Your app...
const Flex = styled("div", { display: "flex" });

const Button = styled("button", {
  all: "unset",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 4,
  padding: "0 15px",
  transition: "all 200ms ease-out",
  fontSize: 15,
  lineHeight: 1,
  fontWeight: 500,
  height: 35,
  cursor: "pointer",

  variants: {
    variant: {
      violet: {
        backgroundColor: "white",
        color: violet.violet11,
        boxShadow: `0 2px 10px ${blackA.blackA7}`,
        "&:hover": { backgroundColor: mauve.mauve3 },
        "&:focus": { boxShadow: `0 0 0 2px black` },
      },
      green: {
        backgroundColor: green.green4,
        color: green.green11,
        "&:hover": { backgroundColor: green.green5 },
        "&:focus": { boxShadow: `0 0 0 2px ${green.green7}` },
      },
    },
  },

  defaultVariants: {
    variant: "violet",
  },
});

const IconButton = styled("button", {
  all: "unset",
  fontFamily: "inherit",
  borderRadius: "100%",
  height: 25,
  width: 25,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: violet.violet11,
  position: "absolute",
  top: 10,
  right: 10,
  cursor: "pointer",

  "&:hover": { backgroundColor: violet.violet4 },
  "&:focus": { boxShadow: `0 0 0 2px ${violet.violet7}` },
});

type Props = {
  title: string;
  description: string;
  lessonsCount: number;
  onConfirm: () => void;
  onCancel?: () => void;
};

const StartCourseDialog = ({
  title,
  description,
  lessonsCount,
  onConfirm,
  onCancel,
}: Props) => {
  const [open, setOpen] = React.useState(false);
  const modalRef = React.useRef<any | null>(null)

  useOnClickOutside(modalRef, () => setOpen(false));

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <span className="text-gray-600 hover:text-gray-800 transition font-semibold cursor-pointer">
              Rozpocznij kurs
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent ref={modalRef}>
          <DialogTitle>
            Czy chcesz rozpocząć kurs: {title} ({lessonsCount} lekcji)?
          </DialogTitle>
          <DialogDescription>
            <p className="font-semibold mt-2">Opis:</p>
            <p>{description}</p>
          </DialogDescription>
          <Flex css={{ justifyContent: "flex-end" }}>
            <DialogClose asChild>
              <Button variant="green" onClick={() => onConfirm()}>
                <button className="text-gray-800">Rozpocznij kurs</button>
              </Button>
            </DialogClose>
          </Flex>
          <DialogClose asChild>
            <IconButton aria-label="Close">
              <FiX />
            </IconButton>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StartCourseDialog;
