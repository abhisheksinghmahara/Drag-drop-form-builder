import React, { useState, useEffect } from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import FormComponent from './FormComponent';

const DropArea = ({ droppedComponents }) => {
  const [submittedData, setSubmittedData] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editableLabels, setEditableLabels] = useState({});
  const [editablePlaceholders, setEditablePlaceholders] = useState({});
  const [hasError, setHasError] = useState(false);
  const [errorFields, setErrorFields] = useState([]);

  useEffect(() => {
    const initialData = droppedComponents.map(component => ({
      id: component.id,
      label: component.label,
      value: component.value || '',
      type: component.type,
      required: component.required || false,
      options: component.options || [],
    }));
    setSubmittedData(initialData);
  }, [droppedComponents]);

  const handleLabelChange = (id, newLabel) => {
    setEditableLabels(prev => ({ ...prev, [id]: newLabel }));
  };

  const handlePlaceholderChange = (id, newPlaceholder) => {
    setEditablePlaceholders(prev => ({ ...prev, [id]: newPlaceholder }));
  };

  const handleInputChange = (id, value) => {
    setSubmittedData(prev =>
      prev.map(item => (item.id === id ? { ...item, value } : item))
    );
  };

  const handleSubmit = () => {
    const errorFieldsTemp = submittedData
      .filter(item => item.required && !item.value)
      .map(item => item.label);

    if (errorFieldsTemp.length > 0) {
      setErrorFields(errorFieldsTemp);
      setHasError(true);
      return;
    }

    setHasError(false);
    setIsFormVisible(true);
  };

  const renderFinalForm = () => {
    return submittedData.map(data => (
      <div key={data.id} className="mb-4">
        {data.type === 'button' ? (
          <button className="p-2 bg-blue-500 text-white rounded mt-1">
            {editableLabels[data.id] || 'Button'}
          </button>
        ) : (
          <>
            <label className="block font-bold">{editableLabels[data.id] || data.label}:</label>
            {data.type === 'checkbox' ? (
              <input
                type="checkbox"
                checked={data.value}
                readOnly
                onChange={() => handleInputChange(data.id, !data.value)}
                className="mr-2"
                aria-label={editableLabels[data.id] || data.label}
              />
            ) : data.type === 'textarea' ? (
              <textarea
                value={data.value}
                placeholder={editablePlaceholders[data.id] || "Enter text"}
                onChange={e => handleInputChange(data.id, e.target.value)}
                className="border border-gray-300 p-2 rounded mt-1 w-full"
                aria-label={editablePlaceholders[data.id] || "Enter text"}
              />
            ) : data.type === 'select' ? (
              <select
                value={data.value}
                onChange={e => handleInputChange(data.id, e.target.value)}
                className="border border-gray-300 p-2 rounded mt-1 w-full"
                aria-label={editablePlaceholders[data.id] || "Select option"}
              >
                {data.options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={data.type}
                value={data.value}
                placeholder={editablePlaceholders[data.id] || "Enter text"}
                onChange={e => handleInputChange(data.id, e.target.value)}
                className="border border-gray-300 p-2 rounded mt-1 w-full"
                aria-label={editablePlaceholders[data.id] || "Enter text"}
              />
            )}
          </>
        )}
      </div>
    ));
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
                    <FormComponent
                      component={component}
                      label={editableLabels[component.id] || component.label}
                      placeholder={editablePlaceholders[component.id] || "Enter text"}
                      handleInputChange={handleInputChange}
                      handleLabelChange={handleLabelChange}
                      handlePlaceholderChange={handlePlaceholderChange}
                    />
                  </div>
                )}
              </Draggable>
            ))
          )}
          {provided.placeholder}

          <button
            onClick={handleSubmit}
            className="mt-4 p-2 bg-blue-500 text-white rounded"
            aria-label="Create Form"
          >
            Create Form
          </button>

          {hasError && (
            <div className="text-red-500 mt-2" role="alert">
              Please fill out all required fields: {errorFields.join(', ')}.
            </div>
          )}

          {isFormVisible && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded shadow-lg w-1/3">
                <h4 className="font-bold mb-4">Generated Form:</h4>
                {renderFinalForm()}
                <button
                  onClick={() => setIsFormVisible(false)}
                  className="mt-4 p-2 bg-red-500 text-white rounded"
                  aria-label="Close Form"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </Droppable>
  );
};

export default DropArea;
