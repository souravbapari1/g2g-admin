import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const avatarStackVariants = cva("flex", {
  variants: {
    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col",
    },
    spacing: {
      sm: "-space-x-5",
      md: "-space-x-4",
      lg: "-space-x-3",
      xl: "-space-x-2",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    spacing: "md",
  },
});

export interface AvatarStackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarStackVariants> {
  avatars: { name: string; image: string }[];
  maxAvatarsAmount?: number;
}

const AvatarStack: React.FC<AvatarStackProps> = ({
  className,
  orientation,
  avatars,
  spacing,
  maxAvatarsAmount = 3,
  ...props
}) => {
  const shownAvatars = avatars.slice(0, maxAvatarsAmount);
  const hiddenAvatars = avatars.slice(maxAvatarsAmount);

  return (
    <div
      className={cn(avatarStackVariants({ orientation, spacing }), className)}
      {...props}
    >
      {shownAvatars.map(({ name, image }, index) => (
        <TooltipProvider key={`tooltip-${index}`}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar>
                <AvatarImage src={image} alt={name} />
                <AvatarFallback>
                  {name
                    ?.split(" ")
                    ?.map((word) => word[0])
                    ?.join("")
                    ?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <p>{name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}

      {hiddenAvatars.length > 0 && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar>
                <AvatarFallback>+{hiddenAvatars.length}</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <ul>
                {hiddenAvatars.map(({ name }, index) => (
                  <li key={`hidden-${index}`}>{name}</li>
                ))}
              </ul>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export { AvatarStack, avatarStackVariants };
