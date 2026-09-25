import React, { useState, useRef } from 'react';
import { Send, Paperclip, Smile } from 'lucide-react';

export default function MessageInput({ onSend, disabled }) {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    setText(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;

    onSend(trimmed);
    setText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  return (
    <div className="crm-chat-input-bar">
      <button type="button" className="crm-topbar-icon-btn" title="Attach media or document" onClick={() => alert("Media Upload dialog (Placeholder)")}>
        <Paperclip size={18} />
      </button>

      <input
        ref={textareaRef}
        type="text"
        className="crm-chat-input"
        placeholder="Type a manual WhatsApp reply... (Press Enter to send)"
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />

      <button
        type="button"
        className="crm-send-btn"
        onClick={handleSend}
        disabled={disabled || !text.trim()}
        title="Send WhatsApp Message"
      >
        <Send size={18} />
      </button>
    </div>
  );
}
