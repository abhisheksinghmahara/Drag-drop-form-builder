// src/App.js
import React, { useState } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import Sidebar from './components/Sidebar';
import DropArea from './components/DropArea';

const App = () => {
  const [droppedComponents, setDroppedComponents] = useState([]);

  const components = [
    { type: 'input', label: 'Input Field' },
    { type: 'textarea', label: 'Textarea' },
    { type: 'select', label: 'Select Dropdown' },
    { type: 'checkbox', label: 'Checkbox' },
    { type: 'date', label: 'Date Picker' },
    { type: 'file', label: 'File Upload' },
    { type: 'number', label: 'Number Input' },
    { type: 'email', label: 'Email Input' },
    {
      id: 'button-1',
      label: 'Button',
      type: 'button',
      required: false,
    },
  ];

  const handleDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === 'sidebar' && destination.droppableId === 'drop-area-id') {
      const newComponent = { 
        ...components[source.index], 
        id: `${components[source.index].type}-${Date.now()}`
      };
      setDroppedComponents((prev) => [...prev, newComponent]);
    }

    if (source.droppableId === 'drop-area-id' && destination.droppableId === 'drop-area-id') {
      const reorderedComponents = Array.from(droppedComponents);
      const [removed] = reorderedComponents.splice(source.index, 1);
      reorderedComponents.splice(destination.index, 0, removed);
      setDroppedComponents(reorderedComponents);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="App flex flex-col md:flex-row">
        <Droppable droppableId="sidebar" isDropDisabled={true}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="sidebar-container p-4">
              <Sidebar components={components} setDroppedComponents={setDroppedComponents} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <Droppable droppableId="drop-area-id">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="drop-area-container p-4 border-l-2">
              <DropArea 
                droppedComponents={droppedComponents} 
                setDroppedComponents={setDroppedComponents} 
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default App;
 