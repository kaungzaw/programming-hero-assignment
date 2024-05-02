import React from "react";
import { useDroppable } from "@dnd-kit/core";

type DroppableProps = {
  id: string;
  children: React.ReactNode;
};

const Droppable = (props: DroppableProps) => {
  const { id, children } = props;
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });
  const style = {
    color: isOver ? "green" : undefined,
    padding: 10,
    border: "1px solid #d9d9d9",
    borderRadius: 8,
    flexGrow: 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
};

export default Droppable;
