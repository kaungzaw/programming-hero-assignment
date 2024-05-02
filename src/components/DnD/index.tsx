import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";

import Droppable from "./Droppable";
import Draggable from "./Draggable";

type DnDProps = {
  parent: string;
  setParent: (parent: string) => void;
};

const DnD = (props: DnDProps) => {
  const { parent, setParent } = props;
  const containers = ["to-do", "in-progress", "done"];
  const draggableMarkup = <Draggable id="draggable">{parent}</Draggable>;

  const handleDragEnd = (event: any) => {
    const { over } = event;
    if (over) {
      setParent(over.id);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {parent === null ? draggableMarkup : null}

      <div
        style={{ display: "flex", justifyContent: "space-between", gap: 10 }}
      >
        {containers.map((id) => (
          <Droppable key={id} id={id}>
            {parent === id ? draggableMarkup : id}
          </Droppable>
        ))}
      </div>
    </DndContext>
  );
};

export default DnD;
