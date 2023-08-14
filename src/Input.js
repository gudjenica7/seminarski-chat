import React, { useState } from 'react';

function Input({ onInput}) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      onInput(inputValue);
      setInputValue('');
    }
  };

  return (
    <form className="Input" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type your message..."
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default Input;