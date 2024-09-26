import React, { useState, useEffect } from 'react';

const FormComponent = React.memo(({
  component,
  label,
  placeholder,
  handleInputChange,
  handleLabelChange,
  handlePlaceholderChange,
  isRequired,
}) => {
  const [localLabel, setLocalLabel] = useState(label);
  const [localPlaceholder, setLocalPlaceholder] = useState(placeholder);
  const [options, setOptions] = useState(component.options || ["", "", ""]);

  useEffect(() => {
    setLocalLabel(label);
    setLocalPlaceholder(placeholder);
    setOptions(component.options || ["", "", ""]);
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
    handleInputChange(component.id, value);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
    component.options = newOptions;
  };

  return (
    <div className="form-component mb-4 w-full max-w-md mx-auto">
      <div className="flex items-center">
        <input
          type="text"
          value={localLabel}
          onChange={handleLabelEdit}
          className="mb-2 p-2 border border-gray-300 rounded w-full"
          placeholder="Edit Label"
        />
        {isRequired && <span className="text-red-500 ml-1">*</span>}
      </div>

      {component.type === 'input' && (
        <input
          type="text"
          className="p-2 border border-gray-300 rounded w-full"
          placeholder={localPlaceholder}
          value={component.value}
          onChange={handleChange}
          required={isRequired}
        />
      )}

      {component.type === 'textarea' && (
        <textarea
          className="p-2 border border-gray-300 rounded w-full"
          placeholder={localPlaceholder}
          value={component.value}
          onChange={handleChange}
          required={isRequired}
        />
      )}

      {component.type === 'date' && (
        <input
          type="date"
          className="p-2 border border-gray-300 rounded w-full"
          value={component.value}
          onChange={handleChange}
          required={isRequired}
        />
      )}

      {component.type === 'email' && (
        <input
          type="email"
          className="p-2 border border-gray-300 rounded w-full"
          placeholder={localPlaceholder}
          value={component.value}
          onChange={handleChange}
          required={isRequired}
        />
      )}

      {component.type === 'checkbox' && (
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            className="mr-2"
            checked={component.value || false}
            onChange={handleChange}
            required={isRequired}
          />
          <label>{localLabel}</label>
        </div>
      )}

      {component.type === 'button' && (
        <div className="mt-2">
          <input
            type="text"
            value={localLabel}
            onChange={handleLabelEdit}
            className="mb-2 p-2 border border-gray-300 rounded w-full"
            placeholder="Button Name"
          />
          <button className="p-2 bg-blue-500 text-white rounded w-full">
            {localLabel || 'Button'}
          </button>
        </div>
      )}

      {component.type === 'select' && (
        <div>
          <select
            value={component.value}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded w-full mb-2"
            required={isRequired}
          >
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="mb-2 p-2 border border-gray-300 rounded w-full"
              placeholder={`Option ${index + 1}`}
            />
          ))}
        </div>
      )}

      {(component.type === 'input' || component.type === 'textarea') && (
        <input
          type="text"
          value={localPlaceholder}
          onChange={handlePlaceholderEdit}
          className="mt-2 p-2 border border-gray-300 rounded w-full"
          placeholder="Edit Placeholder"
        />
      )}
    </div>
  );
});

export default FormComponent;
