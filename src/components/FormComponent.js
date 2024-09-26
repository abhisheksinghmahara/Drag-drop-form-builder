import React, { useState, useEffect } from 'react';

const FormComponent = React.memo(({
  component,
  label,
  placeholder,
  handleInputChange,
  handleLabelChange,
  handlePlaceholderChange,
  isRequired, // New prop to indicate if the component is required
}) => {
  const [localLabel, setLocalLabel] = useState(label);
  const [localPlaceholder, setLocalPlaceholder] = useState(placeholder);
  const [options, setOptions] = useState(component.options || ["", "", ""]); // State for dropdown options

  useEffect(() => {
    setLocalLabel(label);
    setLocalPlaceholder(placeholder);
    setOptions(component.options || ["", "", ""]); // Initialize options from component
  }, [label, placeholder, component.options]);

  const handleLabelEdit = (e) => {
    const newLabel = e.target.value;
    setLocalLabel(newLabel);
    handleLabelChange(component.id, newLabel);
  };

  const handlePlaceholderEdit = (e) => {
    const newPlaceholder = e.target.value;
    setLocalPlaceholder(newPlaceholder);
    handlePlaceholderChange(component.id, newPlaceholder);
  };

  const handleChange = (e) => {
    const value = component.type === 'checkbox' ? e.target.checked : e.target.value;
    handleInputChange(component.id, value); // Notify parent about the change
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
    component.options = newOptions; // Update the component's options
  };

  return (
    <div className="form-component mb-4 w-full max-w-md mx-auto "> {/* Centered and responsive */}
      {/* Editable Label */}
      <div className="flex items-center">
        <input
          type="text"
          value={localLabel}
          onChange={handleLabelEdit}
          className="mb-2 p-2 border border-gray-300 rounded w-full" // Adjusted padding and width
          placeholder="Edit Label"
        />
        {/* Display Required Indicator */}
        {isRequired && <span className="text-red-500 ml-1">*</span>}
      </div>

      {/* Input Field based on component type */}
      {component.type === 'input' && (
        <input
          type="text"
          className="p-2 border border-gray-300 rounded w-full"
          placeholder={localPlaceholder}
          value={component.value} // Use value to make it controlled
          onChange={handleChange}
          required={isRequired} // Set required based on prop
        />
      )}

      {component.type === 'textarea' && (
        <textarea
          className="p-2 border border-gray-300 rounded w-full"
          placeholder={localPlaceholder}
          value={component.value} // Use value to make it controlled
          onChange={handleChange}
          required={isRequired} // Set required based on prop
        />
      )}

      {component.type === 'date' && (
        <input
          type="date"
          className="p-2 border border-gray-300 rounded w-full"
          value={component.value} // Use value to make it controlled
          onChange={handleChange}
          required={isRequired} // Set required based on prop
        />
      )}

      {component.type === 'email' && (
        <input
          type="email"
          className="p-2 border border-gray-300 rounded w-full"
          placeholder={localPlaceholder}
          value={component.value} // Use value to make it controlled
          onChange={handleChange}
          required={isRequired} // Set required based on prop
        />
      )}

      {component.type === 'checkbox' && (
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            className="mr-2"
            checked={component.value || false} // Use component.value directly
            onChange={handleChange}
            required={isRequired} // Set required based on prop
          />
          <label>{localLabel}</label>
        </div>
      )}

      {component.type === 'button' && (
        <div className="mt-2">
          {/* Editable Button Label */}
          <input
            type="text"
            value={localLabel} // Editable label for the button
            onChange={handleLabelEdit}
            className="mb-2 p-2 border border-gray-300 rounded w-full" // Adjusted width
            placeholder="Button Name" // Placeholder for button name
          />
          {/* Displaying the button with localLabel */}
          <button className="p-2 bg-blue-500 text-white rounded w-full"> {/* Full width button */}
            {localLabel || 'Button'} {/* Default to 'Button' if no name is provided */}
          </button>
        </div>
      )}

      {component.type === 'select' && (
        <div>
          {/* Dropdown */}
          <select
            value={component.value}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-full mb-2"
            required={isRequired} // Set required based on prop
          >
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          {/* Editable Options */}
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="mb-2 p-2 border border-gray-300 rounded w-full" // Adjusted width
              placeholder={`Option ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Editable Placeholder for text and textarea */}
      {(component.type === 'input' || component.type === 'textarea') && (
        <input
          type="text"
          value={localPlaceholder}
          onChange={handlePlaceholderEdit}
          className="mt-2 p-2 border border-gray-300 rounded w-full" // Adjusted width
          placeholder="Edit Placeholder"
        />
      )}
    </div>
  );
});

export default FormComponent;
