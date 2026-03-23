import { useState, useRef, useEffect } from 'react';
import './InlineEdit.css';

interface InlineEditProps {
  value: string;
  onSave: (newValue: string) => void;
  element?: 'input' | 'textarea';
  placeholder?: string;
  className?: string;
  allowEmpty?: boolean;
  autoFocus?: boolean;
}

export function InlineEdit({
  value,
  onSave,
  element = 'input',
  placeholder = '',
  className = '',
  allowEmpty = false,
  autoFocus = false,
}: InlineEditProps) {
  const [isEditing, setIsEditing] = useState(autoFocus);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  // Sync draft when value changes externally
  useEffect(() => {
    if (!isEditing) {
      setDraft(value);
    }
  }, [value, isEditing]);

  // Auto-focus when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      // Place cursor at end
      const len = inputRef.current.value.length;
      inputRef.current.setSelectionRange(len, len);
    }
  }, [isEditing]);

  const handleSave = () => {
    const trimmed = draft.trim();
    if (!trimmed && !allowEmpty) {
      // Revert to original if empty and not allowed
      setDraft(value);
    } else {
      onSave(trimmed);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraft(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (element === 'input') {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSave();
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        handleCancel();
      }
    } else {
      // textarea
      if (e.key === 'Escape') {
        e.preventDefault();
        handleCancel();
      }
      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleSave();
      }
    }
  };

  const handleClick = () => {
    if (!isEditing) {
      setDraft(value);
      setIsEditing(true);
    }
  };

  // Edit mode
  if (isEditing) {
    const sharedProps = {
      ref: inputRef as any,
      className: `inline-edit-input ${className}`,
      value: draft,
      placeholder,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setDraft(e.target.value),
      onBlur: handleSave,
      onKeyDown: handleKeyDown,
    };

    if (element === 'textarea') {
      return <textarea {...sharedProps} rows={3} />;
    }
    return <input {...sharedProps} type="text" />;
  }

  // Read mode
  const displayValue = value || placeholder;
  const isEmpty = !value;

  return (
    <span
      className={`inline-edit-display ${className} ${isEmpty ? 'inline-edit-empty' : ''}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {displayValue}
    </span>
  );
}
