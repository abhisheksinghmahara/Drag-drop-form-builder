// src/components/DropArea.js
import React, { useState } from 'react'; // Import useState to manage range value
import { Droppable, Draggable } from '@hello-pangea/dnd';

const DropArea = ({ droppedComponents }) => {
  const [rangeValues, setRangeValues] = useState({}); // State to hold range values

  const renderComponent = (component, isRequired) => {
    switch (component.type) {
      case 'input':
        return (
          <div>
            <input
              type="text"
              placeholder="Enter text"
              className="w-full p-2 border rounded"
              required={isRequired}
            />
            {isRequired && <span className="text-red-500">*</span>}
          </div>
        );
      case 'textarea':
        return (
          <div>
            <textarea
              placeholder="Enter your message"
              className="w-full p-2 border rounded"
              rows="3"
              required={isRequired}
            />
            {isRequired && <span className="text-red-500">*</span>}
          </div>
        );
      case 'select':
        return (
          <div>
            <select className="w-full p-2 border rounded" required={isRequired}>
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
            {isRequired && <span className="text-red-500">*</span>}
          </div>
        );
      case 'checkbox':
        return (
          <label>
            <input type="checkbox" className="mr-2" required={isRequired} /> Checkbox
            {isRequired && <span className="text-red-500">*</span>}
          </label>
        );
      case 'radio':
        return (
          <label>
            <input type="radio" name="radio-group" className="mr-2" required={isRequired} /> Radio Button
            {isRequired && <span className="text-red-500">*</span>}
          </label>
        );
      case 'date':
        return (
          <div>
            <input type="date" className="w-full p-2 border rounded" required={isRequired} />
            {isRequired && <span className="text-red-500">*</span>}
          </div>
        );
      case 'file':
        return (
          <div>
            <input type="file" className="w-full p-2 border rounded" required={isRequired} />
            {isRequired && <span className="text-red-500">*</span>}
          </div>
        );
      case 'email':
        return (
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 border rounded"
              required={isRequired}
            />
            {isRequired && <span className="text-red-500">*</span>}
          </div>
        );
      case 'number':
        return (
          <div>
            <input
              type="number"
              placeholder="Enter a number"
              className="w-full p-2 border rounded"
              required={isRequired}
            />
            {isRequired && <span className="text-red-500">*</span>}
          </div>
        );
      case 'range':
        return (
          <div>
            <input
              type="range"
              min="0"
              max="150"
              className="w-full"
              required={isRequired}
              onChange={(e) => handleRangeChange(e, component.id)} // Update value on change
            />
            <span className="block text-center mt-2">
              {rangeValues[component.id] !== undefined ? rangeValues[component.id] : 0} {/* Display range value */}
            </span>
            {isRequired && <span className="text-red-500">*</span>}
          </div>
        );
      default:
        return null;
    }
  };

  // Function to handle range value changes
  const handleRangeChange = (event, id) => {
    setRangeValues((prev) => ({
      ...prev,
      [id]: event.target.value, // Store the current value of the range
    }));
  };

  return (
    <Droppable droppableId="drop-area-id">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="drop-area border-2 border-dashed border-gray-300 p-4 rounded-lg"
        >
          <h3 className="font-bold text-lg mb-2">Form Layout</h3>
          {droppedComponents.length === 0 ? (
            <p className="text-gray-500">No components dropped yet.</p>
          ) : (
            droppedComponents.map((component, index) => (
              <Draggable key={component.id} draggableId={component.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="dropped-item p-2 border border-gray-200 rounded mb-2 bg-white shadow-sm"
                  >
                    {renderComponent(component, index < 3)} {/* Mark the first three as required */}
                  </div>
                )}
              </Draggable>
            ))
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default DropArea;

