export const contextTooltipComponentSource = `
import { de } from "@faker-js/faker";
import React, { useState, useEffect, useRef, FC } from "react";
type TooltipDirection = "top" | "bottom" | "left" | "right";
type PositionObject = {
  bottom?: number;
  top?: number;
  left?: number;
  right?: number;
};
interface ContextTooltipProps {
  children: React.ReactNode;
  message: string;
  expandedContent?: React.ReactNode;
  preferredDirection?: TooltipDirection;
}

const ContextTooltip: FC<ContextTooltipProps> = ({
  children,
  message,
  expandedContent,
  preferredDirection = "top",
}) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const [showExpanded, setShowExpanded] = useState<boolean>(false);
  const [position, setPosition] = useState<React.CSSProperties>({});
  const tooltipRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = hovered
      ? setTimeout(() => setShowExpanded(true), 1000)
      : undefined;
    return () => clearTimeout(timer);
  }, [hovered]);

  useEffect(() => {
    if (hovered && childRef.current && tooltipRef.current) {
      const newPosition = calculatePosition(
        childRef.current.getBoundingClientRect(),
        tooltipRef.current.getBoundingClientRect(),
        preferredDirection
      );
      setPosition(newPosition);
    }
  }, [hovered, preferredDirection]);

  const calculatePosition = (
    childRect: DOMRect,
    tooltipRect: DOMRect,
    preferredDirection: TooltipDirection
  ): React.CSSProperties => {
    const offset = 2; // Offset from the hovered element
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Calculate available space in each direction
    const availableSpace = {
      top: childRect.top,
      bottom: viewportHeight - childRect.bottom,
      left: childRect.left,
      right: viewportWidth - childRect.right,
    };

    // Determine the best direction based on available space and preferred direction
    let direction: TooltipDirection = preferredDirection;
    if (availableSpace[preferredDirection] < tooltipRect.height + offset) {
      const sortedDirections = Object.entries(availableSpace)
        .sort(([, aSpace], [, bSpace]) => bSpace - aSpace)
        .map(([dir]) => dir as TooltipDirection);

      direction = sortedDirections[0];
    }

    // Calculate position based on the determined direction
    let position: React.CSSProperties = { position: "absolute" };
    switch (direction) {
      case "top":
        position.bottom = \`\${childRect.height + offset}px\`;
        break;
      case "bottom":
        position.top = \`\${childRect.height + offset}px\`;
        break;
      case "left":
        position.right = \`\${childRect.width + offset}px\`;
        break;
      case "right":
        position.left = \`\${childRect.width + offset}px\`;
        break;
    }

    return position;
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };
  const handleMouseLeave = () => {
    setHovered(false);
    setShowExpanded(false);
  };
  return (
    <div
      ref={childRef}
      className="relative flex items-center group w-fit "
      onMouseEnter={() => handleMouseEnter()}
      onMouseLeave={() => handleMouseLeave()}
    >
      {children}
      <div
        ref={tooltipRef}
        className="absolute hidden group-hover:block z-50 "
        style={{ ...position }}
      >
        <div className="bg-gray-700 text-white text-xs rounded py-1 px-2 ">
          {message}
          {showExpanded && <div className="mt-1">{expandedContent}</div>}
        </div>
      </div>
    </div>
  );
};

export default ContextTooltip;
`;