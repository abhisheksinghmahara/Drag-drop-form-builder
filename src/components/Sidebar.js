//src/components/Sidebar.js
// src/components/Sidebar.js
import React from 'react';
import { Draggable } from '@hello-pangea/dnd';

const Sidebar = ({ components }) => {
  return (
    <div className="sidebar">
      <h3>Components</h3>
      {components.map((component, index) => (
        <Draggable key={component.type} draggableId={component.type} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="draggable-item p-2 border border-gray-200 rounded mb-2 cursor-pointer"
            >
              {component.label} {/* Display the label instead of the object */}
            </div>
          )}
        </Draggable>
      ))}
    </div>
  );
};

export default Sidebar;
