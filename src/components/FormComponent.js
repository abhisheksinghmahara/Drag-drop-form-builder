import React, { useState, useEffect } from 'react';

const FormComponent = React.memo(({
  component,
  label,
  placeholder,
  handleInputChange,
  handleLabelChange,
  handlePlaceholderChange,
}) => {
  const [localLabel, setLocalLabel] = useState(label);
  const [localPlaceholder, setLocalPlaceholder] = useState(placeholder);

  useEffect(() => {
    setLocalLabel(label);
    setLocalPlaceholder(placeholder);
  }, [label, placeholder]);

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

  return (
    <div className="form-component mb-4">
      {/* Editable Label */}
      <input
        type="text"
        value={localLabel}
        onChange={handleLabelEdit}
        className="mb-2 p-1 border border-gray-300 rounded"
        placeholder="Edit Label"
      />

      {/* Input Field based on component type */}
      {component.type === 'input' && (
        <input
          type="text"
          className="p-2 border border-gray-300 rounded w-full"
          placeholder={localPlaceholder}
          value={component.value} // Use value to make it controlled
          onChange={handleChange}
          required={component.required}
        />
      )}

      {component.type === 'textarea' && (
        <textarea
          className="p-2 border border-gray-300 rounded w-full"
          placeholder={localPlaceholder}
          value={component.value} // Use value to make it controlled
          onChange={handleChange}
          required={component.required}
        />
      )}

      {component.type === 'date' && (
        <input
          type="date"
          className="p-2 border border-gray-300 rounded w-full"
          value={component.value} // Use value to make it controlled
          onChange={handleChange}
          required={component.required}
        />
      )}

      {component.type === 'email' && (
        <input
          type="email"
          className="p-2 border border-gray-300 rounded w-full"
          placeholder={localPlaceholder}
          value={component.value} // Use value to make it controlled
          onChange={handleChange}
          required={component.required}
        />
      )}

      {component.type === 'checkbox' && (
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            className="mr-2"
            checked={component.value || false} // Use component.value directly
            onChange={handleChange}
          />
          <label>{localLabel}</label>
        </div>
      )}

      {/* Editable Placeholder for text and textarea */}
      {(component.type === 'input' || component.type === 'textarea') && (
        <input
          type="text"
          value={localPlaceholder}
          onChange={handlePlaceholderEdit}
          className="mt-2 p-1 border border-gray-300 rounded"
          placeholder="Edit Placeholder"
        />
      )}
    </div>
  );
});

export default FormComponent;
