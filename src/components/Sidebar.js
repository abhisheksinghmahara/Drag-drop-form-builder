import React from 'react';
import { Draggable } from '@hello-pangea/dnd';

const Sidebar = ({ components }) => {
  return (
    <div className="sidebar">
      <h3 className="font-bold mb-2">Components</h3>
      {components.map((component, index) => (
        <Draggable 
          key={`${component.type}-${index}`} // Ensure a unique key
          draggableId={`${component.type}-${index}`} 
          index={index}
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="draggable-item p-2 border border-gray-200 rounded mb-2 cursor-pointer bg-white shadow-sm hover:bg-gray-100 transition duration-200"
              aria-label={`Drag ${component.label}`} // Accessibility improvement
            >
              {component.label}
            </div>
          )}
        </Draggable>
      ))}
    </div>
  );
};

export default Sidebar;
